import { profile } from '../../data/company'
import { dashboardInputFromProfile, dashboardModelConfig } from '../../data/dashboard-input'
import { aggregate, createDashboardModel, deltaMetric, formatMetric } from '../../data/dashboard-model'

export interface HeroStat {
  label: string
  value: string
  /** Подписанная дельта («+9,4 %») или пусто, если базы нет. */
  delta: string
  /** true — дельта «в плюс» с учётом метрик «меньше — лучше». */
  good: boolean | null
}

/**
 * Три опорных показателя обложки — честные числа из той же модели,
 * что кормит дашборд (первый период дефолтного масштаба, база — год назад).
 */
export const heroStats = (): { stats: HeroStat[]; period: string; series: { label: string; value: number }[] } => {
  const input = dashboardInputFromProfile(profile)
  const model = createDashboardModel(dashboardModelConfig(input))
  const scale = input.scales.includes('month') ? 'month' : input.scales[0]
  const choice = model.choices(scale)[0]
  const baseSpec = choice.bases.year?.spec ?? choice.bases.previous?.spec
  const stats = input.defaultMetrics.slice(0, 3).map((id) => {
    const m = model.metrics.find((x) => x.id === id)!
    const cur = aggregate(m, model.ids.map((i) => model.raw(i, choice.current)))
    const base = baseSpec ? aggregate(m, model.ids.map((i) => model.raw(i, baseSpec))) : null
    const hasDelta = cur !== null && base !== null
    const delta = hasDelta ? deltaMetric(cur, base, m) : ''
    const sign = delta.startsWith('+') ? 1 : delta.startsWith('−') || delta.startsWith('-') ? -1 : 0
    const good = !hasDelta || sign === 0 ? null : m.debt ? sign < 0 : sign > 0
    return { label: m.name, value: formatMetric(cur, m), delta, good }
  })
  const [year, month] = choice.current.end.slice(0, 7).split('-').map(Number)
  const series = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(Date.UTC(year, month - 12 + i, 1))
    const key = date.toISOString().slice(0, 7)
    return {
      label: date.toLocaleDateString('ru-RU', { month: 'short', year: 'numeric', timeZone: 'UTC' }),
      value: model.ids.reduce((sum, id) => sum + model.monthlyRaw(id, key).cash, 0),
    }
  })
  return { stats, period: choice.current.label, series }
}
