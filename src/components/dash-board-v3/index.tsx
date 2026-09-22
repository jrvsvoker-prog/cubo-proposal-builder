import { computed, defineComponent, nextTick, ref, watch, type PropType } from 'vue'
import { CuboButtonV2, CuboCheckbox, CuboIcon, CuboSelect, CuboTabs, CuboText } from '@cuboapp/ui-vue'
import { profile } from '../../data/profile'
import { dashboardInputFromProfile, dashboardModelConfig, type DashboardInput } from '../../data/dashboard-input'
import { applyClientPrimary } from '../../utils/primary-ink'
import { aggregate, createDashboardModel, deltaMetric, formatMetric, scaleLabels, type Metric, type Scale } from '../../data/dashboard-model'
import ScreenSidebar from '../screen-sidebar'
import KpModal from '../shared/kp-modal'
import KpiCard from './kpi-card'
import TrendChart from './trend-chart'
import UnitBreakdown from './unit-breakdown'
import { shortPeriodLabel } from './utils/period-label'

/** Тон дельта-пилюли: логика из kpi-card (debt инвертирует). */
function deltaTone(cur: number | null, bas: number | null, m: Metric): 'is-up' | 'is-down' | 'is-zero' {
  if (cur === null || bas === null || !Number.isFinite(cur) || !Number.isFinite(bas)) return 'is-zero'
  const diff = m.type === 'percent' ? cur - bas : bas === 0 ? (cur === 0 ? 0 : cur > 0 ? 1 : -1) : Math.sign(cur - bas)
  if (Math.abs(diff) < 1e-9) return 'is-zero'
  const up = diff > 0
  return (up !== !!m.debt ? 'is-up' : 'is-down')
}

