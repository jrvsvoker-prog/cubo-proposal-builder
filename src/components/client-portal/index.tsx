import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import { CuboButtonV2, CuboIcon, CuboText } from '@cuboapp/ui-vue'
import { portal, profile, type PortalMessage, type PortalPayState, type PortalTone } from '../../data/company'
import { applyClientPrimary } from '../../utils/primary-ink'
import ClientBrand from '../client-brand'

type PortalView = 'login' | 'home'

const toneClass: Record<PortalTone, string> = {
  ok: 'is-ok',
  warn: 'is-warn',
  danger: 'is-danger',
  info: 'is-info',
  neutral: 'is-neutral',
}

const nowTime = () => new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })

/** Сумма из строк вида «28 000 ₽»; если ни одну не разобрать — null. */
const sumAmount = (items: { amount: string }[]) => {
  let sum = 0
  let parsed = 0
  for (const it of items) {
    const n = Number(it.amount.replace(/[^\d]/g, ''))
    if (Number.isFinite(n) && n > 0) { sum += n; parsed += 1 }
  }
  return parsed ? `${sum.toLocaleString('ru-RU')} ₽` : null
}

const plural = (n: number, one: string, few: string, many: string) => {
  const m10 = n % 10, m100 = n % 100
  if (m10 === 1 && m100 !== 11) return one
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few
  return many
}

