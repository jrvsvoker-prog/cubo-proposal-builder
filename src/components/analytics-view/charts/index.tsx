import { computed, defineComponent, onBeforeUnmount, onMounted, ref, useId, type PropType, type Ref } from 'vue'
import { CuboIcon } from '@cuboapp/ui-vue'
import { anaAxis } from '../../../data/analytics'
import { compactMoney, deltaLabel, int } from '../../../utils/format'
import { smoothPath } from '../../dash-board-v3/utils/curve'

// Общие примитивы графиков и карточек раздела «Аналитика».

export type ChartUnit = 'money' | 'count' | 'avg'

export const fmtUnit = (v: number, unit: ChartUnit): string => {
  if (unit === 'count') return int(v)
  if (unit === 'avg') return v >= 1000 ? `${int(Math.round(v / 1000))} тыс. ₽` : `${int(v)} ₽`
  return compactMoney(v)
}

/** «+1,8 млн ₽» / «−420» — знаковое значение для дельт драйверов. */
export const fmtSigned = (v: number, unit: ChartUnit): string => `${v > 0 ? '+' : v < 0 ? '−' : ''}${fmtUnit(Math.abs(v), unit)}`

// Подписи оси Y — короткие, без «₽»: валюта читается из легенды и тултипа,
// а длинные «20 млн ₽» обрезались о край холста.
const fmtAxis = (v: number, unit: ChartUnit): string => {
  if (unit === 'count') return int(v)
  if (v >= 1_000_000) return `${(v / 1_000_000).toLocaleString('ru-RU', { maximumFractionDigits: 1 })} млн`
  if (v >= 1_000) return `${int(Math.round(v / 1000))} тыс.`
  return int(v)
}

export interface ChartSeries {
  name: string
  /**
   * Роль цвета серии: `current` — primary клиента, `base` — серый пунктир,
   * `pro-1`…`pro-6` — монохромная рампа для категорий.
   */
  color: string
  values: number[]
}

const CH = { h: 240, padL: 56, padR: 12, padT: 16, padB: 26 }

function useWidth(host: Ref<HTMLElement | undefined>, fallback = 680) {
  const width = ref(fallback)
  let ro: ResizeObserver | undefined
  onMounted(() => {
    if (!host.value) return
    width.value = Math.max(160, host.value.clientWidth)
    ro = new ResizeObserver((entries) => {
      width.value = Math.max(160, Math.round(entries[0].contentRect.width))
    })
    ro.observe(host.value)
  })
  onBeforeUnmount(() => ro?.disconnect())
  return width
}

// Подписи оси X: сколько влезает (~56px на подпись), оба конца периода видны.
const xLabelIdx = (n: number, plotW: number): Set<number> => {
  const k = Math.max(2, Math.min(n, Math.floor(plotW / 56)))
  const idx = new Set<number>()
  for (let i = 0; i < k; i++) idx.add(Math.round((i * (n - 1)) / (k - 1)))
  return idx
}

// --- линейный график (текущий/базовый период или серии) ----------------------

