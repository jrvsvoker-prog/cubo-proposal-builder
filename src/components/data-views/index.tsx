import { computed, defineComponent, ref, type PropType } from 'vue'
import { CuboIcon, CuboSelect, CuboTable, CuboTabs, CuboText, type CuboIconName } from '@cuboapp/ui-vue'
import { leads, stageNames, profile, type Lead, type LeadStage } from '../../data/company'
import { int, money } from '../../utils/format'
import { applyClientPrimary } from '../../utils/primary-ink'
import ScreenSidebar from '../screen-sidebar'

type View = 'pipeline' | 'table' | 'cards'
type SortKey = 'child' | 'direction' | 'stage' | 'amount' | 'age'

const STAGE_ORDER: LeadStage[] = ['new', 'trial', 'contract', 'paid']

const stageTone: Record<LeadStage, 'neutral' | 'primary-weak' | 'primary' | 'success'> = {
  new: 'neutral',
  trial: 'primary-weak',
  contract: 'primary',
  paid: 'success',
}

const VIEWS: { id: View; label: string; icon: CuboIconName }[] = [
  { id: 'pipeline', label: 'Пайплайн', icon: 'layout-kanban' },
  { id: 'table', label: 'Таблица', icon: 'table' },
  { id: 'cards', label: 'Карточки', icon: 'layout-grid' },
]

const plural = (n: number, one: string, few: string, many: string) => {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few
  return many
}

// Демо-дата — «сегодня» профиля; возраст заявки считается от created.
const demoNow = new Date(`${profile.demoDate}T12:00:00`).getTime()
const daysOld = (lead: Lead) => Math.max(0, Math.round((demoNow - new Date(`${lead.created}T12:00:00`).getTime()) / 864e5))
const ageLabel = (lead: Lead) => `${daysOld(lead)} ${plural(daysOld(lead), 'день', 'дня', 'дней')}`

// Пороги «застоялась»: 6+ дней — тёплая, 8+ — красная подсветка возраста.
// Закрытая стадия не сигналит: возраст остаётся, но без тревожного тона.
const ageTone = (lead: Lead) =>
  lead.stage === 'paid' ? 'flat' : daysOld(lead) >= 8 ? 'danger' : daysOld(lead) >= 6 ? 'warn' : 'flat'

// Честная дельта шапки: сколько заявок создано за 7 дней до демо-даты.
const weekCount = leads.filter((l) => demoNow - new Date(`${l.created}T12:00:00`).getTime() < 7 * 864e5).length

// «₽ / мес.» → «/мес.» — дописывается к сумме в подписи и суммах колонок.
const suffixExtra = profile.dataView.amountSuffix.replace('₽', '').replace(/\s+/g, '')

const norm = (s: string) => s.toLocaleLowerCase('ru')

const StageChip = defineComponent({
  name: 'StageChip',
  props: { stage: { type: String as () => LeadStage, required: true } },
  setup(props) {
    return () => <span class={['status-tag', `is-${stageTone[props.stage]}`]}>{stageNames[props.stage]}</span>
  },
})

// Возраст заявки: нейтрально серый, тёплый от 6 дней, красный от 8.
const AgeChip = defineComponent({
  name: 'AgeChip',
  props: { lead: { type: Object as PropType<Lead>, required: true } },
  setup(props) {
    return () => <span class={['dv-age', `is-${ageTone(props.lead)}`]} title={`Заявке ${ageLabel(props.lead)}`}>{ageLabel(props.lead)}</span>
  },
})

