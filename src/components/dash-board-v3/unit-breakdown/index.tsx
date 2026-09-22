import { computed, defineComponent, type PropType } from 'vue'
import { aggregate, deltaMetric, formatMetric, type DashboardModel, type Metric, type PeriodSpec } from '../../../data/dashboard-model'
import { byUnitsWord } from './utils'

const pillTone = (c: number | null, b: number | null) => (c === null || b === null || b === 0 ? 'is-zero' : c >= b ? 'is-up' : 'is-down')

/** Разбивка периода по подразделениям: сумма, доля и динамика к базе. */
export default defineComponent({
  name: 'ProposalUnitBreakdown',
  props: {
    model: { type: Object as PropType<DashboardModel>, required: true },
    units: { type: Array as () => string[], required: true },
    period: { type: Object as PropType<PeriodSpec>, required: true },
    baseSpec: { type: Object as PropType<PeriodSpec>, default: undefined },
    metric: { type: Object as PropType<Metric>, required: true },
    /** Вторая строка для школ: заполняемость мест на конец периода. */
    fillMetric: { type: Object as PropType<Metric>, default: undefined },
    totalLabel: { type: String, required: true },
    unitPlural: { type: String, required: true },
  },
  setup(props) {
    const value = (ids: number[], spec: PeriodSpec) => aggregate(props.metric, ids.map(i => props.model.raw(i, spec)))
    const rows = computed(() => {
      const total = value(props.model.ids, props.period)
      return props.model.ids
        .map(i => {
          const current = value([i], props.period)
          const base = props.baseSpec ? value([i], props.baseSpec) : null
          const fill = props.fillMetric ? aggregate(props.fillMetric, [props.model.raw(i, props.period)]) : null
          return {
            id: i,
            name: props.units[i] ?? `${props.unitPlural} ${i + 1}`,
            current,
            base,
            fill,
            share: total ? ((current ?? 0) / total) * 100 : 0,
          }
        })
        .sort((a, b) => (b.current ?? 0) - (a.current ?? 0))
    })
    const total = computed(() => value(props.model.ids, props.period))
    const totalBase = computed(() => (props.baseSpec ? value(props.model.ids, props.baseSpec) : null))
    const pct = (v: number) => new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(v)
    return () => (
      <section class={['pdash-card', 'pdash-units', props.units.length > 8 && 'is-many']} data-testid="unit-breakdown">
        <header class="pdash-card__head">
          <div class="pdash-card__titles">
            <h4 class="pdash-card__title">По {byUnitsWord(props.unitPlural)}</h4>
            <p class="pdash-card__sub">{props.metric.name} за выбранный период</p>
          </div>
        </header>
        <div class="pdash-units__total">
          <span class="pdash-units__name">{props.totalLabel}</span>
          {props.baseSpec && <span class={['delta-pill', pillTone(total.value, totalBase.value)]}>{deltaMetric(total.value, totalBase.value, props.metric)}</span>}
          <span class="pdash-units__value">{formatMetric(total.value, props.metric)}</span>
        </div>
        <ul class="pdash-units__list">
          {rows.value.map(r => (
            <li key={r.id} class="pdash-units__row" data-unit={r.name}>
              <div class="pdash-units__rowtop">
                <span class="pdash-units__name">{r.name}</span>
                <span class="pdash-units__share">{pct(r.share)} %</span>
              </div>
              <div class="pdash-units__amount">
                <span class="pdash-units__value">{formatMetric(r.current, props.metric)}</span>
                {props.baseSpec && <span class={['delta-pill', pillTone(r.current, r.base)]}>{deltaMetric(r.current, r.base, props.metric)}</span>}
              </div>
              <div class="pdash-units__bar" role="img" aria-label={`Доля в итоге: ${pct(r.share)} %`}>
                <i style={{ width: `${r.share}%` }} />
              </div>
              <p class="pdash-units__rowfoot">
                <span>Доля в общем итоге</span>
                {r.fill !== null && r.fill !== undefined && <span>заполняемость {pct(r.fill)} %</span>}
              </p>
            </li>
          ))}
        </ul>
      </section>
    )
  },
})
