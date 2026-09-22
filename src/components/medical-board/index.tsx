import { computed, defineComponent, ref, watch, type PropType } from 'vue'
import { CuboButtonV2, CuboCheckbox, CuboIcon, CuboSelect, CuboTag, CuboText } from '@cuboapp/ui-vue'
import ScreenSidebar from '../screen-sidebar'
import MedRing from './ring'
import {
  MED_ACTIVITY, MED_ALERTS, MED_CAL, MED_NAV, MED_PATIENT, MED_SLEEP, MED_STEPS, MED_TABLE,
} from '../../data/medical'

/** Тон → семантический акцент GTC (primary клиента, success, info и т.д.). */
const TONE: Record<string, string> = {
  primary: 'var(--gtc-theme-accent-primary-surface)',
  success: 'var(--gtc-theme-accent-success-surface)',
  info: 'var(--gtc-theme-accent-info-surface)',
  feature: 'var(--gtc-theme-accent-feature-surface)',
  danger: 'var(--gtc-theme-accent-danger-surface)',
  warning: 'var(--gtc-theme-accent-warning-surface)',
}
const TRACK = 'var(--gtc-theme-surface-page)'

const Pager = (props: { label: string; unit: string }) => (
  <div class="med-pager" role="group" aria-label="Период">
    <button type="button" class="med-pager__btn" aria-label={`Предыдущий ${props.unit}`}>
      <CuboIcon icon="chevron-left" size={16} />
    </button>
    <span class="med-pager__label t-tnum">{props.label}</span>
    <button type="button" class="med-pager__btn" aria-label={`Следующий ${props.unit}`}>
      <CuboIcon icon="chevron-right" size={16} />
    </button>
  </div>
)