export const LineChart = defineComponent({
  name: 'AnaLineChart',
  props: {
    labels: { type: Array as () => string[], required: true },
    fullLabels: { type: Array as () => string[], required: true },
    series: { type: Array as () => ChartSeries[], required: true },
    unit: { type: String as () => ChartUnit, default: 'money' },
    /** Клик по месяцу открывает детализацию. */
    onPointClick: { type: Function as PropType<(index: number) => void>, default: undefined },
  },
  setup(props) {
    const host = ref<HTMLElement>()
    const width = useWidth(host)
    const hover = ref(-1)
    const gradientId = `ana2-chart-area-${useId()}`

    const visible = computed(() => props.series.filter((s) => s.values.some((v) => v !== 0)))
    // Заливка под линией — только у пары «текущий/база»: у мультисерий
    // (средний платёж по группам) area под первой серией выглядит случайно.
    const hasArea = computed(() => props.series[0]?.color === 'current')

    const geom = computed(() => {
      const w = width.value
      const n = props.labels.length
      const axis = anaAxis(visible.value.flatMap((s) => s.values))
      const max = axis.top
      const clampY: [number, number] = [CH.padT, CH.h - CH.padB]
      const x = (i: number) => (n === 1 ? CH.padL + (w - CH.padL - CH.padR) / 2 : CH.padL + (i / (n - 1)) * (w - CH.padL - CH.padR))
      const y = (v: number) => CH.padT + (1 - v / max) * (CH.h - CH.padT - CH.padB)
      const line = (arr: number[]) => smoothPath(arr.map((v, i) => ({ x: x(i), y: y(v) })), clampY)
      const area = line(props.series[0]?.values ?? [0]) + ` L${x(n - 1).toFixed(1)},${CH.h - CH.padB} L${CH.padL},${CH.h - CH.padB} Z`
      const labelIdx = xLabelIdx(n, w - CH.padL - CH.padR)
      return { w, n, max, x, y, line, area, ticks: axis.ticks, labelIdx }
    })

    const onMove = (e: MouseEvent) => {
      const g = geom.value
      const rect = host.value?.getBoundingClientRect()
      if (!rect) return
      const ratio = (e.clientX - rect.left - CH.padL) / Math.max(g.w - CH.padL - CH.padR, 1)
      hover.value = Math.min(g.n - 1, Math.max(0, Math.round(ratio * (g.n - 1))))
    }

    return () => {
      const g = geom.value
      const hi = hover.value
      const clickable = Boolean(props.onPointClick)
      const tipX = hi >= 0 ? Math.min(Math.max(g.x(hi), 96), g.w - 96) : 0
      const tipTop = hi >= 0 ? Math.min(...visible.value.map((s) => g.y(Math.max(...s.values)))) : 0
      return (
        <div class="ana2-chart" ref={host} onMousemove={onMove} onMouseleave={() => (hover.value = -1)}>
          <svg width={g.w} height={CH.h} role="img" aria-label={props.series.map((s) => s.name).join(', ')}>
            {hasArea.value && (
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop class="ana2-chart__gradient-start" offset="0%" />
                  <stop class="ana2-chart__gradient-end" offset="100%" />
                </linearGradient>
              </defs>
            )}
            {g.ticks.map((v) => (
              <g key={v}>
                <line x1={CH.padL} x2={g.w - CH.padR} y1={g.y(v)} y2={g.y(v)} class="ana2-chart__grid" />
                <text x={CH.padL - 8} y={g.y(v) + 3} class="ana2-chart__ylab" text-anchor="end">
                  {fmtAxis(v, props.unit)}
                </text>
              </g>
            ))}
            {hasArea.value && <path d={g.area} fill={`url(#${gradientId})`} />}
            {visible.value.map((s, si) => (
              <path
                key={s.name}
                d={g.line(s.values)}
                class={['ana2-chart__line', `is-${s.color}`, si > 1 && 'is-thin']}
                pathLength={1}
              />
            ))}
            {hi >= 0 && (
              <g>
                <line x1={g.x(hi)} x2={g.x(hi)} y1={CH.padT} y2={CH.h - CH.padB} class="ana2-chart__guide" />
                {visible.value.map((s) => (
                  <circle key={s.name} cx={g.x(hi)} cy={g.y(s.values[hi] ?? 0)} r={3.5} class={['ana2-chart__dot', `is-${s.color}`]} />
                ))}
              </g>
            )}
            {props.labels.map((l, i) =>
              g.labelIdx.has(i) ? (
                <text key={l + i} x={g.x(i)} y={CH.h - 7} class="ana2-chart__xlab" text-anchor="middle">
                  {l}
                </text>
              ) : null,
            )}
            {clickable &&
              props.labels.map((_, i) => (
                <rect
                  key={`hit${i}`}
                  x={g.x(i) - (g.w - CH.padL - CH.padR) / g.n / 2}
                  y={CH.padT}
                  width={(g.w - CH.padL - CH.padR) / g.n}
                  height={CH.h - CH.padT - CH.padB}
                  fill="transparent"
                  class="ana2-chart__hit"
                  onClick={() => props.onPointClick?.(i)}
                />
              ))}
          </svg>
          {hi >= 0 && (
            <div class="ana2-chart__tip" style={{ left: `${tipX}px`, top: `${tipTop}px` }}>
              <span class="ana2-chart__tip-label">{props.fullLabels[hi]}</span>
              {visible.value.map((s) => (
                <span key={s.name} class="ana2-chart__tip-row">
                  <i class={`is-${s.color}`} />
                  {s.name}
                  <b>{fmtUnit(s.values[hi] ?? 0, props.unit)}</b>
                </span>
              ))}
              {clickable && <span class="ana2-chart__tip-hint">Нажмите для детализации</span>}
            </div>
          )}
          <span class="ana2-visually-hidden" aria-live="polite">
            {hi >= 0 ? `${props.fullLabels[hi]}: ${visible.value.map((s) => `${s.name} ${fmtUnit(s.values[hi] ?? 0, props.unit)}`).join(', ')}` : ''}
          </span>
        </div>
      )
    }
  },
})

