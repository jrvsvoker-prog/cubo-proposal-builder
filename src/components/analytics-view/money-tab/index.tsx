import { profile } from '../../../data/profile'
import { groupLabels, availableGroups } from '../../../data/analytics-copy'
import { computed, defineComponent, ref, type PropType } from 'vue'
import { CuboSelect } from '@cuboapp/ui-vue'
import { anaDebtCompare, anaMonthly, type AnaFilters, type AnaGroupKey, type AnaMoneyMetric, type AnaRange } from '../../../data/analytics'
import { compactMoney, int } from '../../../utils/format'
import { KpiCard, LineChart, DeltaPill, type ChartSeries } from '../charts'
import { debtGroupDetail, moneyMonthDetail } from '../utils/details'
import type { DetailPayload } from '../detail-modal'

// Деньги: начисления, оплаты, предоплаты и задолженность периода.
// KPI-ряд — селектор метрики графика (как на «Динамике»); отдельный блок —
// «Где висит долг»: остаток по разрезам с инвертированной дельтой.

const MONEY_KPIS: { id: AnaMoneyMetric; icon: string; label: string; invert?: boolean }[] = [
  { id: 'accrued', icon: 'book-2', label: 'Начислено' },
  { id: 'paid', icon: 'credit-card', label: 'Оплаты' },
  { id: 'prepay', icon: 'pig-money', label: 'Предоплаты' },
  { id: 'debt', icon: 'report-money', label: 'Долг на конец', invert: true },
]

const DEBT_GROUPS: { id: AnaGroupKey; label: string }[] = [
  { id: 'branch', label: groupLabels.branch },
  { id: 'direction', label: groupLabels.direction },
  { id: 'source', label: 'Источники' },
  { id: 'program', label: groupLabels.program },
]

const visibleDebtGroups = DEBT_GROUPS.filter((g) => availableGroups.includes(g.id))