/** Медицинский дашборд — вариант ядра КП по референсу boardui.com, на токенах стиля КП. */
export default defineComponent({
  name: 'MedicalBoard',
  props: {
    /** Primary клиента; не задан — наследуется текущий --client-primary. */
    primary: { type: String as PropType<string | undefined>, default: undefined },
    app: { type: String, default: 'Клиника «Вита»' },
    staffName: { type: String, default: 'Мертджан Эсмергюль' },
    staffRole: { type: String, default: 'Врач' },
  },
  setup(props) {
    watch(() => props.primary, hex => {
      if (hex) document.documentElement.style.setProperty('--client-primary', hex)
    }, { immediate: true })

    const query = ref(''), status = ref('all'), picked = ref<Set<string>>(new Set())
    const toggleRow = (id: string) => {
      const next = new Set(picked.value)
      if (next.has(id)) next.delete(id); else next.add(id)
      picked.value = next
    }
    const statuses = [...new Set(MED_TABLE.rows.map(r => r.status))]
    const rows = computed(() => {
      const q = query.value.trim().toLocaleLowerCase('ru')
      return MED_TABLE.rows.filter(r =>
        (status.value === 'all' || r.status === status.value) &&
        (!q || r.name.toLocaleLowerCase('ru').includes(q)))
    })

    const sleepArc = (() => {
      const r = 60, c = 2 * Math.PI * r
      return { r, dash: `${c * MED_SLEEP.score / 100} ${c * (1 - MED_SLEEP.score / 100)}` }
    })()

    return () => (
      <div class="medboard cubo-client-theme" data-cubo-gtc-bridge="" data-gtc-theme="light" data-testid="medical-board">
        <ScreenSidebar app={props.app} nav={MED_NAV} initials={MED_PATIENT.initials} staffName={props.staffName} staffRole={props.staffRole} />
        <div class="medboard__body">
          <header class="medboard__heading">
            <h3>Медицинский профиль</h3>
            <div class="medboard__heading-actions">
              <CuboButtonV2 tone="neutral" appearance="outline" size="sm" leadIcon="adjustments-horizontal">Фильтры</CuboButtonV2>
              <CuboButtonV2 tone="primary" size="sm" leadIcon="file-plus">Создать отчёт</CuboButtonV2>
            </div>
          </header>

          <div class="medboard__grid">
            {/* Пациент */}
            <article class="pdash-card med-patient">
              <div class="pdash-card__head">
                <div class="pdash-card__titles"><p class="pdash-card__sub">Пациент</p></div>
                <CuboButtonV2 tone="neutral" appearance="ghost" size="sm" iconOnly leadIcon="dots-vertical" ariaLabel="Действия пациента" />
              </div>
              <div class="med-patient__hero">
                <span class="med-patient__ava" aria-hidden="true">
                  {MED_PATIENT.initials}
                  <i class="med-patient__add"><CuboIcon icon="file-plus" size={10} /></i>
                </span>
                <h4 class="med-patient__name">{MED_PATIENT.name}</h4>
              </div>
              <ul class="med-patient__fields">
                {MED_PATIENT.fields.map(f => (
                  <li key={f.id} class="med-field">
                    <span class="med-field__icon"><CuboIcon icon={f.icon} size={16} /></span>
                    <span class="med-field__label">{f.label}</span>
                    <span class="med-field__value">{f.value}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Шаги */}
            <article class="pdash-card med-steps">
              <div class="pdash-card__head">
                <div class="pdash-card__titles">
                  <p class="pdash-card__sub">Шаги</p>
                  <p class="med-stat">
                    <span class="med-stat__num">{MED_STEPS.total}</span>
                    <span class="med-stat__unit">всего шагов</span>
                  </p>
                </div>
                <Pager label={MED_STEPS.period} unit="неделя" />
              </div>
              <div class="med-steps__chart" role="img" aria-label={`Шаги по дням, всего ${MED_STEPS.total}`}>
                {MED_STEPS.days.map(d => (
                  <div key={d.day} class="med-steps__col">
                    <div class="med-steps__track"><div class="med-steps__bar" style={{ height: `${d.value}%` }} /></div>
                    <span class="med-steps__day">{d.day}</span>
                  </div>
                ))}
              </div>
            </article>

            {/* Сон */}
            <article class="pdash-card med-sleep">
              <div class="pdash-card__head">
                <div class="pdash-card__titles">
                  <p class="pdash-card__sub">Оценка сна</p>
                  <h4 class="pdash-card__title">{MED_SLEEP.title}</h4>
                </div>
                <Pager label={MED_SLEEP.period} unit="неделя" />
              </div>
              <div class="med-sleep__ring" role="img" aria-label={`Оценка сна ${MED_SLEEP.score} из 100`}>
                <svg viewBox="0 0 150 150">
                  <defs>
                    <linearGradient id="med-sleep-grad" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0" style="stop-color: var(--gtc-theme-accent-info-surface)" />
                      <stop offset="0.55" style="stop-color: var(--gtc-theme-accent-feature-surface)" />
                      <stop offset="1" style="stop-color: var(--gtc-theme-accent-primary-surface)" />
                    </linearGradient>
                  </defs>
                  <circle cx="75" cy="75" r={sleepArc.r} class="med-sleep__track" stroke={TRACK} />
                  <circle
                    cx="75" cy="75" r={sleepArc.r}
                    class="med-sleep__arc"
                    stroke="url(#med-sleep-grad)"
                    stroke-dasharray={sleepArc.dash}
                    transform="rotate(-90 75 75)"
                  />
                </svg>
                <span class="med-sleep__score t-tnum">{MED_SLEEP.score}</span>
              </div>
              <ul class="med-sleep__legend">
                {MED_SLEEP.legend.map(l => (
                  <li key={l.id} class="med-legend">
                    <span class="med-legend__dot" style={{ background: TONE[l.tone] }} />
                    <span class="med-legend__label">{l.label}: {l.hint}</span>
                    <span class="med-legend__score t-tnum">{l.score}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Календарь активных дней */}
            <article class="pdash-card med-cal">
              <div class="pdash-card__head">
                <div class="pdash-card__titles">
                  <p class="pdash-card__sub">Самые активные дни</p>
                  <p class="med-stat">
                    <span class="med-stat__num">{MED_CAL.total}</span>
                    <span class="med-stat__unit">всего шагов</span>
                  </p>
                </div>
                <Pager label={MED_CAL.month} unit="месяц" />
              </div>
              <div class="med-cal__grid" role="grid" aria-label={`Активные дни, ${MED_CAL.month}`}>
                {MED_CAL.days.map((d, i) => (
                  <button
                    key={i}
                    type="button"
                    class="med-cal__day"
                    data-outside={d.outside || undefined}
                    data-selected={d.day === MED_CAL.selected && !d.outside || undefined}
                    aria-label={`${d.day} ${MED_CAL.month === 'Июль' ? 'июля' : MED_CAL.month}`}
                  >
                    <span class="med-cal__dnum t-tnum">{d.day}</span>
                    <MedRing size={26} stroke={2.2} gap={1.4} track={TRACK} segments={[
                      { pct: d.a, color: TONE.primary },
                      { pct: d.b, color: TONE.feature },
                      { pct: d.c, color: TONE.info },
                    ]} />
                  </button>
                ))}
              </div>
            </article>

            {/* Кольца активности */}
            <article class="pdash-card med-act">
              <div class="pdash-card__head">
                <div class="pdash-card__titles">
                  <p class="pdash-card__sub">Активность за <b class="med-act__date">{MED_ACTIVITY.date}</b></p>
                </div>
              </div>
              <ul class="med-act__legend">
                {MED_ACTIVITY.rings.map(r => (
                  <li key={r.id} class="med-legend">
                    <span class="med-legend__dot" style={{ background: TONE[r.tone] }} />
                    <span class="med-legend__label">{r.label}</span>
                    <span class="med-legend__score">{r.value}</span>
                  </li>
                ))}
              </ul>
              <div class="med-act__rings" role="img" aria-label="Кольца активности">
                <MedRing size={190} stroke={12} gap={4} track={TRACK} segments={MED_ACTIVITY.rings.map(r => ({ pct: r.pct, color: TONE[r.tone] }))} />
              </div>
            </article>

            {/* Уведомления */}
            <article class="pdash-card med-alerts">
              <div class="pdash-card__head">
                <div class="pdash-card__titles">
                  <p class="pdash-card__sub">Важные уведомления</p>
                  <p class="med-stat">
                    <span class="med-stat__num">{MED_ALERTS.count}</span>
                    <span class="med-stat__unit">за неделю</span>
                  </p>
                </div>
                <Pager label={MED_ALERTS.period} unit="неделя" />
              </div>
              <div class="med-alerts__list">
                {MED_ALERTS.items.map(a => (
                  <div key={a.id} class="med-alert">
                    <span class={`med-alert__icon med-alert__icon--${a.tone}`}><CuboIcon icon={a.icon} size={18} /></span>
                    <div class="med-alert__body">
                      <div class="med-alert__top">
                        <b>{a.title}</b>
                        <span class="med-alert__date">{a.date}</span>
                      </div>
                      <p>{a.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>

          {/* Таблица пациентов */}
          <article class="pdash-card med-table">
            <div class="pdash-card__head med-table__head">
              <div class="pdash-card__titles">
                <p class="pdash-card__sub">Всего результатов</p>
                <p class="med-stat">
                  <span class="med-stat__num">{MED_TABLE.total}</span>
                  <span class="med-stat__unit">пациентов</span>
                </p>
              </div>
              <div class="med-table__filters">
                <CuboSelect
                  native value={status.value}
                  variants={[{ value: 'all', label: 'Все статусы' }, ...statuses.map(s => ({ value: s, label: s }))]}
                  onChange={(v: unknown) => { status.value = String(v) }}
                  aria-label="Фильтр по статусу"
                />
                <CuboText value={query.value} placeholder="Поиск" aria-label="Поиск пациента" onChange={(v: string) => { query.value = v }} />
              </div>
            </div>
            <div class="med-table__scroll">
              <div class="med-table__grid" role="table" aria-label="Пациенты">
                <div class="med-table__thead" role="row">
                  <span role="columnheader" />
                  <span role="columnheader">Пациент</span>
                  <span role="columnheader">Приём</span>
                  <span role="columnheader">Статус</span>
                  <span role="columnheader">Диагноз</span>
                  <span role="columnheader">Следующий приём</span>
                  <span role="columnheader" class="med-table__actions-h">Действия</span>
                </div>
                {rows.value.map(r => (
                  <div key={r.id} class="med-table__row" role="row">
                    <span class="med-table__check"><CuboCheckbox value={picked.value.has(r.id)} aria-label={`Выбрать ${r.name}`} onChange={() => toggleRow(r.id)} /></span>
                    <span class="med-table__patient">
                      <span class="med-table__ava">{r.initials}</span>
                      <b>{r.name}</b>
                    </span>
                    <span class="med-table__adm">
                      <CuboIcon icon={r.admission === 'Стационар' ? 'emergency-bed' : 'user-heart'} size={15} />
                      {r.admission}
                    </span>
                    <span><i class={`med-status med-status--${r.statusTone}`}>{r.status}</i></span>
                    <span class="med-table__conds">
                      {r.conditions.map(c => <CuboTag key={c} size="small">{c}</CuboTag>)}
                    </span>
                    <span class="med-table__next t-tnum">{r.next}</span>
                    <span class="med-table__actions">
                      <button type="button" class="med-table__act" aria-label={`Открыть ${r.name}`}><CuboIcon icon="file-search" size={15} /></button>
                      <button type="button" class="med-table__act" aria-label={`Редактировать ${r.name}`}><CuboIcon icon="file-pencil" size={15} /></button>
                      <button type="button" class="med-table__act" aria-label={`Ещё для ${r.name}`}><CuboIcon icon="dots-vertical" size={15} /></button>
                    </span>
                  </div>
                ))}
                {!rows.value.length && <p class="med-table__empty">По выбранным фильтрам пациентов нет.</p>}
              </div>
            </div>
          </article>
        </div>
      </div>
    )
  },
})
