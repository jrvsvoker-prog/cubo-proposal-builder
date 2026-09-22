import { metricLabels, groupLabels, availableGroups } from '../../../data/analytics-copy'
import { computed, defineComponent, ref, watch, type PropType } from 'vue'
import { CuboSelect } from '@cuboapp/ui-vue'
import {
  anaGroupDelta,
  anaMetricSeries,
  anaMonthly,
  salesInWindow,
  sumSales,
  type AnaFilters,
  type AnaGroupKey,
  type AnaMetric,
  type AnaRange,
} from '../../../data/analytics'
import { compactMoney, int } from '../../../utils/format'
import { KpiCard, LineChart, DeltaBars, fmtSigned, fmtUnit, type ChartSeries, type ChartUnit } from '../charts'
import { monthDetail, groupDetail } from '../utils/details'
import type { DetailPayload } from '../detail-modal'

// Динамика: итог и дельта периода → график «текущий vs база» → кто дал
// изменение → помесячные линии по группам. KPI-ряд — селектор метрики:
// выбранная метрика ведёт все блоки таба (как в аналитиках Amplitude/Stripe).

const METRICS: { id: AnaMetric; icon: string }[] = [
  { id: 'revenue', icon: 'cash-banknote' },
  { id: 'count', icon: 'receipt-2' },
  { id: 'avg', icon: 'report-money' },
  { id: 'students', icon: 'users-group' },
]

const GROUPS: { id: AnaGroupKey; label: string }[] = [
  { id: 'direction', label: groupLabels.direction },
  { id: 'branch', label: groupLabels.branch },
  { id: 'source', label: 'Источники' },
  { id: 'program', label: groupLabels.program },
]

const visibleGroups = GROUPS.filter((g) => availableGroups.includes(g.id))

/** Цвета серий: монохромная рампа от primary — единый список для пилюль и линий. */
const SERIES_COLORS = ['pro-1', 'pro-3', 'pro-5', 'pro-2', 'pro-4', 'pro-6']

const unitOf = (m: AnaMetric): ChartUnit => (m === 'revenue' ? 'money' : m === 'avg' ? 'avg' : 'count')

