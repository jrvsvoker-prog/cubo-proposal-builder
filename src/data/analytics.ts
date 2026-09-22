import { profile } from './profile'
import { createDashboardModel, span } from './dashboard-model'
import { getArchetype } from './archetypes'

/** Section 02 uses the same monthly counters as section 01. Detail rows are
 * deterministic allocations, not a second unrelated set of headline numbers. */
const config=profile.analyticsConfig
const model=createDashboardModel({...profile})
export const anaBranches=profile.units.length?[...profile.units]:[profile.name]
export const anaSources=[...config.sources]
export type AnaProgram=string
export const anaPrograms=[...config.programs]
export const anaCurYear=config.currentYear
export const anaBaseYear=anaCurYear-1
export interface SaleRecord {id:string;year:number;month:number;direction:string;branch:string;source:string;program:AnaProgram;students:number;amount:number;billed:number}
export interface PayRecord {id:string;year:number;month:number;kind:'payment'|'prepay';branch:string;source:string;amount:number}
export interface AnaWindow {year:number;startMonth:number;months:number}
export interface AnaFilters {branches:string[];sources:string[]}
export type AnaPeriodId='year'|'half1'|'half2'
export type AnaCompareId='lastYear'|'prev'
export interface AnaRange {current:AnaWindow;base:AnaWindow;currentLabel:string;baseLabel:string}
export const anaPeriods:{id:AnaPeriodId;label:string}[]=[{id:'year',label:config.periodLabel},{id:'half1',label:config.halfLabels[0]},{id:'half2',label:config.halfLabels[1]}]
export const anaCompares:{id:AnaCompareId;label:string}[]=[{id:'lastYear',label:'Прошлый год'},{id:'prev',label:'Предыдущий период'}]
const absMonth=(year:number,month:number)=>year*12+month
const calendarKey=(year:number,month:number)=>{const a=year*12+config.startMonth+month;return `${Math.floor(a/12)}-${String(a%12+1).padStart(2,'0')}`}
const windowKeys=(w:AnaWindow)=>Array.from({length:w.months},(_,i)=>calendarKey(w.year,w.startMonth+i))
export const anaWindow=(period:AnaPeriodId,year:number):AnaWindow=>({year,startMonth:period==='half2'?config.yearMonths/2:0,months:period==='year'?config.yearMonths:config.yearMonths/2})
const calendarNames=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
export const anaMonthShort=(m:number)=>calendarNames[(config.startMonth+m)%12].slice(0,3)
export const anaMonthFull=(m:number,y:number)=>{const key=calendarKey(y,m);return `${calendarNames[Number(key.slice(5))-1]} ${key.slice(0,4)}`}
export const anaWindowLabel=(w:AnaWindow)=>`${anaMonthFull(w.startMonth,w.year)} — ${anaMonthFull(w.startMonth+w.months-1,w.year)}`
export const anaRange=(period:AnaPeriodId,compare:AnaCompareId):AnaRange=>{
  const current=anaWindow(period,anaCurYear)
  // Academic semesters keep the summer gap; "previous year" is the prior academic year.
  const base=compare==='lastYear'||period==='year'?{...current,year:current.year-1}:period==='half2'?anaWindow('half1',anaCurYear):anaWindow('half2',anaBaseYear)
  return {current,base,currentLabel:anaWindowLabel(current),baseLabel:anaWindowLabel(base)}
}
const inWindow=(y:number,m:number,w:AnaWindow)=>{const a=absMonth(y,m),s=absMonth(w.year,w.startMonth);return a>=s&&a<s+w.months}
const passFilters=(r:{branch:string;source:string},f:AnaFilters)=>f.branches.includes(r.branch)&&f.sources.includes(r.source)
const allocate=(total:number,count:number,index:number)=>{
  const cents=Math.round(total*100),part=Math.floor(cents/count)
  return (part+(index<cents-part*count?1:0))/100
}
// Веса групп (02-O): убывающие от индекса (первая группа крупнейшая), своя сезонная волна и годовой
// тренд у каждой; нормируются на 1 — сумма месяца не меняется, распределяются заказы, не деньги.
// yearIndex: 0 — базовый год, 1 — текущий; salt разводит разрезы (направления/источники/программы).
function groupWeights(n:number,month:number,yearIndex:number,salt:number):number[] {
  const w=Array.from({length:n},(_,k)=>{
    const base=1/(k+1.6)
    const amp=0.12+0.05*((k+salt)%4)                       // 0.12…0.27
    const phase=((k*12)/n+salt*2.3)%12
    const season=1+amp*Math.sin((2*Math.PI*(month+phase))/12)
    const trend=1+yearIndex*(0.14-0.07*((k+salt)%4))       // −0.07…+0.14 за год
    return base*season*trend
  })
  const sum=w.reduce((a,b)=>a+b,0)
  return w.map(x=>x/sum)
}
// Индекс группы для заказа j: низкодискрепантная последовательность u∈[0,1) по кумулятивным весам —
// доли сходятся к весам уже на десятках заказов, без случайности и без корреляции между разрезами (разные step).
function pickGroup(weights:number[],j:number,step:number,offset:number):number {
  const u=((j+1)*step+offset)%1
  let acc=0
  for(let k=0;k<weights.length;k++){acc+=weights[k];if(u<acc)return k}
  return weights.length-1
}
const STEP_DIR=0.6180339887,STEP_SRC=0.7548776662,STEP_PROG=0.4142135624
function buildRecords():{sales:SaleRecord[];pays:PayRecord[]} {
  const sales:SaleRecord[]=[],pays:PayRecord[]=[]
  for(const year of [anaBaseYear,anaCurYear]) for(let month=0;month<12;month++) for(const [i,branch] of anaBranches.entries()) {
    const raw=model.monthlyRaw(i,calendarKey(year,month))
    const count=raw.orders
    const archPayments = getArchetype(profile.business).payments
    const prepay=archPayments.prepayShare>0?Math.round(raw.cash*archPayments.prepayShare*100)/100:0
    const paid=archPayments.debtDeducted?raw.cash-raw.debt:raw.cash-prepay
    const yearIndex=year-anaBaseYear
    const wDir=groupWeights(config.directions.length,month,yearIndex,0)
    const wSrc=groupWeights(anaSources.length,month,yearIndex,1)
    const wProg=groupWeights(config.programs.length,month,yearIndex,2)
    for(let j=0;j<count;j++) {
      const id=`${year}-${month}-${i}-${j}`
      const source=anaSources[pickGroup(wSrc,j,STEP_SRC,i*0.29+month*0.11)]
      const direction=config.directions[pickGroup(wDir,j,STEP_DIR,i*0.37)]
      const program=config.programs[pickGroup(wProg,j,STEP_PROG,i*0.23)]
      sales.push({id,year,month,branch,source,direction,program,students:1+j%3,amount:allocate(raw.cash,count,j),billed:allocate(raw.billed??raw.cash,count,j)})
      pays.push({id:'p-'+id,year,month,branch,source,kind:'payment',amount:allocate(paid,count,j)})
      if(prepay>0)pays.push({id:'a-'+id,year,month,branch,source,kind:'prepay',amount:allocate(prepay,count,j)})
    }
  }
  return {sales,pays}
}
const built=buildRecords()
export const anaSales=built.sales,anaPays=built.pays
export const salesInWindow=(w:AnaWindow,f:AnaFilters)=>anaSales.filter(r=>inWindow(r.year,r.month,w)&&passFilters(r,f))
export const paysInWindow=(w:AnaWindow,f:AnaFilters)=>anaPays.filter(r=>inWindow(r.year,r.month,w)&&passFilters(r,f))
export const sumSales=(rows:SaleRecord[])=>({amount:rows.reduce((s,r)=>s+r.amount,0),students:rows.reduce((s,r)=>s+r.students,0),count:rows.length})
/** Closing balance of the selected accrual cohort, NOT the sum of month-end balances.
 * Source breakdown is allocated proportionally within each branch in this demo. */