// --- стековый график по месяцам ----------------------------------------------

export const StackedChart = defineComponent({
  name: 'AnaStackedChart',
  props: {
    labels: { type: Array as () => string[], required: true },
    fullLabels: { type: Array as () => string[], required: true },
    stacks: { type: Array as () => ChartSeries[], required: true },
    unit: { type: String as () => ChartUnit, default: 'money' },
    onMonthClick: { type: Function as PropType<(index: number) => void>, default: undefined },
  },
  setup(props) {
    const host = ref<HTMLElement>()
    const width = useWidth(host)
    const hover = ref(-1)

    const geom = computed(() => {
      const w = width.value
      const n = props.labels.length
      const totals = props.labels.map((_, i) => props.stacks.reduce((a, s) => a + (s.values[i] ?? 0), 0))
      const axis = anaAxis(totals)
      const max = axis.top
      const inner = w - CH.padL - CH.padR
      const slot = inner / n
      const bw = Math.min(38, slot * 0.62)
      const y = (v: number) => CH.padT + (1 - v / max) * (CH.h - CH.padT - CH.padB)
      const labelIdx = xLabelIdx(n, inner)
      return { w, n, totals, max, slot, bw, y, ticks: axis.ticks, labelIdx }
    })

    return () => {
      const g = geom.value
      const hi = hover.value
      const clickable = Boolean(props.onMonthClick)
      return (
        <div class="ana2-chart" ref={host}>
          <svg width={g.w} height={CH.h} role="img" aria-label="Состав продаж по месяцам">
            {g.ticks.map((v) => (
              <g key={v}>
                <line x1={CH.padL} x2={g.w - CH.padR} y1={g.y(v)} y2={g.y(v)} class="ana2-chart__grid" />
                <text x={CH.padL - 8} y={g.y(v) + 3} class="ana2-chart__ylab" text-anchor="end">
                  {fmtAxis(v, props.unit)}
                </text>
              </g>
            ))}
            {props.labels.map((l, i) => {
              const cx = CH.padL + g.slot * (i + 0.5)
              let acc = 0
              const segs = props.stacks.map((s) => {
                const v = s.values[i] ?? 0
                const y0 = g.y(acc)
                acc += v
                const y1 = g.y(acc)
                return { s, v, y: y1, h: Math.max(0, y0 - y1) }
              }).filter((seg) => seg.v > 0)
              const total = g.totals[i]
              return (
                <g
                  key={l + i}
                  class={['ana2-stack-col', clickable && 'is-clickable', hi === i && 'is-hover']}
                  onMouseenter={() => (hover.value = i)}
                  onMouseleave={() => (hover.value = -1)}
                  onClick={() => clickable && props.onMonthClick?.(i)}
                >
                  {total > 0 ? (
                    segs.map((seg) => (
                      <rect
                        key={seg.s.name}
                        x={cx - g.bw / 2}
                        y={seg.y}
                        width={g.bw}
                        height={Math.max(seg.h, 1)}
                        class={['ana2-stack-col__seg', `is-${seg.s.color}`]}
                      />
                    ))
                  ) : (
                    <rect x={cx - g.bw / 2} y={CH.h - CH.padB - 2} width={g.bw} height={2} class="ana2-stack-col__empty" />
                  )}
                  {g.labelIdx.has(i) ? (
                    <text x={cx} y={CH.h - 7} class="ana2-chart__xlab" text-anchor="middle">
                      {l}
                    </text>
                  ) : null}
                </g>
              )
            })}
          </svg>
          {hi >= 0 && (
            <div
              class="ana2-chart__tip"
              style={{ left: `${Math.min(Math.max(CH.padL + g.slot * (hi + 0.5), 96), g.w - 96)}px`, top: `${g.y(g.totals[hi])}px` }}
            >
              <span class="ana2-chart__tip-label">{props.fullLabels[hi]}</span>
              {[...props.stacks].reverse().map((s) => (
                <span key={s.name} class="ana2-chart__tip-row">
                  <i class={`is-${s.color}`} />
                  {s.name}
                  <b>{fmtUnit(s.values[hi] ?? 0, props.unit)}</b>
                </span>
              ))}
              <span class="ana2-chart__tip-row is-total">
                {props.unit === 'count' ? 'Всего' : 'Итого'}
                <b>{fmtUnit(g.totals[hi], props.unit)}</b>
              </span>
              {clickable && <span class="ana2-chart__tip-hint">Нажмите для детализации</span>}
            </div>
          )}
        </div>
      )
    }
  },
})

