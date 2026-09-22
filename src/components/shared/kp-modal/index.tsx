import { defineComponent, type PropType, type VNodeChild } from 'vue'
import { CuboIcon, CuboModal } from '@cuboapp/ui-vue'

const WRAP_ATTRS = {
  class: 'kp-modal cubo-client-theme',
  'data-gtc-theme': 'light',
  'data-cubo-gtc-bridge': '',
} as const

/**
 * Общий примитив модалки КП: крупный заголовок, строка-сводка, круглая ×,
 * без линий кита, опциональный подвал.
 */
export default defineComponent({
  name: 'KpModal',
  props: {
    visible: { type: Boolean, required: true },
    title: { type: String, required: true },
    meta: { type: String, default: undefined },
    width: { type: Number, default: 560 },
    onClose: { type: Function as PropType<() => void>, required: true },
  },
  setup(props, { slots }) {
    return () => (
      <CuboModal
        visible={props.visible}
        closeOnEscapePress
        closeOnBackgroundClick
        showCloseIcon={false}
        onSetVisible={(v: boolean) => { if (!v) props.onClose() }}
        wrapAttrs={{
          ...WRAP_ATTRS,
          style: `--kp-modal-width: ${props.width}px`,
        }}
      >
        {{
          default: () => (
            <div class="kp-modal__panel">
              <div class="kp-modal__head">
                <div>
                  <h2 class="kp-modal__title">{props.title}</h2>
                  {props.meta && <p class="kp-modal__meta">{props.meta}</p>}
                </div>
                <button
                  type="button"
                  class="kp-modal__close"
                  aria-label="Закрыть"
                  onClick={props.onClose}
                >
                  <CuboIcon icon="x" size={18} />
                </button>
              </div>
              <div class="kp-modal__body">
                {slots.default?.()}
              </div>
              {slots.footer && (
                <div class="kp-modal__footer">
                  {(slots.footer as () => VNodeChild)()}
                </div>
              )}
            </div>
          ),
        }}
      </CuboModal>
    )
  },
})