const branchDebts=(w:AnaWindow,f:AnaFilters):number[]=>{
  const spec=span(anaWindowLabel(w),windowKeys(w))
  return anaBranches.map((branch,i)=>{
    if(!f.branches.includes(branch))return 0
    const all=anaSales.filter(r=>r.branch===branch&&inWindow(r.year,r.month,w))
    const filtered=all.filter(r=>f.sources.includes(r.source))
    const denominator=sumSales(all).amount
    return denominator?model.raw(i,spec).debt*sumSales(filtered).amount/denominator:0
  })
}
export const debtAtEnd=(w:AnaWindow,f:AnaFilters):number=>branchDebts(w,f).reduce((s,v)=>s+v,0)
export interface AnaMonthRow {label:string;month:number;revenue:number;accrued:number;paid:number;prepay:number;count:number;students:number;debtEnd:number}
export const anaMonthly=(w:AnaWindow,f:AnaFilters):AnaMonthRow[]=>{
  const sales=salesInWindow(w,f),pays=paysInWindow(w,f)
  return Array.from({length:w.months},(_,index)=>{
    const abs=absMonth(w.year,w.startMonth)+index,year=Math.floor(abs/12),month=abs%12
    const rows=sales.filter(r=>r.year===year&&r.month===month),t=sumSales(rows)
    const payment=(kind:'payment'|'prepay')=>pays.filter(r=>r.year===year&&r.month===month&&r.kind===kind).reduce((s,r)=>s+r.amount,0)
    return {label:anaMonthFull(month,year),month,revenue:t.amount,accrued:rows.reduce((s,r)=>s+r.billed,0),paid:payment('payment'),prepay:payment('prepay'),count:t.count,students:t.students,debtEnd:debtAtEnd({...w,months:index+1},f)}
  })
}
export type AnaGroupKey = 'direction' | 'branch' | 'source' | 'program'

