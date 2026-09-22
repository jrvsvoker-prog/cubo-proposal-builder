// Слово «по …» для заголовка разбивки: именительный множественного → предложный.
// Покрывает слова профилей (филиалы, магазины, точки); незнакомое — как есть.
export const byUnitsWord = (unitPlural: string) => {
  const w = unitPlural.toLowerCase()
  if (w.endsWith('ы') || w.endsWith('и')) return `${w.slice(0, -1)}ам`
  return w
}
