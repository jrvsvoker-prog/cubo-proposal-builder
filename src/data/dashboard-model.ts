/** Closed demo periods and raw counters, ported from the reviewed UX v2.
 * No wall-clock-dependent analytics, arbitrary calendar or server state.
 */
import { getArchetype, isBusiness, type Metric, type Business } from './archetypes'

export type { Metric, Business }
export type Scale = 'day' | 'week' | 'month' | 'year' | 'academic'
export type Raw = Record<string, number>
export interface PeriodSpec {
  label: string; start: string; end: string; keys?: string[]
  sample?: { orders: number; price: number; rate: number; load: number; day?: boolean }
}
export interface PeriodChoice {
  id: string; current: PeriodSpec; bases: Record<string, { label: string; spec: PeriodSpec }>; note: string
}
export interface DashboardConfig {
  business: string
  units: string[]
  seed?: string
  demoDate?: string
  monthlyDeals?: number
  priceRange?: number[]
  [k: string]: unknown
}
const monthNames = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
const weekdayCap = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
export const monthKeys = (year: number, start: number, end: number) => Array.from({length:end-start+1},(_,i)=>`${year}-${String(i+start).padStart(2,'0')}`)
const pad2 = (n: number) => String(n).padStart(2, '0')
const isoDay = (date: Date) => date.toISOString().slice(0, 10)
const fmtDot = (date: Date) => `${pad2(date.getUTCDate())}.${pad2(date.getUTCMonth() + 1)}.${date.getUTCFullYear()}`
const addUtcDays = (date: Date, days: number) => {
  const next = new Date(date)
  next.setUTCDate(date.getUTCDate() + days)
  return next
}
export function lastCompletedMonth(demoDate: string): { y: number; m: number } {
  const [y, m] = demoDate.split('-').map(Number)
  return m === 1 ? { y: y - 1, m: 12 } : { y, m: m - 1 }
}
export function lastCompletedCalendarYear(demoDate: string): number {
  return Number(demoDate.slice(0, 4)) - 1
}
/** Учебный год сентябрь–июнь: последняя завершённая сессия относительно demoDate. */
export function lastCompletedAcademicStart(demoDate: string): number {
  const [y, m] = demoDate.split('-').map(Number)
  return m >= 7 ? y - 1 : y - 2
}
function shiftMonth(y: number, m: number, delta: number): { y: number; m: number } {
  const t = y * 12 + (m - 1) + delta
  return { y: Math.floor(t / 12), m: ((t % 12) + 12) % 12 + 1 }
}
function lastDateOfMonth(y: number, m: number): Date {
  return new Date(Date.UTC(y, m, 0))
}
/** Последняя полная неделя пн–вс, которая заканчивается в этом месяце. */
function lastCompleteWeek(y: number, m: number): { start: Date; end: Date } {
  const last = lastDateOfMonth(y, m)
  const dow = last.getUTCDay()
  const end = addUtcDays(last, dow === 0 ? 0 : -dow)
  return { start: addUtcDays(end, -6), end }
}
function isoWeekId(monday: Date): string {
  const thursday = addUtcDays(monday, 3)
  const year = thursday.getUTCFullYear()
  const jan4 = new Date(Date.UTC(year, 0, 4))
  const jan4Dow = jan4.getUTCDay() || 7
  const week1Monday = addUtcDays(jan4, 1 - jan4Dow)
  const week = 1 + Math.round((monday.getTime() - week1Monday.getTime()) / 604800000)
  return `${year}-w${String(week).padStart(2, '0')}`
}
function pickScale(config: DashboardConfig): { monthlyDeals?: number; priceRange?: [number, number]; demoDate?: string } {
  const nested = config.dashboard && typeof config.dashboard === 'object' ? config.dashboard as Record<string, unknown> : undefined
  const positive = (value: unknown) => typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : undefined
  const monthlyDeals = positive(config.monthlyDeals) ?? positive(nested?.monthlyDeals)
  const raw = Array.isArray(config.priceRange) ? config.priceRange : Array.isArray(nested?.priceRange) ? nested.priceRange : undefined
  const priceRange = raw && raw.length === 2 && raw.every(value => typeof value === 'number' && Number.isFinite(value) && value >= 0)
    ? [raw[0], raw[1]] as [number, number]
    : undefined
  const demoDate = typeof config.demoDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(config.demoDate) ? config.demoDate : undefined
  return { monthlyDeals, priceRange, demoDate }
}
export function span(label: string, keys: string[]): PeriodSpec {
  if (!keys.length) throw new Error('A period must contain at least one month')
  const [y,m] = keys[keys.length-1].split('-').map(Number)
  return {label,keys,start:`${keys[0]}-01`,end:`${keys[keys.length-1]}-${new Date(Date.UTC(y,m,0)).getUTCDate()}`}
}
export function dateLabel(iso: string): string { return iso.split('-').reverse().join('.') }
export const scaleLabels: Record<Scale,string> = {day:'День',week:'Неделя',month:'Месяц',year:'Год',academic:'Учебный год'}