export default defineComponent({
  name: 'AnaDynamicsTab',
  props: {
    range: { type: Object as () => AnaRange, required: true },
    filters: { type: Object as () => AnaFilters, required: true },
    empty: { type: Boolean, required: true },
    onDetail: { type: Function as PropType<(p: DetailPayload) => void>, required: true },
  },
  setup(props) {
    const metric = ref<AnaMetric>('revenue')
    // «Кто дал изменение» по умолчанию — по подразделениям (джоб собственника
    // «где отстаём»); без филиалов — по направлениям.
    const driverGroup = ref<AnaGroupKey>(availableGroups.includes('branch') ? 'branch' : 'direction')
    const lineGroup = ref<AnaGroupKey>('direction')
    const lineVisible = ref<string[]>([])

    const totals = computed(() => {
      const t = sumSales(salesInWindow(props.range.current, props.filters))
      const b = sumSales(salesInWindow(props.range.base, props.filters))
      return { cur: t, base: b }
    })

    const series = computed<{ labels: string[]; fullLabels: string[]; data: ChartSeries[] }>(() => {
      const cur = anaMonthly(props.range.current, props.filters)
      const base = anaMonthly(props.range.base, props.filters)
      const val = (m: typeof cur[number]) =>
        metric.value === 'revenue' ? m.revenue : metric.value === 'count' ? m.count : metric.value === 'students' ? m.students : m.count ? Math.round(m.revenue / m.count) : 0
      return {
        labels: cur.map((m) => m.label.split(' ')[0]),
        fullLabels: cur.map((m) => m.label),
        data: [
          { name: 'Текущий период', color: 'current', values: cur.map(val) },
          { name: props.range.baseLabel, color: 'base', values: base.map(val) },
        ],
      }
    })

    // Вклад каждой группы в изменение метрики к базе — дивергентные бары.
    const drivers = computed(() => anaGroupDelta(props.range.current, props.range.base, props.filters, driverGroup.value, metric.value))

    const driverSummary = computed(() => {
      const rows = drivers.value
      const up = rows.filter((r) => r.delta > 0).sort((a, b) => b.delta - a.delta)[0]
      const down = rows.filter((r) => r.delta < 0).sort((a, b) => a.delta - b.delta)[0]
      if (!up && !down) return 'Без изменений к базе'
      const unit = unitOf(metric.value)
      const parts = [
        up && `Рост: ${up.label} ${fmtSigned(up.delta, unit)}`,
        down && `Просадка: ${down.label} ${fmtSigned(down.delta, unit)}`,
      ].filter(Boolean)
      return parts.join(' · ')
    })

    // Помесячные линии по группам для выбранной метрики; серии — топ-3, остальные пилюлями.
    const lineSeries = computed(() => anaMetricSeries(props.range.current, props.filters, lineGroup.value, metric.value))
    lineVisible.value = lineSeries.value.names.slice(0, 3)
    watch(
      () => [lineGroup.value, props.range.currentLabel, props.filters.branches.join(), props.filters.sources.join(), metric.value].join('|'),
      () => {
        lineVisible.value = lineSeries.value.names.slice(0, 3)
      },
    )
    const lineData = computed<ChartSeries[]>(() =>
      lineSeries.value.names
        .filter((n) => lineVisible.value.includes(n))
        .map((n) => ({
          name: n,
          color: SERIES_COLORS[lineSeries.value.names.indexOf(n) % SERIES_COLORS.length],
          values: lineSeries.value.byMonth.map((m) => m.values.get(n) ?? 0),
        })),
    )
    const linesHaveData = computed(() => lineData.value.some((s) => s.values.some((v) => v !== 0)))

    const monthsMeta = computed(() => anaMonthly(props.range.current, props.filters).map((m) => ({ label: m.label.split(' ')[0], full: m.label })))

    return () => {
      const unit = unitOf(metric.value)
      const t = totals.value
      const kpiValue = (id: AnaMetric, s: typeof t.cur) =>
        id === 'revenue' ? compactMoney(s.amount) : id === 'avg' ? compactMoney(s.count ? Math.round(s.amount / s.count) : 0) : int(id === 'count' ? s.count : s.students)
      const kpiNum = (id: AnaMetric, s: typeof t.cur) =>
        id === 'revenue' ? s.amount : id === 'avg' ? (s.count ? Math.round(s.amount / s.count) : 0) : id === 'count' ? s.count : s.students
      return (
        <div class="ana2-tab">
          <div class="ana2-grid4" role="group" aria-label="Метрика раздела">
            {METRICS.map((m) => (
              <KpiCard
                key={m.id}
                icon={m.icon}
                label={metricLabels[m.id]}
                value={kpiValue(m.id, t.cur)}
                base={kpiValue(m.id, t.base)}
                current={kpiNum(m.id, t.cur)}
                baseNum={kpiNum(m.id, t.base)}
                active={metric.value === m.id}
                onClick={() => (metric.value = m.id)}
              />
            ))}
          </div>

          <section class="ana2-card">
            <header class="ana2-card__head">
              <div class="ana2-card__titles">
                <h3>{metricLabels[metric.value]} · динамика</h3>
                <span>
                  {props.range.currentLabel} · сравнение с {props.range.baseLabel}
                </span>
              </div>
            </header>
            {props.empty ? (
              <div class="ana2-empty">Нет данных по выбранным фильтрам</div>
            ) : (
              <>
                <div class="ana2-legend">
                  <span>
                    <i class="is-current" aria-hidden="true" />
                    {props.range.currentLabel}
                  </span>
                  <span>
                    <i class="is-base" aria-hidden="true" />
                    {props.range.baseLabel}
                  </span>
                </div>
                <LineChart
                  labels={series.value.labels}
                  fullLabels={series.value.fullLabels}
                  series={series.value.data}
                  unit={unit}
                  onPointClick={(i: number) => props.onDetail(monthDetail(props.range, props.filters, i, metric.value))}
                />
              </>
            )}
          </section>

          <section class="ana2-card">
            <header class="ana2-card__head">
              <div class="ana2-card__titles">
                <h3>Что дало изменение</h3>
                <span>
                  {metricLabels[metric.value]} · вклад каждой группы в дельту к базе
                </span>
              </div>
              <CuboSelect
                value={driverGroup.value}
                variants={visibleGroups.map((g) => ({ value: g.id, label: g.label }))}
                language="ru"
                onChange={(v: unknown) => (driverGroup.value = (v as AnaGroupKey) ?? 'direction')}
              />
            </header>
            {props.empty || !drivers.value.length ? (
              <div class="ana2-empty">Нет данных по выбранным фильтрам</div>
            ) : (
              <>
                <p class="ana2-note">{driverSummary.value}</p>
                <DeltaBars
                  rows={drivers.value.map((r) => ({ ...r, display: fmtSigned(r.delta, unit) }))}
                  onClick={(key: string) => props.onDetail(groupDetail(props.range, props.filters, driverGroup.value, key, metric.value))}
                />
              </>
            )}
          </section>

          <section class="ana2-card">
            <header class="ana2-card__head">
              <div class="ana2-card__titles">
                <h3>
                  {metricLabels[metric.value]} · {groupLabels[lineGroup.value].toLowerCase()}
                </h3>
                <span>Помесячно за период; крупнейшие группы включены, остальные — пилюлями</span>
              </div>
              <CuboSelect
                value={lineGroup.value}
                variants={visibleGroups.map((g) => ({ value: g.id, label: g.label }))}
                language="ru"
                onChange={(v: unknown) => (lineGroup.value = (v as AnaGroupKey) ?? 'direction')}
              />
            </header>
            <div class="ana2-series">
              {lineSeries.value.names.map((n) => {
                const idx = lineSeries.value.names.indexOf(n)
                const on = lineVisible.value.includes(n)
                return (
                  <button
                    key={n}
                    type="button"
                    class={['ana2-series__pill', on && 'is-active']}
                    aria-pressed={on}
                    onClick={() => (lineVisible.value = on ? lineVisible.value.filter((v) => v !== n) : [...lineVisible.value, n])}
                  >
                    <i class={`is-${SERIES_COLORS[idx % SERIES_COLORS.length]}`} aria-hidden="true" />
                    <span>{n}</span>
                  </button>
                )
              })}
            </div>
            {props.empty || !linesHaveData.value ? (
              <div class="ana2-empty">Нет данных по выбранным фильтрам</div>
            ) : (
              <LineChart labels={monthsMeta.value.map((m) => m.label)} fullLabels={monthsMeta.value.map((m) => m.full)} series={lineData.value} unit={unit} />
            )}
          </section>
        </div>
      )
    }
  },
})
