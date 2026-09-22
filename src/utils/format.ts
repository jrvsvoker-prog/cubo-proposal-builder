// Форматирование демо-чисел (табличные цифры задаёт CSS).

export const money = (n: number): string => `${Math.round(n).toLocaleString('ru-RU')} ₽`

export const int = (n: number): string => Math.round(n).toLocaleString('ru-RU')

export const decimal = (n: number): string =>
  n.toLocaleString('ru-RU', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

export const compactMoney = (n: number): string => {
  if (n >= 1_000_000) return `${decimal(n / 1_000_000)} млн ₽`
  if (n >= 1_000) return `${int(Math.round(n / 1000))} тыс. ₽`
  return money(n)
}

/** Процент изменения текущего к базовому, округлённый до целого. */
export const deltaPct = (current: number, base: number): number => {
  if (!base) return 0
  return Math.round(((current - base) / base) * 100)
}

/** «+5%» / «−2%» / «0%» — с типографским минусом. */
export const deltaLabel = (pct: number): string => {
  if (pct === 0) return '0%'
  const sign = pct > 0 ? '+' : '−'
  return `${sign}${Math.abs(pct)}%`
}
