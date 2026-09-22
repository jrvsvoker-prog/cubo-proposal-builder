import { defineComponent } from 'vue'

/** Рамка «окна браузера»: точки, адрес, внутри — живой экран. */
export default defineComponent({
  name: 'ScreenFrame',
  props: {
    url: { type: String, required: true },
  },
  setup(props, { slots }) {
    return () => (
      <figure class="screen-frame" data-reveal>
        <div class="screen-frame__bar">
          <span class="screen-frame__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span class="screen-frame__url">{props.url}</span>
          <span class="screen-frame__spacer" aria-hidden="true" />
        </div>
        <div class="screen-frame__body">{slots.default?.()}</div>
      </figure>
    )
  },
})

/** Внутренняя шапка продукта внутри рамки: маркер, раздел, навигация, аватар. */
export const ScreenChrome = defineComponent({
  name: 'ScreenChrome',
  props: {
    app: { type: String, required: true },
    section: { type: String, default: '' },
    nav: { type: Array as () => string[], default: () => [] },
    initials: { type: String, default: 'АС' },
  },
  setup(props) {
    return () => (
      <div class="scr-chrome">
        <div class="scr-chrome__mark" aria-hidden="true" />
        <span class="scr-chrome__app">{props.app}</span>
        {props.section && <span class="scr-chrome__section">{props.section}</span>}
        {props.nav.length > 0 && (
          <nav class="scr-chrome__nav" aria-hidden="true">
            {props.nav.map((item, i) => (
              <span key={item} class={['scr-chrome__nav-item', i === 0 && 'is-active']}>
                {item}
              </span>
            ))}
          </nav>
        )}
        <span class="scr-chrome__avatar" aria-hidden="true">
          {props.initials}
        </span>
      </div>
    )
  },
})
