/** Форматирование денег для оболочки КП (коммерческий блок). */

export const money = (value: number) => `${new Intl.NumberFormat('ru-RU').format(value)} ₽`

/** Диапазон «175 000–280 000 ₽» или «от 5 600 000 ₽». */
export const priceLabel = (from: number, to?: number) => (
  to == null ? `от ${money(from)}` : `${money(from)}–${money(to)}`.replace(' ₽–', '–')
)

const shortNum = (value: number) => value >= 1_000_000
  ? new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 }).format(value / 1_000_000)
  : new Intl.NumberFormat('ru-RU').format(Math.round(value / 1000))

const shortUnit = (value: number) => value >= 1_000_000 ? 'млн' : 'тыс.'

/** Короткая форма «175–280 тыс. ₽» / «от 5,6 млн ₽». */
export const shortPrice = (from: number, to?: number) => {
  if (to == null) return `от ${shortNum(from)} ${shortUnit(from)} ₽`
  if (shortUnit(from) === shortUnit(to)) return `${shortNum(from)}–${shortNum(to)} ${shortUnit(to)} ₽`
  return `${shortNum(from)} ${shortUnit(from)}–${shortNum(to)} ${shortUnit(to)} ₽`
}

export const estimateIcons: Record<string, string> = {
  dashboard: 'layout-dashboard',
  analytics: 'chart-histogram',
  portal: 'id',
  selection: 'heart',
  erp: 'building-factory-2',
}
