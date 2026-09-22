import { computed, defineComponent, type PropType } from 'vue'
import { CuboIcon } from '@cuboapp/ui-vue'
import { dateLabel, deltaMetric, formatMetric, type Metric, type PeriodSpec } from '../../../data/dashboard-model'

/** Карточка одного показателя: итог по всей сети за выбранный период. */
export default defineComponent({
  name: 'ProposalKpiCard',
  props: {
    metric: { type: Object as PropType<Metric>, required: true },
    current: { type: Number as PropType<number | null>, default: null },
    /** Значение базы сравнения; null — данных за базу нет. */
    baseValue: { type: Number as PropType<number | null>, default: null },
    /** false — сравнение выключено, база не показывается. */
    hasBase: { type: Boolean, default: false },
    period: { type: Object as PropType<PeriodSpec>, required: true },
    basePeriod: { type: Object as PropType<PeriodSpec>, default: undefined },
  },
  emits: { info: () => true },
  setup(props, { emit }) {
    const icon = computed(() => ({ revenue: 'wallet', fill: 'users', debt: 'receipt', average: 'credit-card', orders: 'circle-check', students: 'school', conversion: 'target', returns: 'arrow-back-up', basket: 'shopping-cart', ontime: 'clock-check', load: 'briefcase', repeat: 'repeat' }[props.metric.id] ?? 'chart-bar'))
    const compareValue = computed(() => (props.hasBase ? props.baseValue : null))
    // Меньше — лучше (задолженность): тон пилюли инвертируется, текст остаётся честным.
    const tone = computed<'is-up' | 'is-down' | 'is-zero'>(() => {
      const c = props.current, b = compareValue.value
      if (c === null || b === null || !Number.isFinite(c) || !Number.isFinite(b)) return 'is-zero'
      const diff = props.metric.type === 'percent' ? c - b : b === 0 ? (c === 0 ? 0 : c > 0 ? 1 : -1) : Math.sign(c - b)
      if (Math.abs(diff) < 1e-9) return 'is-zero'
      const up = diff > 0
      return (up !== !!props.metric.debt ? 'is-up' : 'is-down')
    })
    return () => (
      <article class="pdash-kpi" data-metric={props.metric.id}>
        <header class="pdash-kpi__head">
          <span class="pdash-kpi__icon" aria-hidden="true"><CuboIcon icon={icon.value} size={20} /></span>
          <button type="button" class="pdash-info-btn" aria-label={`Расчёт: ${props.metric.name}`} onClick={() => emit('info')}>
            <CuboIcon icon="info-circle" size={18} />
          </button>
        </header>
        <h4 class="pdash-kpi__name">{props.metric.name}</h4>
        <strong class="pdash-kpi__value">{formatMetric(props.current, props.metric)}</strong>
        <p class="pdash-kpi__snap">{props.metric.snapshot ? `На ${dateLabel(props.period.end)}` : props.period.label}</p>
        <div class="pdash-kpi__foot">
          <small class="pdash-kpi__base">
            {props.hasBase ? (compareValue.value === null ? 'Нет данных для сравнения' : `Было ${formatMetric(compareValue.value, props.metric)}`) : 'Без сравнения'}
          </small>
          {props.hasBase && (
            <span class={['delta-pill', tone.value]}>{deltaMetric(props.current, compareValue.value, props.metric)}</span>
          )}
        </div>
      </article>
    )
  },
})