// --- строки-бары структуры -----------------------------------------------------

export const BarsCard = defineComponent({
  name: 'AnaBarsCard',
  props: {
    rows: {
      type: Array as () => {
        key: string
        label: string
        value: number
        display: string
        share: number
        /** Доля в базовом периоде — «было …%»; undefined — базы не было (новая группа). */
        shareBase?: number
        /** Текущее и базовое значение метрики для пилюли дельты. */
        current?: number
        base?: number
      }[],
      required: true,
    },
    onClick: { type: Function as PropType<(key: string) => void>, default: undefined },
  },
  setup(props) {
    const max = computed(() => Math.max(1, ...props.rows.map((r) => r.value)))
    return () => (
      <div class="ana2-bars">
        {props.rows.map((r) => (
          <button
            key={r.key}
            type="button"
            class={['ana2-bar', props.onClick && 'is-clickable']}
            onClick={() => props.onClick?.(r.key)}
          >
            <span class="ana2-bar__top">
              <span class="ana2-bar__name">{r.label}</span>
              <span class="ana2-bar__nums">
                <b class="ana2-bar__value">{r.display}</b>
                <span class="ana2-bar__share">
                  {r.share}%
                  {r.shareBase !== undefined && (r.shareBase ? ` · было ${r.shareBase}%` : ' · новое')}
                </span>
                {r.current !== undefined && <DeltaPill current={r.current} base={r.base ?? 0} />}
              </span>
            </span>
            <span class="ana2-bar__track" aria-hidden="true">
              <i style={{ inlineSize: `${Math.max(3, (r.value / max.value) * 100)}%` }} />
            </span>
          </button>
        ))}
      </div>
    )
  },
})

// --- драйверы изменения: вклад каждой группы в дельту ---------------------------
// Дивергентные бары от нулевой оси: вправо — кто добавил (primary), влево — кто
// убрал (danger). Ось смещается под реальный разброс, чтобы положительная
// дельта не терялась в пустой половине.

export interface DeltaBarRow {
  key: string
  label: string
  cur: number
  base: number
  delta: number
  /** Подпись дельты справа («+1,8 млн ₽»). */
  display: string
}