export function metricDefinitions(business: Business): Metric[] {
  return getArchetype(business).metrics
}

function hashSeed(str: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) }
  return h >>> 0
}
const unit01 = (seed: string, tag: string) => (hashSeed(seed + ':' + tag) % 10000) / 10000
/** Per-unit character: volume multiplier and yearly trend. Deterministic from seed. */
function unitParams(seed: string, i: number): { volume: number; trend: number } {
  return { volume: 0.6 + unit01(seed, 'v' + i) * 0.9, trend: -0.10 + unit01(seed, 't' + i) * 0.28 }
}
/** Soft seasonality; strong dips would drown per-unit differences in month-to-month deltas. */
function seasonFactor(business: Business, month: number): number {
  const table = getArchetype(business).seasonality
  return (table[String(month)] as number | undefined) ?? 1
}
function distribute(total: number, weights: number[]): number[] {
  const sum = weights.reduce((a, b) => a + b, 0)
  if (total <= 0 || !sum) return weights.map(() => 0)
  const raw = weights.map(weight => total * weight / sum)
  const floors = raw.map(Math.floor)
  let rest = total - floors.reduce((a, b) => a + b, 0)
  const order = raw.map((value, i) => ({ i, frac: value - floors[i] })).sort((a, b) => b.frac - a.frac || a.i - b.i)
  for (let n = 0; n < rest; n++) floors[order[n % order.length].i] += 1
  return floors
}
export function createDashboardModel(config: DashboardConfig) {
  if (!isBusiness(config.business)) throw new Error(`Unknown business: ${config.business}`)
  const business=config.business as Business
  const metrics=metricDefinitions(business)
  const ids=Array.from({length:Math.max(1,config.units.length)},(_,i)=>i)
  const scale = pickScale(config)
  const seed = config.seed
    ?? (scale.monthlyDeals != null || scale.priceRange
      ? (typeof config.displayName === 'string' && config.displayName ? config.displayName : undefined)
      : undefined)
    ?? (config.units.join(',') || business)
  const params = ids.map(i => unitParams(seed, i))
  if (ids.length >= 3) {
    let minIdx = 0, maxIdx = 0
    for (let j = 1; j < params.length; j++) {
      if (params[j].trend < params[minIdx].trend) minIdx = j
      if (params[j].trend > params[maxIdx].trend) maxIdx = j
    }
    if (params[minIdx].trend > -0.08) params[minIdx].trend = -0.08 - unit01(seed, 'fix-min') * 0.06
    if (params[maxIdx].trend < 0.12) params[maxIdx].trend = 0.12 + unit01(seed, 'fix-max') * 0.06
  }
  const ref = scale.demoDate ? lastCompletedMonth(scale.demoDate) : { y: 2026, m: 8 }
  const refKey = `${ref.y}-${pad2(ref.m)}`
  const monthsFromNow = (y: number, mo: number) => (y - ref.y) * 12 + (mo - ref.m)
  const activity = (i: number, y: number, mo: number, key: string) => {
    const { trend } = params[i]
    const growth = Math.pow(1 + trend, monthsFromNow(y, mo) / 12)
    const noise = 1 + (unit01(seed, 'n' + i + ':' + key) - .5) * .06
    return growth * seasonFactor(business, mo) * noise
  }
  const unitWeight = (i: number, y: number, mo: number, key: string) => params[i].volume * activity(i, y, mo, key)
  const companyOrders = (y: number, mo: number, key: string) => {
    if (scale.monthlyDeals == null) return null
    const now = ids.reduce((sum, i) => sum + unitWeight(i, y, mo, key), 0)
    const base = ids.reduce((sum, i) => sum + unitWeight(i, ref.y, ref.m, refKey), 0)
    return Math.max(0, Math.round(scale.monthlyDeals * (base ? now / base : 1)))
  }
  const unitOrders = (i: number, y: number, mo: number, key: string) => {
    const total = companyOrders(y, mo, key)
    if (total == null) return null
    return distribute(total, ids.map(id => unitWeight(id, y, mo, key)))[i]
  }
  const resolvedPrice = (i: number, key: string, k: number, fallback: (base: number) => number, base: number) => {
    if (!scale.priceRange) return fallback(base)
    const [min, max] = scale.priceRange
    if (min === max) return min
    const drift = Math.pow(1.04, k / 12)
    const noise = 1 + (unit01(seed, 'pn' + i + ':' + key) - .5) * .03
    const mid = (min + max) / 2
    return Math.min(max, Math.max(min, mid * (.92 + unit01(seed, 'p' + i) * .16) * drift * noise))
  }
  function monthlyRaw(i:number,key:string): Raw {
    const [y,mo]=key.split('-').map(Number),k=monthsFromNow(y,mo)
    const { volume, trend } = params[i]
    const vary = activity(i, y, mo, key)
    const price = (base: number) => base*(.92+unit01(seed,'p'+i)*.16)*Math.pow(1.04,k/12)*(1+(unit01(seed,'pn'+i+':'+key)-.5)*.03)
    let raw: Raw
    if (business==='school') {
      const orders=Math.round(180*volume*vary),occupied=Math.round(162*volume*Math.pow(1+trend,k/12)),capacity=Math.round(200*volume*(1.05+unit01(seed,'c'+i)*.3))
      const debtShare=.03+unit01(seed,'d'+i)*.05-trend*.15+(unit01(seed,'dn'+i+':'+key)-.5)*.02
      raw = {cash:Math.round(orders*price(27000)),orders,occupied,capacity,billed:occupied*32000,debt:Math.round(occupied*32000*Math.max(.01,debtShare))}
    } else {
      const drift = (tag: string, perYear: number) => (unit01(seed, tag + i) - .5) * 2 * perYear * k / 12 + (unit01(seed, tag + 'n' + i + ':' + key) - .5) * perYear * .3
      if (business==='retail') {
        const orders=Math.round(2400*volume*vary)
        const rate=Math.max(.12,.22+(i%5)*.013+drift('cv',.02)),ret=Math.max(.01,.032+(i%3)*.012+drift('rt',.008))
        raw = {cash:Math.round(orders*price(1350)),orders,visits:Math.round(orders/rate),sold:Math.round(orders*(2.1+(i%4)*.23)),returned:Math.round(orders*(2.1+(i%4)*.23)*ret)}
      } else {
        const orders=Math.round(180*volume*vary),cash=Math.round(orders*price(18500))
        const ontimeRate=Math.min(.99,Math.max(.7,.91+trend*.3+drift('ot',.03))),repeatRate=Math.max(.02,.061-trend*.1+drift('rp',.015))
        // Загрузка — характер точки (73–82%) плюс лёгкий шум по месяцу; трендом не
        // масштабируется: часы не могут превышать доступные, коридор 70–85% держится.
        const available=Math.round(1600*volume)
        const loadRate=Math.min(.95,.73+unit01(seed,'l'+i)*.09+(unit01(seed,'ln'+i+':'+key)-.5)*.04)
        raw = {cash,orders,due:orders+12,ontime:Math.round((orders+12)*ontimeRate),hours:Math.round(available*loadRate),available,repeat:Math.round(orders*repeatRate),eligible:orders,billed:cash,debt:Math.round(cash*(.03+drift('db',.01)))}
      }
    }
    const target = unitOrders(i, y, mo, key)
    if (target != null && raw.orders > 0) {
      const factor = target / raw.orders
      raw = Object.fromEntries(Object.entries(raw).map(([field, value]) => [field, Math.max(0, Math.round(value * factor))]))
      raw.orders = target
    } else if (target != null) {
      raw = { ...raw, orders: target }
    }
    if (scale.priceRange) {
      const unitPrice = resolvedPrice(i, key, k, price, business === 'school' ? 27000 : business === 'retail' ? 1350 : 18500)
      raw.cash = Math.round(raw.orders * unitPrice)
      if (business !== 'school') raw.billed = raw.cash
    }
    return raw
  }
  function raw(i:number,spec:PeriodSpec): Raw {
    if (spec.keys) {
      const rows=spec.keys.map(k=>monthlyRaw(i,k))
      const total=Object.fromEntries(Object.keys(rows[0]).map(key=>[key,rows.reduce((sum,r)=>sum+r[key],0)]))
      if (business==='school') {
        const last=rows[rows.length-1];total.occupied=last.occupied;total.capacity=last.capacity
        if (rows.length>1) {
          const { volume } = params[i]
          total.debt=Math.round(((210000*volume)+(Number(spec.end.slice(0,4))===ref.y?0:25000))*rows.length/10)
        }
      }
      return total
    }
    if (!spec.sample) throw new Error('Invalid period descriptor')
    const [y,mo,d0]=spec.start.split('-').map(Number),days=Math.round((Date.parse(spec.end)-Date.parse(spec.start))/86400000)+1
    const daysInMonth=new Date(Date.UTC(y,mo,0)).getUTCDate()
    const share=days/daysInMonth*(1+(unit01(seed,'s'+i+':'+spec.start)-.5)*.1)*(spec.sample.day?1.08:1)
    const month=monthlyRaw(i,`${y}-${String(mo).padStart(2,'0')}`)
    void d0
    return Object.fromEntries(Object.entries(month).map(([key,v])=>[key,Math.max(1,Math.round(v*share))]))
  }
  function choices(scaleName:Scale): PeriodChoice[] {
    const monthLabel = (y: number, m: number) => `${monthNames[m - 1]} ${y}`
    const monthId = (y: number, m: number) => `${y}-${pad2(m)}`
    if (scaleName==='month') {
      return [0, -1, -2].map(delta => {
        const cur = shiftMonth(ref.y, ref.m, delta)
        const prev = shiftMonth(cur.y, cur.m, -1)
        const year = shiftMonth(cur.y, cur.m, -12)
        const id = monthId(cur.y, cur.m)
        return {id,current:span(monthLabel(cur.y, cur.m),[id]),bases:{previous:{label:'Предыдущий месяц',spec:span(monthLabel(prev.y, prev.m),[monthId(prev.y, prev.m)])},year:{label:'Тот же месяц год назад',spec:span(monthLabel(year.y, year.m),[monthId(year.y, year.m)])}},note:'Завершённые календарные месяцы. Число дней может различаться; нормирования на день нет.'}
      })
    }
    const academicStart = scale.demoDate ? lastCompletedAcademicStart(scale.demoDate) : 2025
    if (scaleName==='academic') {
      const prevStart = academicStart - 1
      const currentKeys = [...monthKeys(academicStart,9,12),...monthKeys(academicStart + 1,1,6)]
      const previousKeys = [...monthKeys(prevStart,9,12),...monthKeys(academicStart,1,6)]
      return [{id:`${academicStart}-${String(academicStart + 1).slice(2)}`,current:span(`${academicStart}/${String(academicStart + 1).slice(2)} · 01.09.${academicStart}–30.06.${academicStart + 1}`,currentKeys),bases:{previous:{label:'Предыдущий учебный год',spec:span(`${prevStart}/${String(academicStart).slice(2)} · 01.09.${prevStart}–30.06.${academicStart}`,previousKeys)}},note:'Учебный год — сентябрь–июнь. Поступления и платежи суммируются. Ученики и заполненность — срез на 30 июня. Задолженность по начислениям года — отдельный остаток на его конец.'}]
    }
    const calendarYear = scale.demoDate ? lastCompletedCalendarYear(scale.demoDate) : 2025
    if (scaleName==='year') return [{id:String(calendarYear),current:span(`${calendarYear} · 01.01–31.12`,monthKeys(calendarYear,1,12)),bases:{previous:{label:'Предыдущий год',spec:span(`${calendarYear - 1} · 01.01–31.12`,monthKeys(calendarYear - 1,1,12))}},note:'Два завершённых календарных года. Доли и средние вычисляются заново из общих числителей и знаменателей.'}]
    const sample=(label:string,start:string,end:string,orders:number,price:number,rate:number,load:number,day=false):PeriodSpec=>({label,start,end,sample:{orders,price,rate,load,day}})
    const lastDay = lastDateOfMonth(ref.y, ref.m)
    const dayPrev = addUtcDays(lastDay, -7)
    const dayYear = addUtcDays(lastDay, -364)
    const dayLabel = (date: Date) => `${weekdayCap[date.getUTCDay()]}, ${fmtDot(date)}`
    if (scaleName==='day') return [{id:isoDay(lastDay),current:sample(dayLabel(lastDay),isoDay(lastDay),isoDay(lastDay),115,1410,.24,.80,true),bases:{previous:{label:'Тот же день прошлой недели',spec:sample(dayLabel(dayPrev),isoDay(dayPrev),isoDay(dayPrev),115,1410,.23,.79,true)},year:{label:'52 недели назад',spec:sample(dayLabel(dayYear),isoDay(dayYear),isoDay(dayYear),115,1410,.22,.76,true)}},note:`Сравнение одинаковых дней недели. Дневные счётчики заданы отдельно. Возвраты наблюдаются 7 дней, данные закрыты на ${fmtDot(addUtcDays(lastDay, 8))}.`}]
    const week = lastCompleteWeek(ref.y, ref.m)
    const weekPrev = { start: addUtcDays(week.start, -7), end: addUtcDays(week.end, -7) }
    const weekYear = { start: addUtcDays(week.start, -364), end: addUtcDays(week.end, -364) }
    const weekLabel = (spanDates: { start: Date; end: Date }) => `${spanDates.start.getUTCDate()}–${fmtDot(spanDates.end)} · пн–вс`
    const r=business==='retail'
    return [{id:isoWeekId(week.start),current:sample(weekLabel(week),isoDay(week.start),isoDay(week.end),r?580:42,r?1380:19000,r?.24:.93,.82),bases:{previous:{label:'Предыдущая неделя',spec:sample(weekLabel(weekPrev),isoDay(weekPrev.start),isoDay(weekPrev.end),r?580:42,r?1380:19000,r?.235:.90,.77)},year:{label:'52 недели назад',spec:sample(weekLabel(weekYear),isoDay(weekYear.start),isoDay(weekYear.end),r?580:42,r?1380:19000,r?.22:.88,.73)}},note:'Завершённые недели, понедельник–воскресенье. Недельные счётчики заданы отдельно; годовая база — 52 недели назад. Для повторов и возвратов одинаковое 7-дневное окно.'}]
  }
  return {business,ids,metrics,monthlyRaw,raw,choices}
}
export type DashboardModel = ReturnType<typeof createDashboardModel>
export function aggregate(metric:Metric, rows:(Raw|null)[]):number|null {
  if (!rows.length||rows.some(r=>r===null)) return null
  const n=rows.reduce((s,r)=>s+r![metric.n],0)
  if (!metric.d) return n
  const d=rows.reduce((s,r)=>s+r![metric.d!],0)
  return d===0?null:n/d*(metric.type==='percent'?100:1)
}
export function formatMetric(value:number|null,m:Metric,exact=false):string {
  if (value===null) return '—'
  let n=value,suffix=''
  if (!exact&&m.type!=='percent'&&value>=1e9) {n/=1e9;suffix=' млрд'}
  else if (!exact&&m.type!=='percent'&&value>=1e6) {n/=1e6;suffix=' млн'}
  else if (!exact&&m.type!=='percent'&&value>=1e4) {n/=1e3;suffix=' тыс.'}
  return new Intl.NumberFormat('ru-RU',{maximumFractionDigits:m.type==='count'&&!suffix?0:exact&&m.type==='money'?2:1}).format(n)+suffix+(m.type==='money'?' ₽':m.type==='percent'?' %':'')
}
const signed=(n:number)=>Math.abs(n)<1e-9?'0':Math.abs(n)<.05?'≈0':(n>0?'+':'')+new Intl.NumberFormat('ru-RU',{maximumFractionDigits:1}).format(n)
export function deltaMetric(c:number|null,b:number|null,m:Metric):string {
  if (c===null||b===null) return 'Нет данных для сравнения'
  if (m.type==='percent') return signed(c-b)+' п. п.'
  if (b===0) return (c===0?'0':(c>0?'+':'')+formatMetric(c,m))+' · база 0'
  return signed((c-b)/Math.abs(b)*100)+' %'
}
export function snapshotLabel(m:Metric,current:PeriodSpec,base?:PeriodSpec):string {
  if (!m.snapshot) return ''
  return (m.debt?'По начислениям выбранного периода · состояние на ':'На ')+dateLabel(current.end)+(base?` · база на ${dateLabel(base.end)}`:'')
}
