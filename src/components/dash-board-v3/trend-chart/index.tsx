import { computed, defineComponent, onBeforeUnmount, onMounted, ref, useId, type PropType } from 'vue'
import type { DashboardModel, PeriodChoice, PeriodSpec } from '../../../data/dashboard-model'
import { smoothPath } from '../utils/curve'
import { fmtAxis, fmtMoney, fullLabel, miniLabel, niceMax, shiftKey, shortLabel } from './utils'

const HEIGHT = 272
const PAD = { l: 48, r: 16, t: 16, b: 28 }
const MONTHS = 12

/** Динамика главного денежного показателя за 12 месяцев до конца периода. */
export default defineComponent({
  name: 'ProposalTrendChart',
  props: {
    model: { type: Object as PropType<DashboardModel>, required: true },
    period: { type: Object as PropType<PeriodChoice>, required: true },
    /** true — добавить линию «год назад» (те же 12 месяцев минус год). */
    showBase: { type: Boolean, default: false },
    metricName: { type: String, required: true },
  },
  setup(props) {
    const plot = ref<HTMLElement>()
    const width = ref(560)
    let observer: ResizeObserver | undefined
    const hoverIdx = ref<number | null>(null)
    const gradientId = `pdash-chart-area-${useId()}`

    onMounted(() => {
      if (!plot.value) return
      // Первый замер сразу: колбэк наблюдателя приходит только с очередным кадром.
      width.value = plot.value.offsetWidth || width.value
      observer = new ResizeObserver(([e]) => { width.value = e.contentRect.width })
      observer.observe(plot.value)
    })
    onBeforeUnmount(() => observer?.disconnect())

    const endKey = computed(() => {
      const keys = props.period.current.keys
      return keys?.length ? keys[keys.length - 1] : props.period.current.end.slice(0, 7)
    })
    const months = computed(() => Array.from({ length: MONTHS }, (_, k) => shiftKey(endKey.value, k - MONTHS + 1)))
    const sum = (key: string) => props.model.ids.reduce((s, i) => s + props.model.monthlyRaw(i, key).cash, 0)
    const values = computed(() => months.value.map(sum))
    const baseValues = computed(() => (props.showBase ? months.value.map(k => sum(shiftKey(k, -MONTHS))) : undefined))
    const total = computed(() => values.value.reduce((result, value) => result + value, 0))
    const baseTotal = computed(() => baseValues.value?.reduce((result, value) => result + value, 0))
    const totalDelta = computed(() => {
      if (!props.showBase || baseTotal.value === undefined) return null
      const base = baseTotal.value
      if (base === 0) return { tone: 'is-zero', label: 'база 0' }
      const change = ((total.value - base) / base) * 100
      const rounded = Math.round(change * 10) / 10
      return {
        tone: Math.abs(rounded) < 0.05 ? 'is-zero' : rounded > 0 ? 'is-up' : 'is-down',
        label: `${rounded > 0 ? '+' : ''}${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 }).format(rounded)} %`,
      }
    })

    const highlight = computed(() => new Set(props.period.current.keys ?? [endKey.value]))

    const chart = computed(() => {
      const w = width.value
      const innerW = Math.max(40, w - PAD.l - PAD.r)
      const innerH = HEIGHT - PAD.t - PAD.b
      const step = innerW / (MONTHS - 1)
      const x = (i: number) => PAD.l + i * step
      const all = baseValues.value ? [...values.value, ...baseValues.value] : values.value
      const yMax = niceMax(Math.max(...all))
      const y = (v: number) => PAD.t + innerH * (1 - v / yMax)
      const pts = values.value.map((v, i) => ({ x: x(i), y: y(v) }))
      const line = smoothPath(pts, [PAD.t, PAD.t + innerH])
      const area = `${line} L ${x(MONTHS - 1).toFixed(1)},${y(0).toFixed(1)} L ${x(0).toFixed(1)},${y(0).toFixed(1)} Z`
      const base = baseValues.value?.map((v, i) => ({ x: x(i), y: y(v) })) ?? []
      const baseLine = base.length ? smoothPath(base, [PAD.t, PAD.t + innerH]) : ''
      const hi = months.value.map((k, i) => (highlight.value.has(k) ? i : -1)).filter(i => i >= 0)
      const ticks = [0, 1, 2, 3, 4].map(f => ({ v: (yMax * f) / 4, y: y((yMax * f) / 4) }))
      const labelEvery = innerW / MONTHS >= 34 ? 1 : innerW / MONTHS >= 19 ? 2 : 3
      const labels = months.value
        .map((key, i) => {
          const showYear = i === 0 || i === MONTHS - 1 || key.endsWith('-01')
          return { i, x: x(i), text: showYear ? `${shortLabel(key)} ${key.slice(2, 4)}` : shortLabel(key) }
        })
        // Шаг считаем от последнего месяца: он подписан всегда, соседние подписи не слипаются.
        .filter(label => (MONTHS - 1 - label.i) % labelEvery === 0)
      return { w, innerW, innerH, step, x, y, yMax, pts, line, area, base, baseLine, ticks, labels }
    })

    // Тап по графику закрепляет месяц (повторный тап по нему же снимает), скролл убирает тултип.
    const selectFromPointer = (e: PointerEvent) => {
      const svg = e.currentTarget as SVGSVGElement
      const rect = svg.getBoundingClientRect()
      const px = e.clientX - rect.left
      const idx = Math.max(0, Math.min(MONTHS - 1, Math.round((px - PAD.l) / chart.value.step)))
      if (e.pointerType === 'touch' && hoverIdx.value === idx) hoverIdx.value = null
      else hoverIdx.value = idx
    }

    const onPointerLeave = (e: PointerEvent) => {
      // У касания после отпускания браузер сам посылает pointerleave — тултип должен остаться.
      if (e.pointerType !== 'touch') hoverIdx.value = null
    }

    const onKeydown = (e: KeyboardEvent) => {
      const current = hoverIdx.value ?? MONTHS - 1
      const next = e.key === 'ArrowLeft' ? current - 1
        : e.key === 'ArrowRight' ? current + 1
          : e.key === 'Home' ? 0
            : e.key === 'End' ? MONTHS - 1
              : null
      if (next === null) return
      e.preventDefault()
      hoverIdx.value = Math.max(0, Math.min(MONTHS - 1, next))
    }

    const tip = computed(() => {
      const idx = hoverIdx.value
      if (idx === null) return null
      const c = chart.value
      const value = values.value[idx]
      const base = baseValues.value?.[idx]
      const tipInset = Math.min(120, c.w / 2)
      return {
        left: Math.max(tipInset, Math.min(c.w - tipInset, c.x(idx))),
        top: Math.min(c.y(value), base !== undefined ? c.y(base) : Infinity) - 12,
        month: fullLabel(months.value[idx]),
        value: fmtMoney(value),
        base: base !== undefined ? fmtMoney(base) : undefined,
        inPeriod: highlight.value.has(months.value[idx]),
      }
    })

    // Узкая карточка (~1024): диапазон — «сен 25 — авг 26», легенда переносится
    // под заголовок целиком, а не давит заголовок в две строки.
    const isNarrow = computed(() => width.value < 480)

    const summary = computed(() =>
      `${props.metricName} по месяцам: ${fullLabel(months.value[0])} — ${fullLabel(months.value[MONTHS - 1])}, всего ${fmtMoney(total.value)}. Стрелки влево и вправо меняют выбранный месяц.`)

    return () => {
      const c = chart.value
      const hi = months.value.map((k, i) => (highlight.value.has(k) ? i : -1)).filter(i => i >= 0)
      return (
        <section class={['pdash-card', 'pdash-chart', isNarrow.value && 'is-narrow']} data-testid="trend-chart" aria-label={summary.value}>
          <header class="pdash-card__head">
            <div class="pdash-card__titles">
              <h4 class="pdash-card__title">{props.metricName === 'Поступления' ? 'Динамика поступлений' : props.metricName === 'Выручка' ? 'Динамика выручки' : 'Динамика продаж'}</h4>
              <p class="pdash-card__sub">
                {isNarrow.value
                  ? `${miniLabel(months.value[0])} — ${miniLabel(months.value[MONTHS - 1])}`
                  : `${fullLabel(months.value[0])} — ${fullLabel(months.value[MONTHS - 1])}`}
              </p>
            </div>
            <ul class="pdash-chart__legend" aria-hidden="true">
              <li><i class="is-current" />{props.metricName.toLowerCase()}</li>
              {props.showBase && <li><i class="is-base" />год назад</li>}
            </ul>
          </header>
          <div class="pdash-chart__summary">
            <strong class="pdash-chart__summary-value">{fmtMoney(total.value)}</strong>
            <span class="pdash-chart__summary-label">за 12 месяцев</span>
            {totalDelta.value && <span class={['delta-pill', totalDelta.value.tone]}>{totalDelta.value.label}</span>}
          </div>
          <div class="pdash-chart__plot" ref={plot}>
            <svg
              width={c.w}
              height={HEIGHT}
              role="img"
              tabindex={0}
              aria-label={summary.value}
              onPointermove={selectFromPointer}
              onPointerdown={selectFromPointer}
              onPointerleave={onPointerLeave}
              onPointercancel={() => { hoverIdx.value = null }}
              onFocus={() => { hoverIdx.value = MONTHS - 1 }}
              onBlur={() => { hoverIdx.value = null }}
              onKeydown={onKeydown}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                  <stop class="pdash-chart__gradient-start" offset="0%" stop-opacity="0.2" />
                  <stop class="pdash-chart__gradient-end" offset="100%" stop-opacity="0.02" />
                </linearGradient>
              </defs>
              {c.ticks.map(t => (
                <g key={t.v}>
                  <line class="pdash-chart__grid" x1={PAD.l} x2={c.w - PAD.r} y1={t.y} y2={t.y} />
                  <text class="pdash-chart__axis-y" x={PAD.l - 8} y={t.y + 3.5}>{fmtAxis(t.v)}</text>
                </g>
              ))}
              {c.labels.map(l => <text key={l.i} class="pdash-chart__axis-x" x={l.x} y={HEIGHT - 8}>{l.text}</text>)}
              <path class="pdash-chart__area" d={c.area} fill={`url(#${gradientId})`} />
              {c.baseLine && <path class="pdash-chart__line is-base" d={c.baseLine} />}
              <path class="pdash-chart__line" d={c.line} />
              {hi.map(i => <circle key={i} class="pdash-chart__dot" cx={c.x(i)} cy={c.y(values.value[i])} r={2.75} />)}
              {hoverIdx.value !== null && (
                <g class="pdash-chart__hover">
                  <line x1={c.x(hoverIdx.value)} x2={c.x(hoverIdx.value)} y1={PAD.t} y2={HEIGHT - PAD.b} />
                  <circle cx={c.x(hoverIdx.value)} cy={c.y(values.value[hoverIdx.value])} r={4} />
                  {c.baseLine && <circle class="is-base" cx={c.x(hoverIdx.value)} cy={c.y((baseValues.value ?? [])[hoverIdx.value])} r={3.5} />}
                </g>
              )}
            </svg>
            {tip.value && (
              <div class="pdash-chart__tip" style={{ left: `${tip.value.left}px`, top: `${tip.value.top}px` }}>
                <p class="pdash-chart__tip-month">
                  {tip.value.month}
                  {tip.value.inPeriod && <span> · выбранный период</span>}
                </p>
                <p class="pdash-chart__tip-value">{tip.value.value}</p>
                {tip.value.base && <p class="pdash-chart__tip-base">год назад: {tip.value.base}</p>}
              </div>
            )}
          </div>
          <p class="pdash-chart__note">По месяцам · выбранный период отмечен на линии</p>
        </section>
      )
    }
  },
})