export interface AnaGroupRow {
  key: string
  label: string
  amount: number
  count: number
  students: number
  share: number
}

export const anaGroupBy = (rows: SaleRecord[], key: AnaGroupKey, total?: number): AnaGroupRow[] => {
  const map = new Map<string, AnaGroupRow>()
  for (const r of rows) {
    const k = String(r[key])
    let row = map.get(k)
    if (!row) {
      row = { key: k, label: k, amount: 0, count: 0, students: 0, share: 0 }
      map.set(k, row)
    }
    row.amount += r.amount
    row.count += 1
    row.students += r.students
  }
  const all = total ?? rows.reduce((a, r) => a + r.amount, 0)
  const list = [...map.values()]
  for (const row of list) row.share = all ? Math.round((row.amount / all) * 100) : 0
  return list.sort((a, b) => b.amount - a.amount)
}

/** Метрика по месяцам для каждой группы (для мультилинейного графика). */
export const anaMetricSeries = (
  w: AnaWindow,
  f: AnaFilters,
  key: AnaGroupKey,
  metric: AnaMetric,
): { names: string[]; byMonth: { label: string; month: number; values: Map<string, number> }[] } => {
  const rows = salesInWindow(w, f)
  const names = [...new Set(rows.map((r) => String(r[key])))].sort(
    (a, b) =>
      rows.filter((r) => String(r[key]) === b).reduce((x, r) => x + r.amount, 0) -
      rows.filter((r) => String(r[key]) === a).reduce((x, r) => x + r.amount, 0),
  )
  const byMonth = []
  const s = absMonth(w.year, w.startMonth)
  for (let i = 0; i < w.months; i++) {
    const a = s + i
    const y = Math.floor(a / 12)
    const m = ((a % 12) + 12) % 12
    const monthRows = rows.filter((r) => r.year === y && r.month === m)
    const values = new Map<string, number>()
    for (const name of names) {
      const groupRows = monthRows.filter((r) => String(r[key]) === name)
      values.set(name, metricValue(sumSales(groupRows), metric))
    }
    byMonth.push({ label: anaMonthFull(m, y), month: m, values })
  }
  return { names, byMonth }
}

/** Строка сравнения группы: текущее окно против базового. Доля — внутри своего
 * периода (для аддитивных метрик; у среднего доли нет — 0). */
export interface AnaDeltaRow {
  key: string
  label: string
  cur: number
  base: number
  delta: number
  /** Процент к базе; null, если базы не было (группа новая). */
  pct: number | null
  shareCur: number
  shareBase: number
}

const shareOf = (v: number, total: number) => (total ? Math.round((v / total) * 100) : 0)

