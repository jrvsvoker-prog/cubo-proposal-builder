import { metricLabels, groupLabels, availableGroups } from '../../../data/analytics-copy'
import { computed, defineComponent, ref, type PropType } from 'vue'
import { CuboSelect, CuboText } from '@cuboapp/ui-vue'
import {
  anaGroupBy,
  anaGroupDelta,
  anaMonthly,
  salesInWindow,
  sumSales,
  type AnaFilters,
  type AnaGroupKey,
  type AnaRange,
} from '../../../data/analytics'
import { compactMoney, deltaLabel, int } from '../../../utils/format'
import { BarsCard, StackedChart, type ChartSeries } from '../charts'
import { monthDetail, groupDetail, groupTableDetail } from '../utils/details'
import type { DetailPayload } from '../detail-modal'

// Структура: из чего складывается результат и как сместился состав к базе —
// строки с долей и дельтой, стековый состав по месяцам, таблица-детализация.

const GROUPS: { id: AnaGroupKey; label: string }[] = [
  { id: 'direction', label: groupLabels.direction },
  { id: 'branch', label: groupLabels.branch },
  { id: 'source', label: 'Источники' },
  { id: 'program', label: groupLabels.program },
]

const STRUCT_METRICS = [
  { value: 'revenue', label: metricLabels.revenue },
  { value: 'count', label: metricLabels.count },
] as const

const STACK_METRICS = [
  { value: 'count', label: metricLabels.count },
  { value: 'revenue', label: metricLabels.revenue },
]

const STACK_COLORS = ['pro-1', 'pro-2', 'pro-3', 'pro-4', 'pro-5', 'pro-6']

const visibleGroups = GROUPS.filter((g) => availableGroups.includes(g.id))

