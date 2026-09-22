import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import type { CuboEventUser, CuboTimelineEvent, CuboTaskEvent, CuboTimelineDraft } from '@cuboapp/ui-vue'
import { CuboButtonV2, CuboTabs, CuboTimeline } from '@cuboapp/ui-vue'
import ScreenSidebar from '../screen-sidebar'
import { entity, profile } from '../../data/company'
import { hoursAgo, scrollFeedToBottom } from './utils'
import { applyClientPrimary } from '../../utils/primary-ink'

type FeedFilter = 'all' | 'message' | 'task'

const FEED_TABS: { id: FeedFilter; label: string }[] = [
  { id: 'all', label: 'Всё' },
  { id: 'message', label: 'Сообщения' },
  { id: 'task', label: 'Задачи' },
]

export default defineComponent({
  name: 'EntityCard',
  setup() {
    // Акценты читают --client-primary — та же механика, что в ядре (dash-board-v3); foreground подбирается по контрасту.
    applyClientPrimary(profile.theme.primary)
    const feed = ref<HTMLElement>()
    const users: CuboEventUser[] = profile.entityScenario.users
    const events = ref<CuboTimelineEvent[]>(profile.entityScenario.events.map(e => e.type === 'task' ? ({
      id:e.id, type:'task', title:e.text, createdAt:hoursAgo(e.hours), done:e.done,
      assignee:users.find(u=>u.id===e.authorId),
    }) : ({
      id:e.id, type:e.type as 'system'|'message', text:e.text,
      createdAt:hoursAgo(e.hours), author:users.find(u=>u.id===e.authorId),
    })))

    const currentUser = users[2]
    const navActive = profile.navigation.find(n => /ученик|клиент|заказ/i.test(n))

    // Фильтр ленты: системные записи живут только во «Всё». Счётчики в
    // ярлыках показывают, что фильтр реально фильтрует.
    const feedFilter = ref<FeedFilter>('all')
    const visibleEvents = computed(() =>
      feedFilter.value === 'all' ? events.value : events.value.filter(e => e.type === feedFilter.value),
    )
    const feedTabs = computed(() => FEED_TABS.map(t => ({
      id: t.id,
      label: `${t.label} · ${t.id === 'all' ? events.value.length : events.value.filter(e => e.type === t.id).length}`,
    })))

    const createEvent = (draft: CuboTimelineDraft) => {
      const text = draft.text?.trim() ?? ''
      if (!text && !draft.attachments?.length) return
      const id = `own-${Date.now()}-${events.value.length}`
      events.value = [...events.value, {
        id, type: 'message', text, createdAt: new Date(), author: currentUser,
        attachments: (draft.attachments ?? []).map((file, index) => ({
          id: `${id}-${index}`, name: file.name, size: file.size, type: file.type,
        })),
      }]
    }

    const actions = entity.actions

    // Действия шапки — реальные, не «в никуда»: композер ленты, звонок
    // первому контакту, добавление задачи в ленту.
    const focusComposer = () => {
      feed.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      feed.value?.querySelector('textarea')?.focus()
    }
    const callContact = () => { if (actions.call) window.open(`tel:${actions.call}`, '_self') }
    const addTask = () => {
      const title = actions.task?.trim()
      if (!title) return
      events.value = [...events.value, {
        id: `task-${Date.now()}-${events.value.length}`, type: 'task',
        title, createdAt: new Date(), done: false, assignee: currentUser,
      }]
      feedFilter.value = 'all'
    }

    onMounted(() => scrollFeedToBottom(feed.value))
    watch(
      () => events.value.length + String(events.value[events.value.length - 1]?.id),
      () => scrollFeedToBottom(feed.value),
    )

    return () => (
      <div class="ent cubo-client-theme" data-cubo-gtc-bridge="" data-gtc-theme="light">
        <ScreenSidebar
          app={profile.name}
          nav={profile.navigation}
          active={navActive}
          initials={profile.staffInitials}
          staffName={profile.staffName}
          staffRole={profile.staffRole}
          logo={profile.logo}
        />
        <div class="ent__body">
          <header class="ent__header">
            <div class="ent__topline">
              <p class="ent-crumb">
                {navActive}
                <span class="ent-crumb__sep" aria-hidden="true">›</span>
                {entity.name}
              </p>
              <div class="ent__actions">
                <CuboButtonV2 tone="primary" size="md" leadIcon="message-2" onClick={focusComposer}>Написать</CuboButtonV2>
                {actions.call && (
                  <CuboButtonV2 tone="neutral" size="md" leadIcon="phone-call" onClick={callContact}>Позвонить</CuboButtonV2>
                )}
                {actions.task && (
                  <CuboButtonV2 tone="neutral" size="md" leadIcon="list-check" onClick={addTask}>Задача</CuboButtonV2>
                )}
              </div>
            </div>

            <div class="ent__page">
              <span class="ent__avatar" aria-hidden="true">
                {entity.initials}
              </span>
              <div class="ent__identity">
                <h3>{entity.name}</h3>
              </div>
            </div>
          </header>
          <section class="ent-card" aria-label={`Карточка: ${entity.name}`}>
            <aside class="ent-card__properties" aria-label="Свойства сущности" tabindex={0}>
              <h4 class="ent__properties-title">Свойства</h4>
              <dl class="ent-properties">
                {entity.properties.map(property => (
                  <div class="ent-property" key={property.id}>
                    <dt class="ent-property__label">{property.label}</dt>
                    <dd class="ent-property__value">
                      {property.type === 'status'
                        ? <span class="status-tag is-primary-weak">{property.value}</span>
                        : property.type === 'link'
                          ? <a class="ent-property__link" href={property.href}>{property.value}</a>
                          : property.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>

            <section class="ent-card__history" aria-label="История взаимодействий">
              <header class="ent__history-head">
                <h4 class="ent__history-title">История</h4>
                <CuboTabs
                  class="ent-feed-tabs"
                  tabs={feedTabs.value}
                  active={feedFilter.value}
                  format="pill"
                  tone="neutral"
                  onChange={(v: unknown) => { feedFilter.value = v as FeedFilter }}
                />
              </header>
              <div class="ent__feed" ref={feed}>
                <CuboTimeline
                  events={visibleEvents.value}
                  users={users}
                  currentUser={currentUser}
                  language="ru"
                  locale="ru-RU"
                  onCreateEvent={createEvent}
                  onTaskComplete={(task: CuboTaskEvent, done: boolean) => { events.value = events.value.map(e => e.id === task.id && e.type === "task" ? {...e, done, completedBy: done ? currentUser : undefined, completedAt: done ? new Date() : undefined} : e) }}
                />
              </div>
            </section>
          </section>
        </div>
      </div>
    )
  },
})