const LeadCard = defineComponent({
  name: 'LeadCard',
  props: {
    lead: { type: Object as PropType<Lead>, required: true },
    showStage: { type: Boolean, default: false },
  },
  setup(props) {
    const subtitle = computed(() =>
      [props.lead.direction, profile.units.length ? props.lead.branch : ''].filter(Boolean).join(' · '),
    )
    const created = computed(() => daysOld(props.lead) === 0 ? 'Создана сегодня' : `Создана ${ageLabel(props.lead)} назад`)
    return () => (
      <article class="dv-card">
        <header class="dv-card__header">
          <div class="dv-card__heading">
            <strong>{props.lead.child}</strong>
            {props.showStage && <StageChip stage={props.lead.stage} />}
          </div>
          <span class="dv-card__context">{subtitle.value}</span>
        </header>
        <div class="dv-card__next">
          <span class="dv-card__label">{profile.dataView.nextLabel}</span>
          <span>{props.lead.next}</span>
        </div>
        <div class="dv-card__meta">
          <b class="dv-card__amount">
            {money(props.lead.amount)}
            {suffixExtra && <small> {suffixExtra}</small>}
          </b>
          <span class="dv-card__created">{created.value}</span>
        </div>
      </article>
    )
  },
})

// Сегмент и подпись используют одну колонку. Малые доли — отдельные полосы
// с общей шкалой: подписи не сжимаются, длины остаются пропорциональны суммам.
const FunnelStrip = defineComponent({
  name: 'FunnelStrip',
  props: { items: { type: Array as PropType<Lead[]>, required: true } },
  setup(props) {
    const stages = computed(() =>
      STAGE_ORDER.map((stage) => {
        const items = props.items.filter((l) => l.stage === stage)
        return { stage, count: items.length, sum: items.reduce((acc, l) => acc + l.amount, 0) }
      }),
    )
    const total = computed(() => stages.value.reduce((acc, s) => acc + s.sum, 0))
    const separated = computed(() => total.value === 0 || stages.value.some((s) => s.sum / total.value < 0.1))
    return () => (
      <div class={['dv-funnel', separated.value && 'is-separated']} role="group" aria-label="Суммы заявок по стадиям">
        <div class="dv-funnel__stages" style={{ '--funnel-columns': stages.value.map((s) => `minmax(0, ${s.sum}fr)`).join(' ') }}>
          {stages.value.map((s) => (
            <div class={['dv-funnel__item', s.count === 0 && s.sum === 0 && 'is-empty']} key={s.stage}>
              <div class="dv-funnel__track" aria-hidden="true">
                <i
                  class={['dv-funnel__seg', `is-${stageTone[s.stage]}`]}
                  style={{ '--funnel-share': `${total.value > 0 ? s.sum / total.value * 100 : 0}%` }}
                />
              </div>
              <div class="dv-funnel__caption">
                <span>{stageNames[s.stage]}</span>
                <b>{s.count} · {money(s.sum)}</b>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
})

const PipelineView = defineComponent({
  name: 'PipelineView',
  props: { items: { type: Array as PropType<Lead[]>, required: true } },
  setup(props) {
    const stages = computed(() =>
      STAGE_ORDER.map((stage) => {
        const items = props.items.filter((l) => l.stage === stage)
        return { stage, items, sum: items.reduce((acc, l) => acc + l.amount, 0) }
      }),
    )
    return () => (
      <div class="dv-pipe">
        {stages.value.map((col) => (
          <section class="dv-pipe__col" key={col.stage}>
            <div class="dv-pipe__head">
              <i class={['dv-pipe__dot', `is-${stageTone[col.stage]}`]} aria-hidden="true" />
              <span class="dv-pipe__name">{stageNames[col.stage]}</span>
              <span class="dv-pipe__count">{col.items.length}</span>
            </div>
            <p class="dv-pipe__sum">
              <b>{int(col.sum)}</b>
              <span>{profile.dataView.amountSuffix}</span>
            </p>
            <div class="dv-pipe__cards">
              {col.items.length
                ? col.items.map((lead) => (
                    <LeadCard lead={lead} key={lead.id} />
                  ))
                : <div class="dv-pipe__empty">Нет заявок</div>}
            </div>
          </section>
        ))}
      </div>
    )
  },
})

const CardsView = defineComponent({
  name: 'CardsView',
  props: { items: { type: Array as PropType<Lead[]>, required: true } },
  setup(props) {
    return () => (
      <div class="dv-cards">
        {props.items.length
          ? props.items.map((lead) => <LeadCard lead={lead} key={lead.id} showStage />)
          : <div class="dv-empty">Под фильтры ничего не подходит</div>}
      </div>
    )
  },
})

export default defineComponent({
  name: 'DataViews',
  setup() {
    applyClientPrimary(profile.theme.primary)
    const view = ref<View>('pipeline')
    const query = ref('')
    const allDirections = [...new Set(leads.map((l) => l.direction))]
    const directions = ref<string[]>([...allDirections])
    const branches = ref<string[]>([...profile.units])

    // Таблица по умолчанию — ворклист: сначала самые старые заявки.
    const sort = ref<{ key: SortKey; dir: 'asc' | 'desc' } | null>({ key: 'age', dir: 'desc' })

    const filtered = computed(() => {
      const q = norm(query.value.trim())
      return leads.filter((l) =>
        (!q || norm(`${l.child} ${l.direction} ${l.branch} ${l.next}`).includes(q)) &&
        directions.value.includes(l.direction) &&
        (!profile.units.length || branches.value.includes(l.branch)),
      )
    })

    const filteredSum = computed(() => filtered.value.reduce((acc, l) => acc + l.amount, 0))
    const hasUnits = profile.units.length > 1
    const dirty = computed(() =>
      query.value.trim() !== '' ||
      directions.value.length !== allDirections.length ||
      branches.value.length !== profile.units.length,
    )
    const reset = () => {
      query.value = ''
      directions.value = [...allDirections]
      branches.value = [...profile.units]
    }

    const sortGet = (l: Lead, key: SortKey): string | number =>
      key === 'amount' ? l.amount
        : key === 'age' ? daysOld(l)
        : key === 'stage' ? STAGE_ORDER.indexOf(l.stage)
        : key === 'direction' ? l.direction
        : l.child

    const tableRows = computed(() => {
      if (!sort.value) return filtered.value
      const { key, dir } = sort.value
      const mul = dir === 'asc' ? 1 : -1
      return [...filtered.value].sort((a, b) => {
        const va = sortGet(a, key)
        const vb = sortGet(b, key)
        return (typeof va === 'number' && typeof vb === 'number' ? va - vb : String(va).localeCompare(String(vb), 'ru')) * mul
      })
    })

    const sortMark = (key: SortKey) => (sort.value?.key === key ? sort.value.dir : undefined)

    const columns = computed(() => [
      {
        key: 'child', label: profile.dataView.nameLabel, sortable: true, sortActive: sortMark('child'),
        bodyCell: (row: Lead) => <span class="dv-tbl__name" title={row.child}>{row.child}</span>,
        footCell: (t: unknown) => <span class="dv-tbl__foot-label">Итого · {(t as { count: number }).count}</span>,
      },
      {
        key: 'direction', label: profile.dataView.directionLabel, sortable: true, sortActive: sortMark('direction'),
        bodyCell: (row: Lead) => <span class="dv-tbl__ell" title={row.direction}>{row.direction}</span>,
      },
      ...(profile.units.length ? [{
        key: 'branch', label: profile.unitSingular, width: '80px',
        bodyCell: (row: Lead) => <span class="dv-tbl__ell dv-tbl__muted" title={row.branch}>{row.branch}</span>,
      }] : []),
      {
        key: 'stage', label: 'Стадия', sortable: true, sortActive: sortMark('stage'), width: '148px',
        bodyCell: (row: Lead) => <StageChip stage={row.stage} />,
      },
      {
        key: 'amount', label: 'Сумма', align: 'right' as const, sortable: true, sortActive: sortMark('amount'), width: '88px',
        bodyCell: (row: Lead) => <span class="dv-tbl__num">{money(row.amount)}</span>,
        footCell: (t: unknown) => <span class="dv-tbl__num dv-tbl__foot-sum">{money((t as { sum: number }).sum)}</span>,
      },
      {
        key: 'age', label: 'Возраст', align: 'right' as const, sortable: true, sortActive: sortMark('age'), width: '92px',
        bodyCell: (row: Lead) => <AgeChip lead={row} />,
      },
      {
        key: 'next', label: profile.dataView.nextLabel,
        bodyCell: (row: Lead) => <span class="dv-tbl__ell dv-tbl__muted" title={row.next}>{row.next}</span>,
      },
    ])

    const caption = computed(() => {
      const n = filtered.value.length
      const count = `${n} ${plural(n, 'заявка', 'заявки', 'заявок')}`
      const scoped = n === leads.length ? count : `${count} из ${leads.length}`
      return `${scoped} на ${money(filteredSum.value)}${suffixExtra}`
    })

    return () => (
      <div class="dv cubo-client-theme" data-cubo-gtc-bridge="" data-gtc-theme="light" data-gtc-size="medium">
        <ScreenSidebar
          app={profile.name}
          nav={profile.navigation}
          active={profile.dataView.nav.find(n => profile.navigation.includes(n))}
          initials={profile.staffInitials}
          staffName={profile.staffName}
          staffRole={profile.staffRole}
          logo={profile.logo}
        />
        <div class="dv__inner">
          <header class="dv__page">
            <div class="dv__titles">
              <h3>{profile.dataView.title}</h3>
              <p class="dv__meta">
                <span>{caption.value}</span>
                {weekCount > 0 && <span class="delta-pill is-up">+{weekCount} за неделю</span>}
              </p>
            </div>
            <CuboTabs
              class="dv__views"
              tabs={VIEWS.map((v) => ({ id: v.id, label: v.label, icon: v.icon }))}
              active={view.value}
              format="pill"
              tone="neutral"
              onChange={(v: unknown) => (view.value = v as View)}
            />
          </header>

          <div class="dv-filters" role="group" aria-label="Фильтры списка">
            <div class="dv-tool dv-tool--search">
              <span class="dv-tool__label">Поиск</span>
              <CuboText
                value={query.value}
                prefixIcon="search"
                placeholder={`${profile.dataView.nameLabel}, ${profile.dataView.directionLabel.toLocaleLowerCase('ru')}…`}
                aria-label="Поиск по списку"
                onChange={(v: string) => (query.value = v)}
              />
            </div>
            <div class="dv-tool">
              <span class="dv-tool__label">{profile.dataView.directionLabel}</span>
              <CuboSelect
                multiple
                selectAll
                maxTagCount={1}
                value={directions.value}
                variants={allDirections.map((d) => ({ value: d, label: d }))}
                onChange={(v: unknown) => (directions.value = (v as string[]) ?? [])}
              >
                {{ variant: ({ variant }: { variant: { label: string } }) => <span class="dv-filter-option">{variant.label}</span> }}
              </CuboSelect>
            </div>
            {hasUnits && (
              <div class="dv-tool">
                <span class="dv-tool__label">{profile.unitPlural}</span>
                <CuboSelect
                  multiple
                  selectAll
                  maxTagCount={1}
                  value={branches.value}
                  variants={profile.units.map((u) => ({ value: u, label: u }))}
                  onChange={(v: unknown) => (branches.value = (v as string[]) ?? [])}
                />
              </div>
            )}
            {dirty.value && (
              <button
                type="button"
                class="dv-tool__reset"
                title="Сбросить фильтры"
                aria-label="Сбросить фильтры"
                onClick={reset}
              >
                <CuboIcon icon="refresh" size={16} />
              </button>
            )}
          </div>

          <FunnelStrip items={filtered.value} />

          {view.value === 'pipeline' && <PipelineView items={filtered.value} />}

          {view.value === 'table' && (
            <div class={['dv__table', profile.units.length > 0 && 'dv__table--units']}>
              <CuboTable
                size="small"
                rows={tableRows.value}
                columns={columns.value}
                totals={{ count: filtered.value.length, sum: filteredSum.value }}
                hoverable
                language="ru"
                emptyText="Под фильтры ничего не подходит"
                onSetSort={(ctx: { key: string; direction: 'asc' | 'desc' }) => (sort.value = { key: ctx.key as SortKey, dir: ctx.direction })}
              />
            </div>
          )}

          {view.value === 'cards' && <CardsView items={filtered.value} />}
        </div>
      </div>
    )
  },
})
