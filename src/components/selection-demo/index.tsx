import { computed, defineComponent, ref } from 'vue'
import { CuboIcon } from '@cuboapp/ui-vue'
import { massStats, selectionCourses, profile } from '../../data/company'
import { applyClientPrimary } from '../../utils/primary-ink'
import ScreenFrame from '../screen-frame'
import ClientBrand from '../client-brand'

type SelectionView = 'personal' | 'mass'
type Mark = 'like' | 'pass'

// Подписи конверсии между шагами воронки (массовая подборка).
const CONV_LABELS = ['', 'от отправленных', 'от открывших', 'от отреагировавшихся']

// «24 000 ₽ / мес» → сумма и суффикс для итога выбранного.
const parsePrice = (price: string) => {
  const m = /([\d\s ]+)\s*₽(.*)/.exec(price)
  return m ? { value: Number(m[1].replace(/[\s ]/g, '')), suffix: m[2].trim() } : null
}

export default defineComponent({
  name: 'SelectionDemo',
  setup() {
    applyClientPrimary(profile.theme.primary)
    const view = ref<SelectionView>('personal')
    const marks = ref<Record<string, Mark | undefined>>(
      Object.fromEntries(
        selectionCourses.map((c) => [c.id, profile.selection.initialLiked.includes(c.id) ? 'like' : undefined]),
      ),
    )
    const submitted = ref<string[]>([])

    const setMark = (id: string, mark: Mark) => {
      submitted.value = []
      marks.value = { ...marks.value, [id]: marks.value[id] === mark ? undefined : mark }
    }

    const liked = computed(() => selectionCourses.filter((c) => marks.value[c.id] === 'like'))
    const passedCount = computed(() => selectionCourses.filter((c) => marks.value[c.id] === 'pass').length)

    // Итог считаем, только если все отмеченные цены разобрались и единицы совпадают.
    const likedSum = computed(() => {
      const parsed = liked.value.map((c) => parsePrice(c.price))
      if (!parsed.length || parsed.some((p) => !p)) return null
      const suffix = parsed[0]!.suffix
      if (!parsed.every((p) => p!.suffix === suffix)) return null
      const total = parsed.reduce((acc, p) => acc + p!.value, 0)
      return `≈ ${total.toLocaleString('ru-RU')} ₽${suffix ? ` ${suffix}` : ''}`
    })

    const summary = computed(() => {
      const parts: string[] = []
      if (liked.value.length) {
        parts.push(`Интересно: ${liked.value.length}${likedSum.value ? ` · ${likedSum.value}` : ''}`)
      }
      if (passedCount.value) parts.push(`не подходит: ${passedCount.value}`)
      if (!parts.length) return 'Отметьте интересное сердечком'
      if (!liked.value.length) return `«Не подходит»: ${passedCount.value} — ${sender.name} предложит другие варианты`
      return parts.join(' · ')
    })

    const submit = () => {
      submitted.value = liked.value.map((c) => c.name)
    }

    const frameUrl = computed(() =>
      view.value === 'personal' ? profile.urls.selection : profile.urls.selectionMass,
    )

    const sender = profile.selection.sender
    const senderBlock = (action?: string) => (
      <div class="sel-sender">
        <span class="sel-sender__avatar" aria-hidden="true">{sender.name[0]}</span>
        <span class="sel-sender__name">
          {sender.name}, <span class="sel-sender__role">{sender.role}</span>
        </span>
        {action ? <span class="sel-sender__action">{action}</span> : null}
      </div>
    )

    const senderFirstName = sender.name.split(' ')[0]

    const massConv = computed(() =>
      massStats.map((s, i) => (i ? Math.round((s.value / massStats[i - 1].value) * 100) : null)),
    )

    return () => (
      <div class="sel">
        <div class="sel__switch" data-reveal>
          <button
            type="button"
            class={['sel__switch-btn', view.value === 'personal' && 'is-active']}
            aria-pressed={view.value === 'personal'}
            onClick={() => (view.value = 'personal')}
          >
            Индивидуальная
          </button>
          <button
            type="button"
            class={['sel__switch-btn', view.value === 'mass' && 'is-active']}
            aria-pressed={view.value === 'mass'}
            onClick={() => (view.value = 'mass')}
          >
            Массовая
          </button>
        </div>

        <ScreenFrame url={frameUrl.value}>
          {view.value === 'personal' ? (
            <div class="sel-personal cubo-client-theme" data-cubo-gtc-bridge="" data-gtc-theme="light" key="personal">
              <header class="sel-personal__head">
                <div class="sel-brand">
                  <span class={['sel-brand__mark', profile.logo && 'is-logo']} aria-hidden="true">
                    <ClientBrand letter={profile.initials} src={profile.logo} />
                  </span>
                  <span class="sel-brand__name">{profile.displayName}</span>
                </div>
                <span class="sel-personal__hint">
                  <CuboIcon icon="lock" size={12} aria-hidden="true" />
                  {profile.selection.hint}
                </span>
              </header>
              <h4 class="sel-personal__title">{profile.selection.title}</h4>
              {senderBlock()}
              <p class="sel-personal__sub">{profile.selection.description}</p>
              <div class="sel-personal__list">
                {selectionCourses.map((course) => {
                  const mark = marks.value[course.id]
                  return (
                    <div class={['sel-course', mark === 'like' && 'is-liked', mark === 'pass' && 'is-passed']} key={course.id}>
                      <div class="sel-course__info">
                        <strong title={course.name}>{course.name}</strong>
                        <span title={course.caption}>{course.caption}</span>
                      </div>
                      <div class="sel-course__side">
                        <span class="sel-course__price">{course.price}</span>
                        <div class="sel-course__acts">
                          <button
                            type="button"
                            class={['sel-course__like', mark === 'like' && 'is-liked']}
                            aria-pressed={mark === 'like'}
                            aria-label={mark === 'like' ? `Убрать отметку «${course.name}»` : `Отметить «${course.name}» интересным`}
                            onClick={() => setMark(course.id, 'like')}
                          >
                            <CuboIcon icon="heart" size={16} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            class={['sel-course__pass', mark === 'pass' && 'is-passed']}
                            aria-pressed={mark === 'pass'}
                            aria-label={mark === 'pass' ? `Убрать отметку «не подходит» с «${course.name}»` : `Отметить «${course.name}» как неподходящее`}
                            onClick={() => setMark(course.id, 'pass')}
                          >
                            <CuboIcon icon="thumb-down" size={16} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <footer class="sel-personal__foot">
                <span class="sel-personal__count" aria-live="polite">
                  {submitted.value.length
                    ? `${senderFirstName} получит отметки и свяжется с вами`
                    : summary.value}
                </span>
                <div class="sel-personal__actions">
                  <button
                    type="button"
                    class="sel-personal__cta"
                    disabled={!liked.value.length || submitted.value.length > 0}
                    onClick={submit}
                  >
                    {submitted.value.length ? (
                      <>
                        <CuboIcon icon="circle-check" size={16} aria-hidden="true" />
                        Заявка отправлена
                      </>
                    ) : (
                      profile.selection.action
                    )}
                  </button>
                  <button type="button" class="sel-personal__contact-btn">
                    <CuboIcon icon="message-circle" size={16} aria-hidden="true" />
                    {profile.selection.contact}
                  </button>
                </div>
              </footer>
            </div>
          ) : (
            <div class="sel-mass cubo-client-theme" data-cubo-gtc-bridge="" data-gtc-theme="light" key="mass">
              <header class="sel-mass__head">
                <div class="sel-brand">
                  <span class={['sel-brand__mark', profile.logo && 'is-logo']} aria-hidden="true">
                    <ClientBrand letter={profile.initials} src={profile.logo} />
                  </span>
                  <span class="sel-brand__name">{profile.displayName}</span>
                </div>
              </header>
              <h4 class="sel-mass__title">{profile.selection.massTitle}</h4>
              {senderBlock(sender.massAction)}
              <p class="sel-mass__sub">{profile.selection.massHint}</p>
              <div class="sel-mass__stats">
                {massStats.map((stat, i) => (
                  <div class="sel-mass__stat" key={stat.label}>
                    <b>{stat.value}</b>
                    <span>{stat.label}</span>
                    {massConv.value[i] !== null && (
                      <i class="sel-mass__conv">
                        {massConv.value[i]}% {CONV_LABELS[i]}
                      </i>
                    )}
                  </div>
                ))}
              </div>
              <div class="sel-mass__list">
                {selectionCourses.map((course) => {
                  const reacted = course.likes + course.dislikes
                  const pct = Math.round((course.likes / reacted) * 100)
                  return (
                    <div class="sel-mass__row" key={course.id}>
                      <div class="sel-mass__row-name">
                        <strong title={course.name}>{course.name}</strong>
                        <span title={course.caption}>{course.caption}</span>
                      </div>
                      <div
                        class="sel-mass__bar"
                        role="img"
                        aria-label={`«${course.name}»: интересно ${course.likes} из ${reacted} отреагировавших (${pct}%)`}
                      >
                        <i style={{ width: `${pct}%` }} />
                      </div>
                      <div class="sel-mass__row-value">
                        <b>{pct}%</b>
                        <span>{course.likes} за · {course.dislikes} против</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </ScreenFrame>
      </div>
    )
  },
})
