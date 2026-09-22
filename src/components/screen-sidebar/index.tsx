import { computed, defineComponent, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { CuboIcon } from '@cuboapp/ui-vue'
import ClientBrand from '../client-brand'
import { isLogoMark } from '../../utils/logo-fit'

/** Декоративный левый сайдбар демо-экрана: бренд, поиск, меню, пользователь. */
export default defineComponent({
  name: 'ScreenSidebar',
  props: {
    app: { type: String, required: true },
    nav: { type: Array as () => string[], default: () => [] },
    /** Активный пункт меню; по умолчанию — первый. */
    active: { type: String, default: '' },
    initials: { type: String, default: 'АС' },
    staffName: { type: String, default: '' },
    staffRole: { type: String, default: '' },
    logo: { type: String, default: '' },
  },
  setup(props) {
    const root = ref<HTMLElement>()
    const collapsed = ref(false)
    const railOpen = ref(false)
    const query = ref('')
    const toggle = () => { collapsed.value = !collapsed.value }

    const focusRef = (selector: string) => nextTick(() => root.value?.querySelector<HTMLElement>(selector)?.focus({ preventScroll: true }))
    const openRail = () => { railOpen.value = true; focusRef('.scr-sidebar__toggle') }
    const closeRail = (backFocus = true) => {
      if (!railOpen.value) return
      railOpen.value = false
      query.value = ''
      if (backFocus) focusRef('.scr-sidebar__mark-btn')
    }

    const onDocPointerdown = (e: PointerEvent) => { if (root.value && !root.value.contains(e.target as Node)) closeRail(false) }
    const onDocKeydown = (e: KeyboardEvent) => { if (e.key === 'Escape') closeRail() }
    const setRailListeners = (on: boolean) => {
      if (on) {
        document.addEventListener('pointerdown', onDocPointerdown, true)
        document.addEventListener('keydown', onDocKeydown)
      } else {
        document.removeEventListener('pointerdown', onDocPointerdown, true)
        document.removeEventListener('keydown', onDocKeydown)
      }
    }
    watch(railOpen, setRailListeners)
    onBeforeUnmount(() => setRailListeners(false))

    // Маркер в узкой рейке открывает меню поверх контента; свёрнутое на десктопе — разворачивает.
    // Узость рейки меряем в момент клика: CSS сам решает, какой вариант бренд-строки показывать.
    const pressMark = () => {
      const rail = (root.value?.offsetWidth ?? 999) <= 100
      if (rail && !collapsed.value) openRail()
      else toggle()
    }

    const iconFor = (item: string) => {
      const s = item.toLocaleLowerCase('ru')
      if (/(показател|обзор|дашборд)/.test(s)) return 'layout-dashboard'
      if (/(ученик|клиент|карточка|профиль)/.test(s)) return 'id-badge'
      if (/(заявк|лид)/.test(s)) return 'clipboard-list'
      if (/(оплат|платеж|платёж|финанс)/.test(s)) return 'credit-card'
      if (/(аналитик|отчет|отчёт)/.test(s)) return 'report-analytics'
      return 'list-details'
    }

    // Маркер бренда — первая буква продукта на primary (С/К/П).
    const markLetter = computed(() => props.app.trim().charAt(0).toLocaleUpperCase('ru'))
    // В рейке нужен квадратный знак. Широкое слово туда не влезает — рисуем букву.
    const railLogo = computed(() => props.logo && isLogoMark(props.logo) ? props.logo : '')

    // Поиск работает как фильтр меню; nav остаётся декоративным.
    const visibleNav = computed(() => {
      const q = query.value.trim().toLocaleLowerCase('ru')
      return q ? props.nav.filter(item => item.toLocaleLowerCase('ru').includes(q)) : props.nav
    })

    return () => (
      <aside
        ref={root}
        class={['scr-sidebar', collapsed.value && 'is-collapsed', railOpen.value && 'is-rail-open']}
      >
        <div class="scr-sidebar__brand">
          <button
            type="button"
            class="scr-sidebar__mark-btn"
            aria-label="Развернуть меню"
            aria-expanded={railOpen.value}
            onClick={pressMark}
          >
            <span class={['scr-sidebar__mark', railLogo.value && 'is-logo']} aria-hidden="true">
              <ClientBrand letter={markLetter.value} src={railLogo.value} />
            </span>
            <span class="scr-sidebar__mark-btn-icon" aria-hidden="true">
              <CuboIcon icon="layout-sidebar" size={20} />
            </span>
          </button>
          <span class={['scr-sidebar__mark', props.logo && 'is-logo']} aria-hidden="true">
            <ClientBrand letter={markLetter.value} src={props.logo} />
          </span>
          {!props.logo && <span class="scr-sidebar__app">{props.app}</span>}
          <button
            type="button"
            class="scr-sidebar__toggle"
            aria-label="Свернуть меню"
            aria-expanded={true}
            onClick={() => (railOpen.value ? closeRail() : toggle())}
          >
            <CuboIcon icon="layout-sidebar" size={20} />
          </button>
        </div>
        {props.nav.length > 0 && (
          <>
            <div class="scr-sidebar__search">
              <CuboIcon icon="search" size={16} />
              <input
                type="text"
                class="scr-sidebar__input"
                placeholder="Поиск"
                aria-label="Поиск по разделам"
                value={query.value}
                onInput={(e: Event) => { query.value = (e.target as HTMLInputElement).value }}
                onKeydown={(e: KeyboardEvent) => { if (e.key === 'Escape') { query.value = ''; (e.currentTarget as HTMLElement).blur() } }}
              />
            </div>
            <nav class="scr-sidebar__nav" aria-hidden="true">
              {visibleNav.value.length
                ? visibleNav.value.map(item => (
                  <span key={item} class={['scr-sidebar__item', item === (props.active || props.nav[0]) && 'is-active']}>
                    <CuboIcon icon={iconFor(item)} size={20} />
                    <span class="scr-sidebar__label">{item}</span>
                  </span>
                ))
                : <span class="scr-sidebar__empty">Ничего не найдено</span>}
            </nav>
          </>
        )}
        <span class="scr-sidebar__spacer" aria-hidden="true" />
        {props.staffName ? (
          <div class="scr-sidebar__user">
            <span class="scr-sidebar__avatar" aria-hidden="true">{props.initials}</span>
            <span class="scr-sidebar__user-text">
              <span class="scr-sidebar__user-name">{props.staffName}</span>
              <span class="scr-sidebar__user-role">{props.staffRole}</span>
            </span>
          </div>
        ) : (
          <span class="scr-sidebar__avatar" aria-hidden="true">{props.initials}</span>
        )}
      </aside>
    )
  },
})
