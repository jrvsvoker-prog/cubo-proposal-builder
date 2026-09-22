import { defineComponent, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { CuboIcon } from '@cuboapp/ui-vue'
import { deltaLabel } from '../../../utils/format'

// Детализация показателя: что стоит за числом.
// Открывается из KPI, точек графиков, строк-баров и таблиц.

export interface DetailColumn {
  key: string
  label: string
  align?: 'right'
}

export interface DetailPayload {
  title: string
  /** Контекст: период и применённые фильтры. */
  context: string[]
  /** Главная строка: значение, база, дельта. */
  headline: { label: string; value: string; base?: string; delta?: number }
  columns: DetailColumn[]
  rows: Record<string, string>[]
  footer?: string
}

export default defineComponent({
  name: 'AnaDetailModal',
  props: {
    payload: { type: null as unknown as () => DetailPayload | null, default: null },
    onClose: { type: Function, required: true },
  },
  setup(props) {
    const card = ref<HTMLElement>()
    const closeBtn = ref<HTMLButtonElement>()
    let lastFocus: HTMLElement | null = null

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && props.payload) props.onClose()
    }

    watch(
      () => props.payload,
      async (open) => {
        if (open) {
          lastFocus = document.activeElement as HTMLElement | null
          window.addEventListener('keydown', onKey)
          await nextTick()
          const bounds = card.value?.getBoundingClientRect()
          if (bounds && (bounds.top < 12 || bounds.bottom > window.innerHeight - 12)) {
            card.value?.scrollIntoView({ block: 'center', behavior: 'instant' })
          }
          closeBtn.value?.focus({ preventScroll: true })
        } else {
          window.removeEventListener('keydown', onKey)
          lastFocus?.focus?.()
          lastFocus = null
        }
      },
    )
    onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

    return () => {
      const p = props.payload
      if (!p) return null
      return (
        <div class="ana2-modal" role="presentation" onClick={(e: MouseEvent) => e.target === e.currentTarget && props.onClose()}>
          <section ref={card} class="ana2-modal__card" role="dialog" aria-modal="true" aria-label={p.title}>
            <header class="ana2-modal__head">
              <h3>{p.title}</h3>
              <button ref={closeBtn} type="button" class="ana2-modal__close" aria-label="Закрыть" onClick={() => props.onClose()}>
                <CuboIcon icon="x-mark" size={16} />
              </button>
            </header>
            <div class="ana2-modal__context" aria-label="Установленные фильтры">
              {p.context.map((c) => (
                <span key={c} class="ana2-modal__chip">
                  {c}
                </span>
              ))}
            </div>
            <div class="ana2-modal__stats">
              <div class="ana2-modal__stat">
                <span>{p.headline.label}</span>
                <b>{p.headline.value}</b>
              </div>
              {p.headline.base && (
                <div class="ana2-modal__stat is-base">
                  <span>База</span>
                  <b>{p.headline.base}</b>
                </div>
              )}
              {p.headline.delta !== undefined && (
                <div class="ana2-modal__stat">
                  <span>Дельта</span>
                  <b>{deltaLabel(p.headline.delta)}</b>
                </div>
              )}
            </div>
            <div class="ana2-modal__table" tabindex={0}>
              <table>
                <thead>
                  <tr>
                    {p.columns.map((c) => (
                      <th key={c.key} class={c.align === 'right' && 'is-num'}>
                        {c.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {p.rows.map((r, i) => (
                    <tr key={i}>
                      {p.columns.map((c) => (
                        <td key={c.key} class={c.align === 'right' && 'is-num'}>
                          {r[c.key] ?? ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {!p.rows.length && (
                    <tr>
                      <td colspan={p.columns.length} class="is-empty">
                        Нет данных по выбранным фильтрам
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {p.footer && <footer class="ana2-modal__footer">{p.footer}</footer>}
          </section>
        </div>
      )
    }
  },
})
