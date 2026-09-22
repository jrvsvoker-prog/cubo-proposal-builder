import { computed, defineComponent, ref, watchEffect } from 'vue'
import type { DashboardInput } from '../data/dashboard-input'
import type { Scale } from '../data/dashboard-model'
import { metricDefinitions } from '../data/dashboard-model'
import DashBoardV3 from '../components/dash-board-v3'
import MedicalBoard from '../components/medical-board'

type Archetype = 'school' | 'retail' | 'service'
type Screen = 'dashboard' | 'medical'

const screenOptions: { id: Screen; label: string }[] = [
  { id: 'dashboard', label: 'Показатели' },
  { id: 'medical', label: 'Медицина' },
]

interface Preset {
  business: Archetype
  displayName: string
  appName: string
  unitSingular: string
  unitPlural: string
  /** Полное имя и роль сотрудника для карточки в сайдбаре; без имени — голый аватар. */
  staffName?: string
  staffRole?: string
  scales: Scale[]
  /** Demo primary per archetype; invented colors, not real brands. */
  primary: string
  unitNames: (n: number) => string[]
}

const presets: Record<Archetype, Preset> = {
  school: {
    business: 'school',
    displayName: 'Школа «Среда»',
    appName: 'Среда',
    unitSingular: 'Филиал',
    unitPlural: 'Филиалы',
    staffName: 'Анна Смирнова',
    staffRole: 'Куратор',
    primary: '#15803d',
    scales: ['month', 'academic'],
    unitNames: (n) => {
      const base = ['Арбат', 'Сокол', 'Строгино']
      return Array.from({ length: n }, (_, i) => base[i] ?? `Филиал ${i + 1}`)
    },
  },
  retail: {
    business: 'retail',
    displayName: 'Розница «Контур»',
    appName: 'Контур',
    unitSingular: 'Магазин',
    unitPlural: 'Магазины',
    staffName: 'Анна Соколова',
    staffRole: 'Управляющий',
    primary: '#c2410c',
    scales: ['day', 'week', 'month', 'year'],
    unitNames: (n) => Array.from({ length: n }, (_, i) => i === 0 ? 'Центральный' : `Магазин ${i + 1}`),
  },
  service: {
    business: 'service',
    displayName: 'Сервис «Практика»',
    appName: 'Практика',
    unitSingular: 'Точка',
    unitPlural: 'Точки',
    staffName: 'Алексей Крылов',
    staffRole: 'Инженер',
    primary: '#4f46e5',
    scales: ['week', 'month', 'year'],
    unitNames: (n) => {
      const base = ['Юг', 'Север', 'Центр']
      return Array.from({ length: n }, (_, i) => base[i] ?? `Точка ${i + 1}`)
    },
  },
}

const archetypeOptions: Archetype[] = ['school', 'retail', 'service']
const unitOptions = [0, 1, 3, 20]
const widthOptions = [1440, 1024, 390]

const STORAGE_KEY = 'ub-proposal-stand'

function loadState(): { archetype: Archetype; units: number; width: number; screen: Screen } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const s = JSON.parse(raw)
      if (archetypeOptions.includes(s.archetype) && unitOptions.includes(s.units) && widthOptions.includes(s.width)) {
        return { ...s, screen: s.screen === 'medical' ? 'medical' : 'dashboard' }
      }
    }
  } catch { /* ignore */ }
  return { archetype: 'school', units: 3, width: 1440, screen: 'dashboard' }
}

export default defineComponent({
  name: 'ProposalStand',
  setup() {
    const saved = loadState()
    const urlParams = new URLSearchParams(location.search)
    const urlArchetype = urlParams.get('archetype')
    const archetype = ref<Archetype>(archetypeOptions.includes(urlArchetype as Archetype) ? urlArchetype as Archetype : saved.archetype)
    const unitCount = ref(saved.units)
    const containerWidth = ref(saved.width)
    const urlScreen = urlParams.get('screen')
    const screen = ref<Screen>(urlScreen === 'medical' ? 'medical' : saved.screen)

    watchEffect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ archetype: archetype.value, units: unitCount.value, width: containerWidth.value, screen: screen.value }))
    })

    const input = computed<DashboardInput>(() => {
      const p = presets[archetype.value]
      const units = p.unitNames(unitCount.value)
      const metrics = metricDefinitions(p.business)
      return {
        business: p.business,
        displayName: p.displayName,
        appName: p.appName,
        navigation: ['Показатели', 'Данные', 'Карточка', 'Аналитика'],
        staffInitials: p.staffName
          ? p.staffName.split(' ').map(w => w[0]).join('')
          : 'АС',
        staffName: p.staffName,
        staffRole: p.staffRole,
        units,
        unitSingular: p.unitSingular,
        unitPlural: p.unitPlural,
        scales: p.scales,
        defaultMetrics: metrics.slice(0, 4).map(m => m.id),
        assumptions: 'Демонстрационные данные для стенда.',
        primary: p.primary,
        seed: p.displayName,
      }
    })

    return () => (
      <div class="stand" data-cubo-gtc-bridge="" data-gtc-theme="light">
        <div class="stand__viewport" style={{ maxWidth: `${containerWidth.value}px` }}>
          {screen.value === 'medical'
            ? <MedicalBoard primary={presets[archetype.value].primary} />
            : <DashBoardV3 input={input.value} />}
        </div>
        <div class="stand__pill">
          <fieldset>
            <legend>Экран</legend>
            {screenOptions.map(s => (
              <label key={s.id} class={screen.value === s.id ? 'is-active' : ''}>
                <input type="radio" name="screen" value={s.id} checked={screen.value === s.id} onChange={() => { screen.value = s.id }} />
                {s.label}
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Архетип</legend>
            {archetypeOptions.map(a => (
              <label key={a} class={archetype.value === a ? 'is-active' : ''}>
                <input type="radio" name="archetype" value={a} checked={archetype.value === a} onChange={() => { archetype.value = a }} />
                {a}
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Подразделения</legend>
            {unitOptions.map(n => (
              <label key={n} class={unitCount.value === n ? 'is-active' : ''}>
                <input type="radio" name="units" value={String(n)} checked={unitCount.value === n} onChange={() => { unitCount.value = n }} />
                {n}
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Ширина</legend>
            {widthOptions.map(w => (
              <label key={w} class={containerWidth.value === w ? 'is-active' : ''}>
                <input type="radio" name="width" value={String(w)} checked={containerWidth.value === w} onChange={() => { containerWidth.value = w }} />
                {w}
              </label>
            ))}
          </fieldset>
        </div>
      </div>
    )
  },
})
