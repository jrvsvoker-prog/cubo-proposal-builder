import { profile } from '../../data/profile'
import { computed, defineComponent, ref } from 'vue'
import { CuboTabs } from '@cuboapp/ui-vue'
import { anaRange, type AnaFilters } from '../../data/analytics'
import { applyClientPrimary } from '../../utils/primary-ink'
import ScreenSidebar from '../screen-sidebar'
import FilterBar, { defaultFilters, type FilterState } from './filter-bar'
import DynamicsTab from './dynamics-tab'
import StructureTab from './structure-tab'
import MoneyTab from './money-tab'
import DetailModal, { type DetailPayload } from './detail-modal'

// Раздел 02 · Аналитика — «как менялось и из чего складывается» (не «сколько
// сейчас» — это дашборд). Табы сформулированы джобами руководителя:
// Динамика — как менялись метрики и кто дал изменение; Структура — из чего
// складывается результат и как сместился состав; Деньги — дошли ли деньги
// и где висит долг. Общие фильтры сверху действуют на все табы.

type SectionId = 'dynamics' | 'structure' | 'money'

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: 'dynamics', label: 'Динамика' },
  { id: 'structure', label: 'Структура' },
  { id: 'money', label: 'Деньги' },
]

const SECTION_CAPTIONS: Record<SectionId, string> = {
  dynamics: 'Как менялись показатели и кто дал изменение',
  structure: 'Из чего складывается результат и как сместился состав',
  money: 'Начисления, оплаты и задолженность периода',
}

export default defineComponent({
  name: 'AnalyticsView',
  setup() {
    // Тот же механизм, что в dash-board-v3: акценты читают --client-primary, текст — --client-primary-ink.
    applyClientPrimary(profile.theme.primary)
    const section = ref<SectionId>('dynamics')
    const filters = ref<FilterState>(defaultFilters())
    const detail = ref<DetailPayload | null>(null)

    const defaults = defaultFilters()
    const dirty = computed(
      () =>
        filters.value.period !== defaults.period ||
        filters.value.compare !== defaults.compare ||
        filters.value.branches.length !== defaults.branches.length ||
        filters.value.sources.length !== defaults.sources.length,
    )

    const range = computed(() => anaRange(filters.value.period, filters.value.compare))
    const empty = computed(() => filters.value.branches.length === 0 || filters.value.sources.length === 0)

    const tabProps = computed(() => ({
      range: range.value,
      filters: filters.value,
      empty: empty.value,
      onDetail: (p: DetailPayload) => (detail.value = p),
    }))

    return () => (
      <div class="ana2 cubo-client-theme" data-cubo-gtc-bridge="" data-gtc-theme="light">
        <ScreenSidebar app={profile.name} nav={['Аналитика', ...profile.navigation]} initials={profile.staffInitials} staffName={profile.staffName} staffRole={profile.staffRole} logo={profile.logo} />
        <div class="ana2__inner">
          <header class="ana2__page">
            <h3>Аналитика</h3>
            <span>{SECTION_CAPTIONS[section.value]}</span>
          </header>

          <FilterBar
            modelValue={filters.value}
            dirty={dirty.value}
            {...{ 'onUpdate:modelValue': (v: FilterState) => (filters.value = v) }}
          />

          <CuboTabs
            tabs={SECTIONS.map((s) => ({ id: s.id, label: s.label }))}
            active={section.value}
            format="pill"
            tone="neutral"
            onChange={(v: unknown) => (section.value = v as SectionId)}
          />

          {section.value === 'dynamics' && <DynamicsTab key="dynamics" {...tabProps.value} />}
          {section.value === 'structure' && <StructureTab key="structure" {...tabProps.value} />}
          {section.value === 'money' && <MoneyTab key="money" {...tabProps.value} />}
        </div>

        <DetailModal payload={detail.value} onClose={() => (detail.value = null)} />
      </div>
    )
  },
})