export const anaGroupDelta = (
  curW: AnaWindow,
  baseW: AnaWindow,
  f: AnaFilters,
  key: AnaGroupKey,
  metric: AnaMetric,
): AnaDeltaRow[] => {
  const additive = metric !== 'avg'
  const cg = anaGroupBy(salesInWindow(curW, f), key)
  const bmap = new Map(anaGroupBy(salesInWindow(baseW, f), key).map((r) => [r.key, r]))
  const totalCur = additive ? cg.reduce((a, g) => a + metricValue(g, metric), 0) : 0
  const totalBase = additive ? [...bmap.values()].reduce((a, g) => a + metricValue(g, metric), 0) : 0
  const row = (key: string, label: string, cur: number, base: number): AnaDeltaRow => ({
    key,
    label,
    cur,
    base,
    delta: cur - base,
    pct: base ? Math.round(((cur - base) / base) * 100) : null,
    shareCur: shareOf(cur, totalCur),
    shareBase: shareOf(base, totalBase),
  })
  const rows = cg.map((g) => {
    const b = bmap.get(g.key)
    bmap.delete(g.key)
    return row(g.key, g.label, metricValue(g, metric), b ? metricValue(b, metric) : 0)
  })
  // Группы, исчезнувшие в текущем периоде, честно показываем с нулём.
  for (const [k, g] of bmap) rows.push(row(k, g.label, 0, metricValue(g, metric)))
  return rows.sort((a, b) => b.delta - a.delta)
}

/** Остаток долга по разрезу. Не-'branch' ключи распределяют долг филиала
 * пропорционально продажам группы внутри него — как в debtAtEnd по источникам. */
export const debtByGroup = (w: AnaWindow, f: AnaFilters, key: AnaGroupKey): Map<string, number> => {
  const debts = branchDebts(w, f)
  const map = new Map<string, number>()
  anaBranches.forEach((branch, i) => {
    const debt = debts[i]
    if (!debt) return
    if (key === 'branch') {
      map.set(branch, (map.get(branch) ?? 0) + debt)
      return
    }
    const rows = anaSales.filter((r) => r.branch === branch && inWindow(r.year, r.month, w) && f.sources.includes(r.source))
    const total = rows.reduce((s, r) => s + r.amount, 0)
    if (!total) return
    for (const g of anaGroupBy(rows, key, total)) map.set(g.key, (map.get(g.key) ?? 0) + (debt * g.amount) / total)
  })
  return map
}

export const anaDebtCompare = (curW: AnaWindow, baseW: AnaWindow, f: AnaFilters, key: AnaGroupKey): AnaDeltaRow[] => {
  const c = debtByGroup(curW, f, key)
  const b = debtByGroup(baseW, f, key)
  const totalCur = [...c.values()].reduce((a, v) => a + v, 0)
  const totalBase = [...b.values()].reduce((a, v) => a + v, 0)
  const keys = new Set([...c.keys(), ...b.keys()])
  return [...keys]
    .map((k) => {
      const cur = c.get(k) ?? 0
      const base = b.get(k) ?? 0
      return { key: k, label: k, cur, base, delta: cur - base, pct: base ? Math.round(((cur - base) / base) * 100) : null, shareCur: shareOf(cur, totalCur), shareBase: shareOf(base, totalBase) }
    })
    .sort((x, y) => y.cur - x.cur)
}

// ---------------------------------------------------------------------------
// Формат метрик
// ---------------------------------------------------------------------------

export type AnaMetric = 'revenue' | 'count' | 'avg' | 'students'
export type AnaMoneyMetric = 'accrued' | 'paid' | 'prepay' | 'debt'

export const metricValue = (t: { amount: number; students: number; count: number }, metric: AnaMetric): number => {
  if (metric === 'revenue') return t.amount
  if (metric === 'count') return t.count
  if (metric === 'students') return t.students
  return t.count ? Math.round(t.amount / t.count) : 0
}

/** Ровная ось: шаг из ряда 1/2/2.5/5×10^k, верх кратен шагу. */
export const anaAxis = (values: number[]): { step: number; top: number; ticks: number[] } => {
  const max = Math.max(1, ...values)
  const raw = max / 4
  const pow = 10 ** Math.floor(Math.log10(raw))
  const step = ([1, 2, 2.5, 5, 10].find((m) => m * pow >= raw) ?? 10) * pow
  const top = step * 4
  return { step, top, ticks: [0, 1, 2, 3, 4].map((i) => i * step) }
}
