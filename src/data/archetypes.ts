/**
 * Архетипы бизнесов — объектные данные, которые читают генератор чисел,
 * валидатор и аналитика. Новый архетип = одна запись в archetypes.json.
 */
import archetypes from './archetypes.json'

// ---------------------------------------------------------------------------
// Типы
// ---------------------------------------------------------------------------

export interface Metric {
  id: string
  name: string
  type: 'money' | 'count' | 'percent' | 'decimal'
  n: string
  d?: string
  formula: string
  snapshot?: boolean
  debt?: boolean
}

export interface AnalyticsPeriod {
  yearMonths: number
  startMonth: number
}

export interface PaymentsConfig {
  prepayShare: number
  debtDeducted: boolean
}

export interface Archetype {
  id: string
  label: string
  fullProposal: boolean
  metrics: Metric[]
  defaultMetrics: string[]
  scales: string[]
  stages: string[]
  seasonality: Record<string, number>
  analyticsPeriod: AnalyticsPeriod | null
  payments: PaymentsConfig
}

// ---------------------------------------------------------------------------
// Данные и доступ
// ---------------------------------------------------------------------------

export type Business = keyof typeof archetypes

const archetypeMap = archetypes as Record<Business, Archetype>

export function getArchetype(id: string): Archetype {
  if (!isBusiness(id)) throw new Error(`Unknown business: ${id}`)
  return archetypeMap[id]
}

export function isBusiness(x: string): x is Business {
  return x in archetypes
}

export const allBusinesses: Business[] = Object.keys(archetypes) as Business[]
