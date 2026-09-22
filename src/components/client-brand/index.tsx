import { computed, defineComponent } from 'vue'

/** Маркер клиента: встроенный PNG/SVG или буква. Cubo сюда не подставлять. */
export default defineComponent({
  name: 'ClientBrand',
  props: {
    letter: { type: String, required: true },
    src: { type: String, default: '' },
  },
  setup(props) {
    const mark = computed(() => props.letter.trim().charAt(0).toLocaleUpperCase('ru') || '•')
    return () => props.src
      ? (
        <span class="client-brand client-brand--logo">
          <img src={props.src} alt="" />
        </span>
      )
      : <span class="client-brand client-brand--letter">{mark.value}</span>
  },
})