export const DeltaBars = defineComponent({
  name: 'AnaDeltaBars',
  props: {
    rows: { type: Array as () => DeltaBarRow[], required: true },
    /** «Меньше — лучше» (долг): знак пилюли инвертируется, бар при этом всё равно знаковый. */
    invert: { type: Boolean, default: false },
    onClick: { type: Function as PropType<(key: string) => void>, default: undefined },
  },
  setup(props) {
    const pos = computed(() => Math.max(0, ...props.rows.map((r) => r.delta)))
    const neg = computed(() => Math.max(0, ...props.rows.map((r) => -r.delta)))
    const axisPct = computed(() => {
      const t = pos.value + neg.value
      return t ? (neg.value / t) * 100 : 0
    })
    return () => (
      <div class="ana2-dbars">
        {props.rows.map((r) => {
          const up = r.delta >= 0
          const width = up ? (pos.value ? (r.delta / pos.value) * (100 - axisPct.value) : 0) : neg.value ? (-r.delta / neg.value) * axisPct.value : 0
          const style = up ? { left: `${axisPct.value}%`, inlineSize: `${width}%` } : { right: `${100 - axisPct.value}%`, inlineSize: `${width}%` }
          return (
            <button
              key={r.key}
              type="button"
              class={['ana2-dbar', props.onClick && 'is-clickable']}
              onClick={() => props.onClick?.(r.key)}
            >
              <span class="ana2-dbar__top">
                <span class="ana2-dbar__name">{r.label}</span>
                <b class={['ana2-dbar__delta', r.delta < 0 && 'is-neg']}>{r.display}</b>
                <DeltaPill current={r.cur} base={r.base} invert={props.invert} />
              </span>
              <span class="ana2-dbar__track" aria-hidden="true">
                <i class="ana2-dbar__axis" style={{ left: `${axisPct.value}%` }} />
                <i class={['ana2-dbar__fill', up ? 'is-pos' : 'is-neg']} style={style} />
              </span>
            </button>
          )
        })}
      </div>
    )
  },
})

// --- дельта и KPI --------------------------------------------------------------

export const DeltaPill = defineComponent({
  name: 'AnaDeltaPill',
  props: {
    current: { type: Number, required: true },
    base: { type: Number, required: true },
    /** Долг: уменьшение — хорошо. */
    invert: { type: Boolean, default: false },
  },
  setup(props) {
    return () => {
      if (!props.base) return <span class="ana2-delta is-none">—</span>
      const pct = Math.round(((props.current - props.base) / props.base) * 100)
      const good = props.invert ? pct < 0 : pct > 0
      const tone = pct === 0 ? 'is-zero' : good ? 'is-up' : 'is-down'
      return <span class={['ana2-delta', 'delta-pill', tone]}>{deltaLabel(pct)}</span>
    }
  },
})

export const KpiCard = defineComponent({
  name: 'AnaKpiCard',
  props: {
    icon: { type: String, required: true },
    label: { type: String, required: true },
    value: { type: String, required: true },
    base: { type: String, required: true },
    current: { type: Number, required: true },
    baseNum: { type: Number, required: true },
    invert: { type: Boolean, default: false },
    /** Карточка — селектор метрики таба: активное состояние = выбранная серия. */
    active: { type: Boolean, default: false },
    onClick: { type: Function as PropType<() => void>, default: undefined },
  },
  setup(props) {
    return () => {
      const body = (
        <>
          <span class="ana2-kpi__head">
            <span class="ana2-kpi__icon" aria-hidden="true">
              <CuboIcon icon={props.icon} size={15} />
            </span>
            <span class="ana2-kpi__name">{props.label}</span>
          </span>
          <span class="ana2-kpi__row">
            <strong class="ana2-kpi__value">{props.value}</strong>
            <DeltaPill current={props.current} base={props.baseNum} invert={props.invert} />
          </span>
          <span class="ana2-kpi__base">было {props.base}</span>
        </>
      )
      return props.onClick ? (
        <button type="button" class={['ana2-kpi', 'is-clickable', props.active && 'is-active']} aria-pressed={props.active} onClick={props.onClick}>
          {body}
        </button>
      ) : (
        <div class={['ana2-kpi', props.active && 'is-active']}>{body}</div>
      )
    }
  },
})