export default defineComponent({
  name: 'AnaStructureTab',
  props: {
    range: { type: Object as () => AnaRange, required: true },
    filters: { type: Object as () => AnaFilters, required: true },
    empty: { type: Boolean, required: true },
    onDetail: { type: Function as PropType<(p: DetailPayload) => void>, required: true },
  },
  setup(props) {
    const structGroup = ref<AnaGroupKey>('direction')
    const structMetric = ref<'revenue' | 'count'>('revenue')
    const stackGroup = ref<AnaGroupKey>('direction')
    const stackMetric = ref<'count' | 'revenue'>('count')
    const detailGroup = ref<AnaGroupKey>('direction')
    const search = ref('')

    const rows = computed(() => salesInWindow(props.range.current, props.filters))

    // Доли сейчас и в базе + дельта — из общего сравнения по группе.
    const structure = computed(() =>
      anaGroupDelta(props.range.current, props.range.base, props.filters, structGroup.value, structMetric.value)
        .slice()
        .sort((a, b) => b.cur - a.cur || b.base - a.base)
        .map((r) => ({
          key: r.key,
          label: r.label,
          value: r.cur,
          display: structMetric.value === 'revenue' ? compactMoney(r.cur) : int(r.cur),
          share: r.shareCur,
          shareBase: r.shareBase,
          current: r.cur,
          base: r.base,
        })),
    )

    const monthsMeta = computed(() =>
      anaMonthly(props.range.current, props.filters).map((m) => ({ label: m.label.split(' ')[0], full: m.label, month: m.month })),
    )

    const stacks = computed<ChartSeries[]>(() =>
      anaGroupBy(rows.value, stackGroup.value).map((g, i) => ({
        name: g.label,
        color: STACK_COLORS[i % STACK_COLORS.length],
        values: monthsMeta.value.map((m) => {
          const t = sumSales(rows.value.filter((r) => String(r[stackGroup.value]) === g.key && r.month === m.month))
          return stackMetric.value === 'revenue' ? t.amount : t.count
        }),
      })),
    )

    // Детализация: к таблице добавлена дельта выручки к базе — сразу видно,
    // какая группа растёт, а какая проседает.
    const baseByGroup = computed(
      () => new Map(anaGroupBy(salesInWindow(props.range.base, props.filters), detailGroup.value).map((g) => [g.key, g.amount])),
    )
    const detailRows = computed(() => {
      const q = search.value.trim().toLowerCase()
      return anaGroupBy(rows.value, detailGroup.value)
        .filter((g) => !q || g.label.toLowerCase().includes(q))
        .map((g) => {
          const b = baseByGroup.value.get(g.key) ?? 0
          return { ...g, delta: b ? Math.round(((g.amount - b) / b) * 100) : null }
        })
    })

    const openGroup = (key: string) => {
      const groupRows = rows.value.filter((r) => String(r[detailGroup.value]) === key)
      props.onDetail(groupTableDetail(props.range, props.filters, detailGroup.value, key, groupRows))
    }

    return () => {
      const hasStack = !props.empty && stacks.value.some((s) => s.values.some((v) => v > 0))
      return (
        <div class="ana2-tab">
          <section class="ana2-card">
            <header class="ana2-card__head">
              <div class="ana2-card__titles">
                <h3>Структура периода</h3>
                <span>Доля и дельта к базе; смещение состава видно по «было …%»</span>
              </div>
              <div class="ana2-card__actions">
                <CuboSelect
                  value={structGroup.value}
                  variants={visibleGroups.map((g) => ({ value: g.id, label: g.label }))}
                  language="ru"
                  onChange={(v: unknown) => (structGroup.value = (v as AnaGroupKey) ?? 'direction')}
                />
                <CuboSelect
                  value={structMetric.value}
                  variants={STRUCT_METRICS.map((m) => ({ value: m.value, label: m.label }))}
                  language="ru"
                  onChange={(v: unknown) => (structMetric.value = (v as 'revenue' | 'count') ?? 'revenue')}
                />
              </div>
            </header>
            {props.empty || !structure.value.length ? (
              <div class="ana2-empty">Нет данных по выбранным фильтрам</div>
            ) : (
              <BarsCard rows={structure.value} onClick={(key: string) => props.onDetail(groupDetail(props.range, props.filters, structGroup.value, key, structMetric.value))} />
            )}
          </section>

          <section class="ana2-card">
            <header class="ana2-card__head">
              <div class="ana2-card__titles">
                <h3>Состав по месяцам</h3>
                <span>
                  Как состав менялся внутри периода · {props.range.currentLabel}
                </span>
              </div>
              <div class="ana2-card__actions">
                <CuboSelect
                  value={stackGroup.value}
                  variants={visibleGroups.map((g) => ({ value: g.id, label: g.label }))}
                  language="ru"
                  onChange={(v: unknown) => (stackGroup.value = (v as AnaGroupKey) ?? 'direction')}
                />
                <CuboSelect
                  value={stackMetric.value}
                  variants={STACK_METRICS}
                  language="ru"
                  onChange={(v: unknown) => (stackMetric.value = (v as 'count' | 'revenue') ?? 'count')}
                />
              </div>
            </header>
            {hasStack ? (
              <>
                <div class="ana2-legend ana2-legend--wrap">
                  {stacks.value.map((s) => (
                    <span key={s.name}>
                      <i class={`is-${s.color}`} aria-hidden="true" />
                      {s.name}
                    </span>
                  ))}
                </div>
                <StackedChart
                  labels={monthsMeta.value.map((m) => m.label)}
                  fullLabels={monthsMeta.value.map((m) => m.full)}
                  stacks={stacks.value}
                  unit={stackMetric.value === 'revenue' ? 'money' : 'count'}
                  onMonthClick={(i: number) => props.onDetail(monthDetail(props.range, props.filters, i, stackMetric.value === 'revenue' ? 'revenue' : 'count'))}
                />
              </>
            ) : (
              <div class="ana2-empty">Нет данных по выбранным фильтрам</div>
            )}
          </section>

          <section class="ana2-card">
            <header class="ana2-card__head">
              <div class="ana2-card__titles">
                <h3>Детализация</h3>
                <span>
                  {groupLabels[detailGroup.value]} · {int(detailRows.value.reduce((a, g) => a + g.count, 0))} · дельта — к {props.range.baseLabel}
                </span>
              </div>
              <div class="ana2-card__actions">
                <CuboSelect
                  value={detailGroup.value}
                  variants={visibleGroups.map((g) => ({ value: g.id, label: g.label }))}
                  language="ru"
                  onChange={(v: unknown) => (detailGroup.value = (v as AnaGroupKey) ?? 'direction')}
                />
                <CuboText value={search.value} placeholder="Поиск по группе" onChange={(v: string) => (search.value = v)} />
              </div>
            </header>
            {detailRows.value.length ? (
              <div class="ana2-table">
                <table>
                  <thead>
                    <tr>
                      <th>{groupLabels[detailGroup.value]}</th>
                      <th class="is-num">{metricLabels.count}</th>
                      <th class="is-num">{metricLabels.students}</th>
                      <th class="is-num">{metricLabels.revenue}</th>
                      <th class="is-num">Доля</th>
                      <th class="is-num">Δ к базе</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailRows.value.map((g) => (
                      <tr
                        key={g.key}
                        tabindex={0}
                        onClick={() => openGroup(g.key)}
                        onKeydown={(e: KeyboardEvent) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            openGroup(g.key)
                          }
                        }}
                      >
                        <td>{g.label}</td>
                        <td class="is-num">{int(g.count)}</td>
                        <td class="is-num">{int(g.students)}</td>
                        <td class="is-num">{compactMoney(g.amount)}</td>
                        <td class="is-num">{g.share}%</td>
                        <td class={['is-num', 'ana2-tdelta', g.delta === null ? '' : g.delta > 0 ? 'is-up' : g.delta < 0 ? 'is-down' : '']}>{g.delta === null ? '—' : deltaLabel(g.delta)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div class="ana2-empty">{search.value ? 'Ничего не найдено' : 'Нет данных по выбранным фильтрам'}</div>
            )}
          </section>
        </div>
      )
    }
  },
})