export default defineComponent({
  name: 'AnaMoneyTab',
  props: {
    range: { type: Object as () => AnaRange, required: true },
    filters: { type: Object as () => AnaFilters, required: true },
    empty: { type: Boolean, required: true },
    onDetail: { type: Function as PropType<(p: DetailPayload) => void>, required: true },
  },
  setup(props) {
    const metric = ref<AnaMoneyMetric>('paid')
    const debtGroup = ref<AnaGroupKey>(availableGroups.includes('branch') ? 'branch' : 'direction')

    const months = computed(() => anaMonthly(props.range.current, props.filters))
    const baseMonths = computed(() => anaMonthly(props.range.base, props.filters))

    const sum = (rows: ReturnType<typeof anaMonthly>, key: 'accrued' | 'paid' | 'prepay') =>
      rows.reduce((a, m) => a + m[key], 0)

    const debtEnd = computed(() => months.value[months.value.length - 1]?.debtEnd ?? 0)
    const baseDebtEnd = computed(() => baseMonths.value[baseMonths.value.length - 1]?.debtEnd ?? 0)

    const kpiNum = (id: AnaMoneyMetric, cur: boolean) => {
      const m = cur ? months.value : baseMonths.value
      if (id === 'debt') return cur ? debtEnd.value : baseDebtEnd.value
      return sum(m, id)
    }

    const series = computed<{ labels: string[]; fullLabels: string[]; data: ChartSeries[] }>(() => {
      const name = MONEY_KPIS.find((k) => k.id === metric.value)?.label ?? ''
      const val = (m: ReturnType<typeof anaMonthly>[number]) =>
        metric.value === 'accrued' ? m.accrued : metric.value === 'paid' ? m.paid : metric.value === 'prepay' ? m.prepay : m.debtEnd
      return {
        labels: months.value.map((m) => m.label.split(' ')[0]),
        fullLabels: months.value.map((m) => `${m.label} · ${name.toLowerCase()}`),
        data: [
          { name: 'Текущий период', color: 'current', values: months.value.map(val) },
          { name: props.range.baseLabel, color: 'base', values: baseMonths.value.map(val) },
        ],
      }
    })

    const debtRows = computed(() => anaDebtCompare(props.range.current, props.range.base, props.filters, debtGroup.value))
    const debtMax = computed(() => Math.max(1, ...debtRows.value.map((r) => r.cur)))

    const tableRows = computed(() =>
      months.value.map((m, i) => ({
        id: String(i),
        month: m.label,
        accrued: compactMoney(m.accrued),
        paid: compactMoney(m.paid),
        prepay: compactMoney(m.prepay),
        debt: compactMoney(m.debtEnd),
        raw: m,
      })),
    )

    return () => {
      const m = months.value
      const hasMoney = !props.empty && m.some((x) => x.accrued > 0 || x.paid > 0 || x.prepay > 0)
      return (
        <div class="ana2-tab">
          <p class="ana2-note">{profile.analyticsConfig.moneyNote}</p>
          <div class="ana2-grid4" role="group" aria-label="Метрика графика денег">
            {MONEY_KPIS.map((k) => (
              <KpiCard
                key={k.id}
                icon={k.icon}
                label={k.label}
                value={compactMoney(kpiNum(k.id, true))}
                base={compactMoney(kpiNum(k.id, false))}
                current={kpiNum(k.id, true)}
                baseNum={kpiNum(k.id, false)}
                invert={k.invert}
                active={metric.value === k.id}
                onClick={() => (metric.value = k.id)}
              />
            ))}
          </div>

          <section class="ana2-card">
            <header class="ana2-card__head">
              <div class="ana2-card__titles">
                <h3>{MONEY_KPIS.find((k) => k.id === metric.value)?.label} · динамика</h3>
                <span>
                  {props.range.currentLabel} · сравнение с {props.range.baseLabel}
                </span>
              </div>
            </header>
            {hasMoney ? (
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
                <LineChart labels={series.value.labels} fullLabels={series.value.fullLabels} series={series.value.data} unit="money" />
              </>
            ) : (
              <div class="ana2-empty">Нет данных по выбранным фильтрам</div>
            )}
          </section>

          <section class="ana2-card">
            <header class="ana2-card__head">
              <div class="ana2-card__titles">
                <h3>Где висит долг</h3>
                <span>Остаток по начислениям периода на его конец · меньше — лучше</span>
              </div>
              <CuboSelect
                value={debtGroup.value}
                variants={visibleDebtGroups.map((g) => ({ value: g.id, label: g.label }))}
                language="ru"
                onChange={(v: unknown) => (debtGroup.value = (v as AnaGroupKey) ?? 'direction')}
              />
            </header>
            {props.empty || !debtRows.value.length ? (
              <div class="ana2-empty">Нет данных по выбранным фильтрам</div>
            ) : (
              <div class="ana2-bars">
                {debtRows.value.map((r) => (
                  <button
                    key={r.key}
                    type="button"
                    class="ana2-bar is-clickable"
                    onClick={() => props.onDetail(debtGroupDetail(props.range, props.filters, debtGroup.value, r.key))}
                  >
                    <span class="ana2-bar__top">
                      <span class="ana2-bar__name">{r.label}</span>
                      <span class="ana2-bar__nums">
                        <b class="ana2-bar__value">{compactMoney(r.cur)}</b>
                        <span class="ana2-bar__share">{r.shareCur}%</span>
                        <DeltaPill current={r.cur} base={r.base} invert />
                      </span>
                    </span>
                    <span class="ana2-bar__track" aria-hidden="true">
                      <i class="is-debt" style={{ inlineSize: `${Math.max(3, (r.cur / debtMax.value) * 100)}%` }} />
                    </span>
                  </button>
                ))}
              </div>
            )}
          </section>

          <section class="ana2-card">
            <header class="ana2-card__head">
              <div class="ana2-card__titles">
                <h3>Платежи по месяцам</h3>
                <span>
                  {props.range.currentLabel} · {int(m.length)} мес.
                </span>
              </div>
            </header>
            {hasMoney ? (
              <div class="ana2-table">
                <table>
                  <thead>
                    <tr>
                      <th>Месяц</th>
                      <th class="is-num">Начислено</th>
                      <th class="is-num">Оплаты</th>
                      <th class="is-num">Предоплаты</th>
                      <th class="is-num">Долг на конец</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.value.map((row) => {
                      const open = () => props.onDetail(moneyMonthDetail(props.range, props.filters, Number(row.id)))
                      return (
                        <tr
                          key={row.id}
                          tabindex={0}
                          onClick={open}
                          onKeydown={(e: KeyboardEvent) => {
                            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open() }
                          }}
                        >
                          <td><span class="ana2-tname">{row.month}</span></td>
                          <td class="is-num">{row.accrued}</td>
                          <td class="is-num">{row.paid}</td>
                          <td class="is-num">{row.prepay}</td>
                          <td class="is-num">{row.debt}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <p class="ana2-note">Долг — срез по начислениям с начала выбранного периода до конца строки. Остатки по месяцам не суммируются.</p>
              </div>
            ) : (
              <div class="ana2-empty">Нет данных по выбранным фильтрам</div>
            )}
          </section>
        </div>
      )
    }
  },
})