export default defineComponent({
  name: 'ClientPortal',
  setup() {
    applyClientPrimary(profile.theme.primary)
    const view = ref<PortalView>('home')
    const email = ref(portal.login.email)
    const password = ref('')

    // Оплаты: «Оплатить» только переключает локальное состояние строк.
    const paidLocally = ref<string[]>([])
    const billOpen = ref(false)
    const stateOf = (id: string, state: PortalPayState): PortalPayState =>
      paidLocally.value.includes(id) ? 'paid' : state
    const dues = computed(() =>
      portal.payment.items
        .filter(i => stateOf(i.id, i.state) !== 'paid')
        .sort((a, b) => Number(stateOf(b.id, b.state) === 'overdue') - Number(stateOf(a.id, a.state) === 'overdue')),
    )
    const dueSum = computed(() => sumAmount(dues.value))
    const dueCaption = computed(() => {
      const n = dues.value.length
      const label = `${n} ${plural(n, 'счёт', 'счёта', 'счетов')}`
      const overdue = dues.value.filter(i => stateOf(i.id, i.state) === 'overdue')
      if (overdue.length) return `${label} · ${overdue.length} просрочен`
      const first = dues.value[0]
      return first ? `${label} · ${first.date}` : label
    })
    const history = computed(() => portal.payment.items.filter(i => stateOf(i.id, i.state) === 'paid'))
    const payAll = () => {
      if (!dues.value.length) return
      paidLocally.value = [...paidLocally.value, ...dues.value.map(i => i.id)]
    }

    // Чат с куратором: сообщения живут в данных профиля, отправленное — только на экране.
    const chatMessages = ref<PortalMessage[]>([...portal.chat.messages])
    const draft = ref('')
    const feed = ref<HTMLElement>()
    const scrollFeed = () => nextTick(() => {
      if (feed.value) feed.value.scrollTop = feed.value.scrollHeight
    })
    const send = () => {
      const text = draft.value.trim()
      if (!text) return
      chatMessages.value = [...chatMessages.value, {
        id: `own-${Date.now()}`, from: 'me', text, time: nowTime(), day: 'Сегодня',
      }]
      draft.value = ''
      scrollFeed()
    }
    const chatDays = computed(() => {
      const out: { day: string; items: PortalMessage[] }[] = []
      for (const m of chatMessages.value) {
        const last = out[out.length - 1]
        if (last && last.day === m.day) last.items.push(m)
        else out.push({ day: m.day, items: [m] })
      }
      return out
    })

    watch(view, v => { if (v === 'home') scrollFeed() }, { immediate: true })

    const submit = () => (view.value = 'home')

    return () => (
      <div class="por">
        <div class="por__switch" data-reveal>
          <button
            type="button"
            class={['por__switch-btn', view.value === 'home' && 'is-active']}
            onClick={() => (view.value = 'home')}
          >
            Кабинет
          </button>
          <button
            type="button"
            class={['por__switch-btn', view.value === 'login' && 'is-active']}
            onClick={() => (view.value = 'login')}
          >
            Вход
          </button>
        </div>

        <figure class="screen-frame">
          <div class="screen-frame__bar">
            <span class="screen-frame__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span class="screen-frame__url">{profile.urls.portal}</span>
            <span class="screen-frame__spacer" aria-hidden="true" />
          </div>
          <div class="screen-frame__body">
            {view.value === 'login' ? (
              <div class="por-login cubo-client-theme" data-cubo-gtc-bridge="" data-gtc-theme="light" data-gtc-size="medium" key="login">
                <div class="por-login__brand">
                  <span class={['por-login__mark', profile.logo && 'is-logo']} aria-hidden="true">
                    <ClientBrand letter={profile.portalCopy.mark} src={profile.logo} />
                  </span>
                  <span class="por-login__name">{profile.displayName}</span>
                </div>
                <div class="por-login__card">
                  <h4 class="por-login__title">{portal.login.title}</h4>
                  <p class="por-login__welcome">{portal.login.welcome}</p>
                  <form
                    class="por-login__form"
                    aria-label={portal.login.title}
                    onSubmit={(e: Event) => {
                      e.preventDefault()
                      submit()
                    }}
                  >
                    <label class="por-field">
                      <span class="por-field__label">Почта или телефон</span>
                      <CuboText value={email.value} placeholder={portal.login.email} onChange={(v: string) => (email.value = v)} />
                    </label>
                    <label class="por-field">
                      <span class="por-field__label">Пароль</span>
                      <CuboText htmlType="password" value={password.value} placeholder="••••••••" onChange={(v: string) => (password.value = v)} />
                    </label>
                    <CuboButtonV2 tone="primary" size="md" htmlType="submit" block>
                      Войти
                    </CuboButtonV2>
                  </form>
                  <div class="por-login__links">
                    <button type="button" class="por-login__link">
                      Забыли пароль?
                    </button>
                    <p>
                      Нет доступа?{' '}
                      <button type="button" class="por-login__link">
                        Запросить ссылку для входа
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div class="por-home cubo-client-theme" data-cubo-gtc-bridge="" data-gtc-theme="light" data-gtc-size="medium" key="home">
                <div class="por-home__col">
                  <header class="por-bar">
                    <div class="por-bar__brand">
                      <span class={['por-bar__mark', profile.logo && 'is-logo']} aria-hidden="true">
                        <ClientBrand letter={profile.portalCopy.mark} src={profile.logo} />
                      </span>
                      <span class="por-bar__name">{profile.displayName}</span>
                    </div>
                    <div class="por-bar__me">
                      <span class="por-bar__myname">{portal.parent.name}</span>
                      <span class="por-bar__ava" aria-hidden="true">{portal.parent.initials}</span>
                    </div>
                  </header>

                  <div class="por-home__hello">
                    <h4 class="por-home__greeting">{profile.portalCopy.greeting}, {portal.parent.name}!</h4>
                    <p class="por-home__date">{profile.portalCopy.dateLabel}</p>
                  </div>

                  <div class="por-grid">
                  <div class="por-col">
                  {dues.value.length ? (
                    <section class="por-card por-due">
                      <span class="por-card__label">{profile.portalCopy.dueLabel}</span>
                      <div class="por-due__sum">
                        <b>{dueSum.value ?? ''}</b>
                        <span class="por-due__cap">{dueCaption.value}</span>
                      </div>
                      <ul class="por-rows">
                        {dues.value.map(p => {
                          const overdue = stateOf(p.id, p.state) === 'overdue'
                          const dateLabel = overdue
                            ? p.date.charAt(0).toUpperCase() + p.date.slice(1)
                            : p.date
                          return (
                            <li class="por-row" key={p.id}>
                              <div class="por-row__info">
                                <strong>{p.label}</strong>
                                <span class={overdue ? 'is-danger' : undefined}>{dateLabel}</span>
                              </div>
                              <b class={['por-row__amount', overdue && 'is-danger']}>{p.amount}</b>
                            </li>
                          )
                        })}
                      </ul>
                      <div class="por-due__actions">
                        <div class="por-due__pay">
                          <CuboButtonV2 tone="primary" size="md" block onClick={payAll}>
                            {dueSum.value ? `Оплатить ${dueSum.value}` : 'Оплатить'}
                          </CuboButtonV2>
                        </div>
                        <CuboButtonV2
                          tone="neutral"
                          appearance="outline"
                          size="md"
                          leadIcon="file-text"
                          aria-expanded={billOpen.value ? 'true' : 'false'}
                          onClick={() => { billOpen.value = !billOpen.value }}
                        >
                          {billOpen.value ? 'Скрыть' : profile.portalCopy.billTitle}
                        </CuboButtonV2>
                      </div>
                      {billOpen.value && (
                        <p class="por-note" role="status">
                          <b>{profile.portalCopy.billTitle}</b>
                          {' · '}
                          {profile.portalCopy.billText}
                        </p>
                      )}
                    </section>
                  ) : (
                    <section class="por-card por-clear">
                      <span class="por-pill is-ok">
                        <CuboIcon icon="circle-check" size={13} aria-hidden="true" />
                        {profile.portalCopy.allPaidLabel}
                      </span>
                    </section>
                  )}
                  </div>

                  <div class="por-col">
                  <section class="por-card">
                    <ul class="por-rows por-rows--plain">
                      {portal.upcoming.map((item, i) => (
                        <li class="por-next" key={item.label}>
                          <span class="por-next__icon" aria-hidden="true">
                            <CuboIcon icon={item.icon ?? 'calendar-event'} size={16} />
                          </span>
                          <div class="por-next__text">
                            <span class="por-card__label">{item.label}</span>
                            <strong>{item.name}</strong>
                            <span class="por-next__cap">{item.caption}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section class="por-card">
                    <header class="por-card__head">
                      <CuboIcon icon="users-group" size={16} aria-hidden="true" />
                      <h5>{profile.portalCopy.itemsTitle}</h5>
                    </header>
                    <ul class="por-rows">
                      {portal.children.map(child => (
                        <li class="por-item" key={child.name}>
                          <div class="por-item__top">
                            <strong>{child.name}</strong>
                            {child.status && (
                              <span class={['por-pill', toneClass[child.status.tone]]}>{child.status.label}</span>
                            )}
                          </div>
                          <span class="por-item__cap">{child.caption}</span>
                          {child.sub && (
                            <div class="por-item__sub">
                              <div
                                class="por-item__bar"
                                role="img"
                                aria-label={`${child.sub.text}: пройдено ${child.sub.used} из ${child.sub.total}`}
                              >
                                <i style={{ width: `${Math.min(100, Math.round((child.sub.used / Math.max(1, child.sub.total)) * 100))}%` }} />
                              </div>
                              <span class="por-item__meta">
                                {child.sub.text}
                                {child.sub.until ? ` · ${child.sub.until}` : ''}
                              </span>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </section>
                  </div>

                  <div class="por-col">
                  <section class="por-card por-chat">
                    <header class="por-card__head">
                      <CuboIcon icon="message-2" size={16} aria-hidden="true" />
                      <h5>{portal.chat.title}</h5>
                    </header>
                    <div class="por-chat__peer">
                      <span class="por-chat__ava" aria-hidden="true">{portal.chat.peer.initials}</span>
                      <div class="por-chat__who">
                        <strong>{portal.chat.peer.name}</strong>
                        <span>{portal.chat.peer.role}</span>
                      </div>
                      <span class="por-pill is-ok">{portal.chat.peer.status}</span>
                    </div>
                    <div class="por-chat__feed" ref={feed} aria-live="polite" aria-label="Сообщения">
                      {chatDays.value.length ? chatDays.value.map(g => (
                        <div class="por-chat__day" key={g.day}>
                          <span class="por-chat__daychip">{g.day}</span>
                          {g.items.map(m => (
                            <div class={['por-msg', m.from === 'me' && 'is-me']} key={m.id}>
                              <p>{m.text}</p>
                              <span class="por-msg__time">{m.time}</span>
                            </div>
                          ))}
                        </div>
                      )) : (
                        <div class="por-chat__empty">
                          <span class="por-chat__empty-ic" aria-hidden="true">
                            <CuboIcon icon="message-2" size={20} />
                          </span>
                          <strong>{portal.chat.emptyTitle}</strong>
                          <p>{portal.chat.emptyText}</p>
                        </div>
                      )}
                    </div>
                    <form
                      class="por-chat__form"
                      onSubmit={(e: Event) => {
                        e.preventDefault()
                        send()
                      }}
                    >
                      <CuboText
                        value={draft.value}
                        placeholder="Сообщение…"
                        htmlAttrs={{ 'aria-label': 'Текст сообщения' }}
                        onChange={(v: string) => (draft.value = v)}
                        onEnter={send}
                      />
                      <CuboButtonV2
                        tone="primary"
                        size="md"
                        iconOnly
                        leadIcon="send-2"
                        ariaLabel="Отправить сообщение"
                        htmlType="submit"
                        disabled={!draft.value.trim()}
                      />
                    </form>
                  </section>

                  {history.value.length ? (
                    <section class="por-card por-history">
                      <header class="por-card__head">
                        <CuboIcon icon="file-text" size={16} aria-hidden="true" />
                        <h5>{profile.portalCopy.historyTitle}</h5>
                      </header>
                      <ul class="por-rows">
                        {history.value.map(p => (
                          <li class="por-row" key={p.id}>
                            <div class="por-row__info">
                              <strong>{p.label}</strong>
                              <span>{p.state === 'paid' ? p.date : 'оплачен только что'}</span>
                            </div>
                            <div class="por-row__side">
                              <b class="por-row__amount">{p.amount}</b>
                              <span class="por-pill is-ok">
                                <CuboIcon icon="circle-check" size={13} aria-hidden="true" />
                                Оплачено
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}
                  </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </figure>
      </div>
    )
  },
})
