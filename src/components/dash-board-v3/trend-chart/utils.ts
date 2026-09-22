// Помесячная ось графика: ключи 'YYYY-MM', сдвиги, подписи, форматирование денег.

const monthShort = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
const monthFull = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

export const monthKey = (year: number, month: number) => `${year}-${String(month).padStart(2, '0')}`

export const parseKey = (key: string) => {
  const [year, month] = key.split('-').map(Number)
  return { year, month }
}

export const shiftKey = (key: string, delta: number) => {
  const { year, month } = parseKey(key)
  const d = new Date(Date.UTC(year, month - 1 + delta, 1))
  return monthKey(d.getUTCFullYear(), d.getUTCMonth() + 1)
}

export const shortLabel = (key: string) => monthShort[parseKey(key).month - 1]

/** «сен 25» — компактная подпись месяца с двумя цифрами года. */
export const miniLabel = (key: string) => `${shortLabel(key)} ${key.slice(2, 4)}`

export const fullLabel = (key: string) => {
  const { year, month } = parseKey(key)
  return `${monthFull[month - 1]} ${year}`
}

const ru = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 })

/** «12,4 млн ₽» — для тултипа и заголовков. */
export const fmtMoney = (v: number) => (v >= 1e6 ? `${ru.format(v / 1e6)} млн ₽` : v >= 1e4 ? `${ru.format(v / 1e3)} тыс. ₽` : `${new Intl.NumberFormat('ru-RU').format(Math.round(v))} ₽`)

/** «12 млн» — для подписей оси. */
export const fmtAxis = (v: number) => (v >= 1e6 ? `${ru.format(v / 1e6)} млн` : v >= 1e3 ? `${ru.format(v / 1e3)} тыс.` : `${Math.round(v)}`)

/** Верхняя граница оси из «хороших» чисел, чтобы сетка читалась ровно. */
export const niceMax = (v: number) => {
  if (v <= 0) return 1
  const exp = Math.pow(10, Math.floor(Math.log10(v)))
  const f = v / exp
  const step = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10
  return step * exp
}
