import { defineComponent, type PropType } from 'vue'

export interface RingSegment {
  /** Доля кольца 0..1 */
  pct: number
  color: string
}

/** Концентрические кольца прогресса: трек + дуги от 12 часов по часовой. */
export default defineComponent({
  name: 'MedRing',
  props: {
    size: { type: Number, required: true },
    stroke: { type: Number, required: true },
    track: { type: String, required: true },
    gap: { type: Number, default: 3 },
    segments: { type: Array as PropType<RingSegment[]>, required: true },
  },
  setup(props) {
    const half = () => props.size / 2
    const dash = (r: number, pct: number) => {
      const c = 2 * Math.PI * r
      const len = Math.max(0, Math.min(1, pct)) * c
      return `${len} ${c - len}`
    }
    return () => {
      const h = half()
      return (
        <svg viewBox={`0 0 ${props.size} ${props.size}`} class="med-ring" aria-hidden="true">
          {props.segments.map((s, i) => {
            const r = h - props.stroke / 2 - i * (props.stroke + props.gap)
            if (r <= 0) return null
            return (
              <g key={i}>
                <circle class="med-ring__track" cx={h} cy={h} r={r} stroke-width={props.stroke} stroke={props.track} />
                <circle
                  class="med-ring__arc"
                  cx={h}
                  cy={h}
                  r={r}
                  stroke-width={props.stroke}
                  stroke={s.color}
                  stroke-dasharray={dash(r, s.pct)}
                  transform={`rotate(-90 ${h} ${h})`}
                />
              </g>
            )
          })}
        </svg>
      )
    }
  },
})