/** Один визуально законченный дашборд демо-КП: KPI, динамика, разбивка по подразделениям. */
export default defineComponent({
  name: 'ProposalDashboard',
  props: {
    input: { type: Object as PropType<DashboardInput>, default: undefined },
  },
  setup(props) {
    const cfg = computed(() => props.input ?? dashboardInputFromProfile(profile))
    const model = computed(() => createDashboardModel(dashboardModelConfig(cfg.value)))
    const compact = computed(() => cfg.value.units.length <= 1)

    // Primary клиента: одно значение на :root, разворачивает локальную тему экрана.
    watch(() => cfg.value.primary, hex => applyClientPrimary(hex), { immediate: true })

    const defaultScale = (scales: Scale[]) => (scales.includes('month') ? 'month' : scales[0])
    const scale = ref<Scale>(defaultScale(cfg.value.scales)), periodId = ref(model.value.choices(defaultScale(cfg.value.scales))[0]?.id ?? '')
    const enabled = ref<string[]>([...cfg.value.defaultMetrics])
    const dialog = ref<'metrics' | null>(null), search = ref(''), draft = ref<string[]>([])
    const info = ref<{ metric?: Metric } | null>(null)
    let opener: HTMLElement | null = null

    watch(cfg, inp => {
      const m = createDashboardModel(dashboardModelConfig(inp))
      scale.value = defaultScale(inp.scales)
      periodId.value = m.choices(defaultScale(inp.scales))[0]?.id ?? ''
      enabled.value = [...inp.defaultMetrics]
      dialog.value = null
      info.value = null
    })

    const periodChoices = computed(() => model.value.choices(scale.value))
    const period = computed(() => periodChoices.value.find(p => p.id === periodId.value) ?? periodChoices.value[0])
    const compareKey = computed(() => (period.value.bases.year ? 'year' : 'previous'))
    const baseSpec = computed(() => period.value.bases[compareKey.value]?.spec)
    const value = (m: Metric, ids: number[], isBase = false) => (isBase && !baseSpec.value ? null : aggregate(m, ids.map(i => model.value.raw(i, isBase ? baseSpec.value! : period.value.current))))
    const revenue = computed(() => model.value.metrics.find(m => m.id === 'revenue')!)
    const fillMetric = computed(() => model.value.metrics.find(m => m.id === 'fill'))
    const unitName = (i: number) => cfg.value.units[i] ?? cfg.value.appName

    const restoreFocus = () => nextTick(() => opener?.focus({ preventScroll: true }))
    const openSettings = () => {
      opener = document.activeElement as HTMLElement
      draft.value = [...enabled.value]
      search.value = ''
      dialog.value = 'metrics'
    }
    const closeSettings = () => { dialog.value = null; restoreFocus() }
    const openInfo = (metric?: Metric) => { opener = document.activeElement as HTMLElement; info.value = { metric } }
    const closeInfo = () => { info.value = null; restoreFocus() }

    const options = computed(() => model.value.metrics.map(m => ({ id: m.id, name: m.name })))
    const filtered = computed(() => options.value.filter(o => o.name.toLocaleLowerCase('ru').includes(search.value.trim().toLocaleLowerCase('ru'))))
    const toggle = (id: string) => { draft.value = draft.value.includes(id) ? draft.value.filter(v => v !== id) : [...draft.value, id] }
    const apply = () => {
      if (!draft.value.length) return
      enabled.value = model.value.metrics.filter(m => draft.value.includes(m.id)).map(m => m.id)
      closeSettings()
    }
    const changeScale = (id: unknown) => {
      scale.value = id as Scale
      periodId.value = model.value.choices(scale.value)[0].id
    }

    return () => (
      <div class="proposal-dash cubo-client-theme" data-cubo-gtc-bridge="" data-gtc-theme="light" data-testid="dashboard">
        <ScreenSidebar app={cfg.value.appName} nav={cfg.value.navigation} initials={cfg.value.staffInitials} staffName={cfg.value.staffName} staffRole={cfg.value.staffRole} logo={cfg.value.logo} />
        <div class="proposal-dash__body">
          <header class="proposal-dash__heading">
            <h3>Обзор бизнеса</h3>
            <div class="proposal-dash__heading-actions">
              <CuboButtonV2 tone="neutral" appearance="outline" leadIcon="adjustments-horizontal" onClick={openSettings}>Показатели · {enabled.value.length}</CuboButtonV2>
            </div>
          </header>

          <div class="proposal-dash__toolbar" role="group" aria-label="Настройки отчёта">
            <CuboTabs
              format="segmented"
              tabs={cfg.value.scales.map(s => ({ id: s, label: scaleLabels[s] }))}
              active={scale.value}
              onChange={changeScale}
            />
            {periodChoices.value.length > 1 ? (
              <CuboSelect
                value={period.value.id}
                variants={periodChoices.value.map(p => ({ value: p.id, label: shortPeriodLabel(p.current.label) }))}
                onChange={(v: unknown) => { periodId.value = String(v) }}
              />
            ) : (
              <span class="proposal-dash__period" title="Период">{shortPeriodLabel(period.value.current.label)}</span>
            )}
            <button type="button" class="pdash-info-btn" aria-label="О периоде" onClick={() => openInfo()}>
              <CuboIcon icon="info-circle" size={18} />
            </button>
          </div>

          <section class="proposal-dash__kpis" aria-label="Показатели за период">
            {enabled.value.map(id => {
              const m = model.value.metrics.find(m => m.id === id)!
              return (
                <KpiCard
                  key={id}
                  metric={m}
                  current={value(m, model.value.ids)}
                  baseValue={value(m, model.value.ids, true)}
                  hasBase={!!baseSpec.value}
                  period={period.value.current}
                  basePeriod={baseSpec.value}
                  onInfo={() => openInfo(m)}
                />
              )
            })}
          </section>

          <div class={['proposal-dash__main', compact.value && 'is-compact']}>
            <TrendChart model={model.value} period={period.value} showBase={!!baseSpec.value} metricName={revenue.value.name} />
            {!compact.value && (
              <UnitBreakdown
                model={model.value}
                units={cfg.value.units}
                period={period.value.current}
                baseSpec={baseSpec.value}
                metric={revenue.value}
                fillMetric={fillMetric.value}
                totalLabel="Вся сеть"
                unitPlural={cfg.value.unitPlural}
              />
            )}
          </div>
        </div>

        {/* Показатели отчёта */}
        <KpModal
          visible={dialog.value !== null}
          title="Показатели отчёта"
          meta="Итоги всегда считаются по всей компании"
          onClose={closeSettings}
        >
          {{
            default: () => (
              <div class="proposal-dash__dialog">
                <CuboText value={search.value} placeholder="Найти показатель" aria-label="Найти показатель" onChange={(v: string) => { search.value = v }} />
                <div class="proposal-dash__selection-actions">
                  <CuboButtonV2 tone="neutral" appearance="ghost" size="sm" onClick={() => { draft.value = options.value.map(o => o.id) }}>Выбрать все</CuboButtonV2>
                  <CuboButtonV2 tone="neutral" appearance="ghost" size="sm" onClick={() => { draft.value = [] }}>Снять все</CuboButtonV2>
                </div>
                <div class="proposal-dash__options">
                  {filtered.value.length ? filtered.value.map(o => <CuboCheckbox key={o.id} value={draft.value.includes(o.id)} onChange={() => toggle(o.id)}>{o.name}</CuboCheckbox>) : <p>Ничего не найдено. Измените запрос.</p>}
                </div>
              </div>
            ),
            footer: () => <>
              <span class="proposal-dash__footer-status" aria-live="polite">{draft.value.length ? `Выбрано: ${draft.value.length}` : 'Выберите хотя бы один'}</span>
              <CuboButtonV2 tone="neutral" appearance="ghost" size="sm" onClick={closeSettings}>Отмена</CuboButtonV2>
              <CuboButtonV2 tone="primary" size="sm" disabled={!draft.value.length} onClick={apply}>Применить</CuboButtonV2>
            </>,
          }}
        </KpModal>

        {/* Расчёт метрики / О периоде */}
        {info.value?.metric ? (
          <KpModal
            visible
            title={info.value.metric.name}
            meta={[
              formatMetric(value(info.value.metric, model.value.ids), info.value.metric),
              period.value.current.label,
              ...(baseSpec.value ? [`база ${formatMetric(value(info.value.metric, model.value.ids, true), info.value.metric)}`] : []),
            ].join(' · ')}
            onClose={closeInfo}
          >
            {!compact.value && (
              <ul class="kp-modal__list">
                {model.value.ids.map(i => {
                  const m = info.value!.metric!
                  const cur = aggregate(m, [model.value.raw(i, period.value.current)])
                  const bas = baseSpec.value ? aggregate(m, [model.value.raw(i, baseSpec.value)]) : null
                  return (
                    <li class="kp-modal__row" key={i}>
                      <span class="kp-modal__row-name">{unitName(i)}</span>
                      <span class="kp-modal__row-value">{formatMetric(cur, m)}</span>
                      <span class="kp-modal__row-note">
                        {baseSpec.value
                          ? (bas === null ? '—' : <span class={['delta-pill', deltaTone(cur, bas, m)]}>{deltaMetric(cur, bas, m)}</span>)
                          : ''}
                      </span>
                    </li>
                  )
                })}
              </ul>
            )}
            {info.value.metric.formula && <p class="kp-modal__note">{info.value.metric.formula}</p>}
          </KpModal>
        ) : info.value && (
          <KpModal
            visible
            title="О периоде"
            meta={[period.value.current.label, ...(baseSpec.value ? [`база ${baseSpec.value.label}`] : [])].join(' · ')}
            onClose={closeInfo}
          >
            <p class="kp-modal__note" style="margin-top: 0">{period.value.note}</p>
            <p class="kp-modal__note">{cfg.value.assumptions}</p>
          </KpModal>
        )}
      </div>
    )
  },
})
