import { anaBranches, anaMonthly, anaGroupBy, debtByGroup, salesInWindow, sumSales, metricValue, type AnaFilters, type AnaGroupKey, type AnaMetric, type AnaRange, type SaleRecord } from '../../../data/analytics'
import { profile } from '../../../data/profile'
import { metricLabels, groupLabels } from '../../../data/analytics-copy'
import { compactMoney, deltaPct, int } from '../../../utils/format'
import type { DetailColumn, DetailPayload } from '../detail-modal'

export const filterChips=(range:AnaRange,f:AnaFilters):string[]=>[
  `Период: ${range.currentLabel}`,`Сравнение: ${range.baseLabel}`,
  profile.units.length?`${profile.unitPlural}: ${f.branches.join(', ')||'не выбраны'}`:`Компания: ${profile.name}`,
  `Источники: ${f.sources.join(', ')||'не выбраны'}`,
]
const deltaOf=(c:number,b:number)=>b===0?undefined:deltaPct(c,b)
const format=(v:number,m:AnaMetric)=>m==='revenue'||m==='avg'?compactMoney(v):int(v)
const columns=(first:'group'|'month'):DetailColumn[]=>[
  {key:first,label:first==='month'?'Месяц':groupLabels.branch},
  {key:'count',label:metricLabels.count,align:'right'},
  {key:'items',label:metricLabels.students,align:'right'},
  {key:'amount',label:metricLabels.revenue,align:'right'},
]
const row=(records:SaleRecord[])=>{const t=sumSales(records);return {count:int(t.count),items:int(t.students),amount:compactMoney(t.amount)}}
const branchRows=(records:SaleRecord[],f:AnaFilters)=>anaBranches.filter(b=>f.branches.includes(b)).map(group=>({group,...row(records.filter(r=>r.branch===group))}))
const headline=(records:SaleRecord[],base:SaleRecord[],m:AnaMetric)=>{
  const current=metricValue(sumSales(records),m),previous=metricValue(sumSales(base),m)
  return {label:'Текущий период',value:format(current,m),base:format(previous,m),delta:deltaOf(current,previous)}
}
export const monthDetail=(range:AnaRange,f:AnaFilters,index:number,metric:AnaMetric):DetailPayload=>{
  const cur=anaMonthly(range.current,f)[index],base=anaMonthly(range.base,f)[index]
  const records=salesInWindow(range.current,f).filter(r=>r.month===cur.month)
  const baseRecords=salesInWindow(range.base,f).filter(r=>r.month===base.month)
  return {title:`${cur.label} · ${metricLabels[metric]}`,context:filterChips(range,f),headline:headline(records,baseRecords,metric),columns:columns('group'),rows:branchRows(records,f),footer:'Состав выбранного месяца с учётом всех фильтров.'}
}
export const groupMonthsRows=(rows:SaleRecord[],months:{label:string;month:number}[])=>months.map(m=>({month:m.label,...row(rows.filter(r=>r.month===m.month))}))
export const groupDetail=(range:AnaRange,f:AnaFilters,key:AnaGroupKey,group:string,metric:AnaMetric):DetailPayload=>{
  const records=salesInWindow(range.current,f).filter(r=>r[key]===group),previous=salesInWindow(range.base,f).filter(r=>r[key]===group)
  return {title:`${group} · ${metricLabels[metric]}`,context:filterChips(range,f),headline:headline(records,previous,metric),columns:columns('month'),rows:groupMonthsRows(records,anaMonthly(range.current,f)),footer:'Динамика выбранной группы. Среднее — общая сумма / общее количество.'}
}
export const groupTableDetail=(range:AnaRange,f:AnaFilters,key:AnaGroupKey,group:string,rows:SaleRecord[]):DetailPayload=>({
  title:`${groupLabels[key]}: ${group}`,context:filterChips(range,f),headline:headline(rows,salesInWindow(range.base,f).filter(r=>r[key]===group),'revenue'),columns:columns('month'),rows:groupMonthsRows(rows,anaMonthly(range.current,f)),footer:'Состав группы по месяцам выбранного периода.',
})
/** Долг группы по месяцам — нарастающий срез начислений, как в anaMonthly.debtEnd. */
export const debtGroupDetail=(range:AnaRange,f:AnaFilters,key:AnaGroupKey,group:string):DetailPayload=>{
  const cur=debtByGroup(range.current,f,key).get(group)??0,base=debtByGroup(range.base,f,key).get(group)??0
  const months=anaMonthly(range.current,f)
  return {
    title:`${group} · задолженность`,context:filterChips(range,f),
    headline:{label:'Долг на конец периода',value:compactMoney(cur),base:compactMoney(base),delta:deltaOf(cur,base)},
    columns:[{key:'month',label:'Месяц'},{key:'debt',label:'Долг на конец',align:'right'}],
    rows:months.map((_,i)=>({month:months[i].label,debt:compactMoney(debtByGroup({...range.current,months:i+1},f,key).get(group)??0)})),
    footer:profile.analyticsConfig.moneyNote,
  }
}
type MoneyKind='accrued'|'paid'|'prepay'|'debt'
const moneyLabels:Record<MoneyKind,string>={accrued:'Начислено',paid:'Оплаты',prepay:'Предоплаты',debt:'Долг по начислениям периода'}
const moneyColumns:DetailColumn[]=[{key:'group',label:groupLabels.branch},...(['accrued','paid','prepay','debt'] as MoneyKind[]).map(key=>({key,label:moneyLabels[key],align:'right' as const}))]
const moneyTotals=(months:ReturnType<typeof anaMonthly>)=>({accrued:months.reduce((s,r)=>s+r.accrued,0),paid:months.reduce((s,r)=>s+r.paid,0),prepay:months.reduce((s,r)=>s+r.prepay,0),debt:months.at(-1)?.debtEnd??0})
export const moneyMonthDetail=(range:AnaRange,f:AnaFilters,index:number):DetailPayload=>{
  const current=anaMonthly(range.current,f)[index],base=anaMonthly(range.base,f)[index]
  return {title:`${current.label} · деньги`,context:filterChips(range,f),headline:{label:'Начислено за месяц',value:compactMoney(current.accrued),base:compactMoney(base.accrued),delta:deltaOf(current.accrued,base.accrued)},columns:moneyColumns,
    rows:anaBranches.filter(b=>f.branches.includes(b)).map(group=>{const r=anaMonthly(range.current,{...f,branches:[group]})[index];return {group,accrued:compactMoney(r.accrued),paid:compactMoney(r.paid),prepay:compactMoney(r.prepay),debt:compactMoney(r.debtEnd)}}),
    footer:'Долг — срез начислений от начала выбранного периода по конец строки, не сумма остатков.'}
}
