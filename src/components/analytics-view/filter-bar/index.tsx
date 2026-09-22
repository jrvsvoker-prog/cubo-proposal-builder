import { defineComponent, type PropType } from 'vue'
import { CuboIcon, CuboSelect, CuboTabs } from '@cuboapp/ui-vue'
import { anaBranches, anaCompares, anaPeriods, anaSources, type AnaPeriodId, type AnaCompareId } from '../../../data/analytics'
import { profile } from '../../../data/profile'

export interface FilterState {
  period: AnaPeriodId
  compare: AnaCompareId
  branches: string[]
  sources: string[]
}

export const defaultFilters = (): FilterState => ({
  period: 'year',
  compare: 'lastYear',
  branches: [...anaBranches],
  sources: [...anaSources],
})

// Тулбар в духе дашборда: подпись капсом над полем, селекты — новый
// rich-режим CuboSelect (не native), мультивыбор для филиалов и источников.
export default defineComponent({
  name: 'AnalyticsFilterBar',
  props: {
    modelValue: { type: Object as PropType<FilterState>, required: true },
    dirty: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const set = (patch: Partial<FilterState>) => emit('update:modelValue', { ...props.modelValue, ...patch })

    return () => (
      <div class="ana2-toolbar">
        <div class="ana2-tool">
          <span class="ana2-tool__label">Период</span>
          <CuboTabs
            tabs={anaPeriods.map((p) => ({ id: p.id, label: p.label }))}
            active={props.modelValue.period}
            format="segmented"
            onChange={(v: unknown) => set({ period: v as AnaPeriodId })}
          />
        </div>
        <div class="ana2-tool">
          <span class="ana2-tool__label">Сравнение</span>
          <CuboSelect
            class="cubo-select--lead-cal"
            value={props.modelValue.compare}
            variants={anaCompares.map((c) => ({ value: c.id, label: c.label }))}
            onChange={(v: unknown) => set({ compare: v as AnaCompareId })}
          />
        </div>
        <div class="ana2-tool">
          <span class="ana2-tool__label">{profile.unitPlural}</span>
          <CuboSelect
            multiple
            selectAll
            maxTagCount={1}
            value={props.modelValue.branches}
            variants={anaBranches.map((b) => ({ value: b, label: b }))}
            onChange={(v: unknown) => set({ branches: (v as string[]) ?? [] })}
          />
        </div>
        <div class="ana2-tool">
          <span class="ana2-tool__label">Источники</span>
          <CuboSelect
            multiple
            selectAll
            maxTagCount={1}
            value={props.modelValue.sources}
            variants={anaSources.map((s) => ({ value: s, label: s }))}
            onChange={(v: unknown) => set({ sources: (v as string[]) ?? [] })}
          />
        </div>
        {props.dirty && (
          <button
            type="button"
            class="ana2-tool__reset"
            title="Сбросить фильтры"
            aria-label="Сбросить фильтры"
            onClick={() => emit('update:modelValue', defaultFilters())}
          >
            <CuboIcon icon="refresh" size={16} />
          </button>
        )}
      </div>
    )
  },
})
