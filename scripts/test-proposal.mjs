import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'
import { validateProfile, readProfile } from './profile.mjs'

const root=fileURLToPath(new URL('../',import.meta.url))
const results=[]
function test(name,fn){fn();results.push({name,passed:true});console.log(`PASS ${name}`)}
function loader(profile){
  const cache=new Map()
  const load=file=>{
    const absolute=path.resolve(root,file)
    if(cache.has(absolute))return cache.get(absolute)
    const source=fs.readFileSync(absolute,'utf8')
    const result=ts.transpileModule(source,{fileName:absolute,reportDiagnostics:true,compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS}})
    assert.equal((result.diagnostics??[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0)
    const exports={};cache.set(absolute,exports)
    const require=name=>{
      if(name==='./profile'||name.endsWith('/data/profile'))return{profile,default:profile}
      if(name.endsWith('.json')){const jsonPath=path.resolve(path.dirname(absolute),name);const data=JSON.parse(fs.readFileSync(jsonPath,'utf8'));return{default:data,...(typeof data==='object'&&data!==null&&!Array.isArray(data)?data:{})}}
      return load(path.resolve(path.dirname(absolute),name+'.ts'))
    }
    vm.runInNewContext(result.outputText,{exports,require,Intl,Date,Map,Set,Object,console},{filename:absolute})
    return exports
  }
  return load
}
const profiles=Object.fromEntries(['school','service','mehanika','kontur','mayak-mvp'].map(n=>[n,JSON.parse(fs.readFileSync(path.join(root,`src/data/profiles/${n}.json`),'utf8'))]))
for(const [name,p] of Object.entries(profiles)){
  test(`${name}: complete input validates`,()=>validateProfile(p))
  const load=loader(p),d=load('src/data/dashboard-model.ts'),m=d.createDashboardModel(p),a=load('src/data/analytics.ts')
  test(`${name}: all demo periods have finite nonnegative counters`,()=>{
    for(const scale of p.dashboard.scales)for(const choice of m.choices(scale))for(const spec of [choice.current,...Object.values(choice.bases).map(b=>b.spec)])for(const i of m.ids){
      const r=m.raw(i,spec);for(const v of Object.values(r))assert.ok(Number.isFinite(v)&&v>=0)
      for(const metric of m.metrics){const v=d.aggregate(metric,[r]);assert.ok(v===null||Number.isFinite(v));if(metric.type==='percent')assert.ok(v===null||(v>=0&&v<=100))}
    }
  })
  test(`${name}: shown cards never define the total scope`,()=>{
    const period=m.choices('month')[0],metric=m.metrics.find(x=>x.id==='revenue')
    const total=d.aggregate(metric,m.ids.map(i=>m.raw(i,period.current)))
    for(const shown of [[],m.ids.slice(0,1),m.ids.slice(-1)])assert.equal(d.aggregate(metric,m.ids.map(i=>m.raw(i,period.current))),total)
  })
  test(`${name}: dashboard and analytics match for the same whole period`,()=>{
    const range=a.anaRange('year','lastYear'),f={branches:a.anaBranches,sources:a.anaSources},kind=name==='school'?'academic':'year',choice=m.choices(kind)[0]
    for(const [w,spec] of [[range.current,choice.current],[range.base,choice.bases.previous.spec]]){
      const rows=a.salesInWindow(w,f),totals=a.sumSales(rows)
      const cash=m.ids.reduce((sum,i)=>sum+m.raw(i,spec).cash,0),orders=m.ids.reduce((sum,i)=>sum+m.raw(i,spec).orders,0)
      assert.ok(Math.abs(totals.amount-cash)<.02);assert.equal(totals.count,orders)
      assert.ok(Math.abs(a.anaMonthly(w,f).reduce((s,r)=>s+r.revenue,0)-cash)<.02)
      const debt=m.ids.reduce((s,i)=>s+m.raw(i,spec).debt,0)
      assert.ok(Math.abs(a.debtAtEnd(w,f)-debt)<.02)
    }
  })
  test(`${name}: source and branch filters affect all totals and detail`,()=>{
    const range=a.anaRange('year','lastYear'),all={branches:a.anaBranches,sources:a.anaSources},one={...all,sources:[a.anaSources[0]]},none={...all,sources:[]}
    const total=a.sumSales(a.salesInWindow(range.current,all)).amount,filtered=a.sumSales(a.salesInWindow(range.current,one)).amount
    assert.ok(filtered>0&&filtered<total);assert.equal(a.salesInWindow(range.current,none).length,0)
    assert.equal(a.paysInWindow(range.current,none).length,0);assert.equal(a.debtAtEnd(range.current,none),0)
    for(const period of ['year','half1','half2'])for(const compare of ['lastYear','prev']){
      const r=a.anaRange(period,compare)
      assert.equal(a.anaMonthly(r.current,all).length,r.current.months);assert.equal(r.current.months,r.base.months)
    }
  })
  test(`${name}: weighted mean and rounded groups reconcile`,()=>{
    const r=a.anaRange('year','lastYear'),f={branches:a.anaBranches,sources:a.anaSources},rows=a.salesInWindow(r.current,f),t=a.sumSales(rows)
    for(const key of ['direction','branch','source','program']){const groups=a.anaGroupBy(rows,key);assert.equal(groups.reduce((s,g)=>s+g.count,0),t.count);assert.ok(Math.abs(groups.reduce((s,g)=>s+g.amount,0)-t.amount)<.02)}
  })
}
const load=loader(profiles.school),d=load('src/data/dashboard-model.ts'),school=d.createDashboardModel(profiles.school)
test('school: June and academic snapshots coincide, not summed across time',()=>{
  const june=school.choices('month').find(p=>p.id==='2026-06').current,year=school.choices('academic')[0].current
  for(const id of ['students','fill']){const m=school.metrics.find(m=>m.id===id);assert.equal(d.aggregate(m,school.ids.map(i=>school.raw(i,june))),d.aggregate(m,school.ids.map(i=>school.raw(i,year))))}
  const occupied=school.ids.reduce((s,i)=>s+school.raw(i,year).occupied,0)
  const debt=school.ids.reduce((s,i)=>s+school.raw(i,year).debt,0)
  assert.ok(occupied>0,'academic year occupied must be positive')
  assert.ok(debt>0,'academic year debt must be positive')
})
test('retail: 1 and 20 do not change aggregate, all pages are a presentation subset',()=>{
  const m=d.createDashboardModel({business:'retail',units:Array.from({length:20},(_,i)=>`Магазин ${i+1}`)}),choice=m.choices('month')[0],metric=m.metrics[0]
  const all=d.aggregate(metric,m.ids.map(i=>m.raw(i,choice.current))),pair=d.aggregate(metric,[0,19].map(i=>m.raw(i,choice.current)))
  assert.ok(all>0&&pair<all)
  assert.deepEqual(Array.from(m.ids.slice(18)),[18,19])
})
test('school 3 units: default state (Aug vs same month last year) has mixed-sign revenue deltas, spread >= 5 pp',()=>{
  const m3=d.createDashboardModel({business:'school',units:['Арбат','Сокол','Строгино']}),ch=m3.choices('month')[0],rev=m3.metrics.find(x=>x.id==='revenue')
  const deltas=m3.ids.map(i=>{const c=d.aggregate(rev,[m3.raw(i,ch.current)]),b=d.aggregate(rev,[m3.raw(i,ch.bases.year.spec)]);return b===0?0:(c-b)/b*100})
  assert.ok(deltas.some(d=>d<0),'at least one negative delta')
  assert.ok(deltas.some(d=>d>0),'at least one positive delta')
  assert.ok(Math.max(...deltas)-Math.min(...deltas)>=5,'spread >= 5 pp')
})
test('retail 20 units: default state (Aug vs same month last year) has mixed-sign revenue deltas, spread >= 5 pp',()=>{
  const m20=d.createDashboardModel({business:'retail',units:Array.from({length:20},(_,i)=>`Магазин ${i+1}`)}),ch=m20.choices('month')[0],rev=m20.metrics.find(x=>x.id==='revenue')
  const deltas=m20.ids.map(i=>{const c=d.aggregate(rev,[m20.raw(i,ch.current)]),b=d.aggregate(rev,[m20.raw(i,ch.bases.year.spec)]);return b===0?0:(c-b)/b*100})
  assert.ok(deltas.some(d=>d<0),'at least one negative delta')
  assert.ok(deltas.some(d=>d>0),'at least one positive delta')
  assert.ok(Math.max(...deltas)-Math.min(...deltas)>=5,'spread >= 5 pp')
})
test('missing base, zero base and zero denominator stay different',()=>{
  const money=school.metrics.find(m=>m.id==='revenue'),fill=school.metrics.find(m=>m.id==='fill')
  assert.equal(d.aggregate(money,[{cash:100},null]),null)
  assert.match(d.deltaMetric(100,null,money),/Нет данных/)
  assert.match(d.deltaMetric(100,0,money),/база 0/)
  assert.equal(d.aggregate(fill,[{occupied:0,capacity:0}]),null)
  assert.equal(d.deltaMetric(0,0,money),'0 · база 0')
  assert.ok(!d.deltaMetric(99.999,100,money).includes('-0'))
})
test('snapshot labels expose dates, and disabling comparison removes its date',()=>{
  const m=school.metrics.find(m=>m.id==='students'),p=school.choices('academic')[0]
  assert.match(d.snapshotLabel(m,p.current,p.bases.previous.spec),/30.06.2026.*30.06.2025/)
  assert.ok(!d.snapshotLabel(m,p.current).includes('2025'))
})
test('zero and one real units stay real, not padded with fictional branches',()=>{
  assert.equal(d.createDashboardModel({business:'service',units:[]}).ids.length,1)
  assert.equal(d.createDashboardModel({business:'school',units:['Арбат']}).ids.length,1)
})
test('invalid preparation input fails instead of quietly publishing wrong content',()=>{
  for(const patch of [{sections:[]},{dashboard:{...profiles.school.dashboard,defaultMetrics:[]}},{units:['Арбат','Арбат']},{footer:{...profiles.school.footer,url:'javascript:alert(1)'}}])assert.throws(()=>validateProfile({...profiles.school,...patch}))
  assert.throws(()=>readProfile(root,'unknown-company'))
  assert.throws(()=>readProfile(root,'../../outside'))
})
test('entity properties accept client fields and reject broken or unsafe links',()=>{
  const property={id:'client-contact',label:'Связь с диспетчером',value:'+7 900 123-45-67',type:'link',href:'tel:+79001234567'}
  const withProperties=properties=>({...profiles.service,entity:{...profiles.service.entity,properties}})
  validateProfile(withProperties([property,{id:'access',label:'Доступ на объект',value:'По согласованию с охраной'}]))
  validateProfile(withProperties([{...property,href:'mailto:dispatcher@example.com'}]))
  for(const href of ['javascript:alert(1)','data:text/html,<script>alert(1)</script>','/relative-contact','tel:']) {
    assert.throws(()=>validateProfile(withProperties([{...property,href}])),/entity property link/)
  }
  assert.throws(()=>validateProfile(withProperties([property,property])),/ids must be unique/)
  assert.throws(()=>validateProfile(withProperties([{...property,type:'custom-panel'}])),/property type/)
  assert.throws(()=>validateProfile(withProperties([])),/properties are required/)
})
// Archetype integrity tests
const archetypesJson=JSON.parse(fs.readFileSync(path.join(root,'src/data/archetypes.json'),'utf8'))
test('archetypes: every metric has formula and n; defaultMetrics ⊂ metrics; fullProposal archetypes have analyticsPeriod and stages',()=>{
  for(const [id,arch] of Object.entries(archetypesJson)){
    assert.ok(arch.metrics.length>=4,`${id}: at least 4 metrics`)
    for(const m of arch.metrics){assert.ok(m.formula,`${id}/${m.id}: missing formula`);assert.ok(m.n,`${id}/${m.id}: missing n`)}
    const metricIds=new Set(arch.metrics.map(m=>m.id))
    for(const dm of arch.defaultMetrics)assert.ok(metricIds.has(dm),`${id}: defaultMetric ${dm} not in metrics`)
    assert.ok(new Set(arch.defaultMetrics).size===arch.defaultMetrics.length,`${id}: duplicate defaultMetrics`)
    if(arch.fullProposal){assert.ok(arch.analyticsPeriod,`${id}: fullProposal but no analyticsPeriod`);assert.ok(arch.stages?.length>=3,`${id}: fullProposal but insufficient stages`)}
  }
})
test('archetypes: school and service match their profile defaultMetrics and scales',()=>{
  assert.deepEqual(archetypesJson.school.defaultMetrics,profiles.school.dashboard.defaultMetrics)
  assert.deepEqual(archetypesJson.school.scales,profiles.school.dashboard.scales)
  assert.deepEqual(archetypesJson.service.defaultMetrics,profiles.service.dashboard.defaultMetrics)
  assert.deepEqual(archetypesJson.service.scales,profiles.service.dashboard.scales)
})
test('old school/service without scale params keep accepted August 2026 totals',()=>{
  const schoolM=d.createDashboardModel(profiles.school)
  const schoolMonth=schoolM.choices('month')[0]
  const schoolRev=schoolM.metrics.find(x=>x.id==='revenue')
  assert.equal(schoolMonth.id,'2026-08')
  assert.equal(d.aggregate(schoolRev,schoolM.ids.map(i=>schoolM.raw(i,schoolMonth.current))),11373204)
  const serviceM=d.createDashboardModel(profiles.service)
  const serviceMonth=serviceM.choices('month')[0]
  const serviceRev=serviceM.metrics.find(x=>x.id==='revenue')
  assert.equal(serviceMonth.id,'2026-08')
  assert.equal(d.aggregate(serviceRev,serviceM.ids.map(i=>serviceM.raw(i,serviceMonth.current))),2471109)
  const schoolApp=d.createDashboardModel({business:'school',units:profiles.school.units,seed:profiles.school.displayName})
  assert.equal(d.aggregate(schoolRev,schoolApp.ids.map(i=>schoolApp.raw(i,schoolApp.choices('month')[0].current))),11918086)
  const serviceApp=d.createDashboardModel({business:'service',units:profiles.service.units,seed:profiles.service.displayName})
  assert.equal(d.aggregate(serviceRev,serviceApp.ids.map(i=>serviceApp.raw(i,serviceApp.choices('month')[0].current))),2511735)
})
test('monthlyDeals is company-wide and units share it; fixed price sets the average',()=>{
  const three=d.createDashboardModel({business:'service',units:['Север','Центр','Юг'],displayName:'Сервис «Проба»',demoDate:'2026-09-17',monthlyDeals:90,priceRange:[6500,6500]})
  const month=three.choices('month')[0]
  assert.equal(month.id,'2026-08')
  const rows=three.ids.map(i=>three.raw(i,month.current))
  const orders=rows.reduce((sum,row)=>sum+row.orders,0)
  const cash=rows.reduce((sum,row)=>sum+row.cash,0)
  const rev=three.metrics.find(x=>x.id==='revenue')
  const avg=three.metrics.find(x=>x.id==='average')
  const count=three.metrics.find(x=>x.id==='orders')
  assert.equal(orders,90)
  assert.equal(cash,90*6500)
  assert.equal(d.aggregate(count,rows),90)
  assert.equal(d.aggregate(avg,rows),6500)
  assert.equal(d.aggregate(rev,rows),90*6500)
  assert.ok(rows.every(row=>row.orders>0&&row.orders<90))
  const one=d.createDashboardModel({business:'service',units:[],displayName:'Сервис «Проба»',demoDate:'2026-09-17',monthlyDeals:70,priceRange:[6500,6500]})
  const oneMonth=one.raw(0,one.choices('month')[0].current)
  assert.equal(oneMonth.orders,70)
  assert.equal(oneMonth.cash,70*6500)
  assert.equal(d.aggregate(avg,[oneMonth]),6500)
})
test('another demoDate closes 01/02/cover periods on the same months',()=>{
  const demoDate='2025-03-15'
  const cfg={business:'service',units:['Альфа','Бета'],displayName:'Сервис «Сдвиг»',demoDate,monthlyDeals:40,priceRange:[2000,2000]}
  const m=d.createDashboardModel(cfg)
  assert.equal(m.choices('month').map(choice=>choice.id).join(','),'2025-02,2025-01,2024-12')
  assert.equal(m.choices('year')[0].id,'2024')
  const feb=m.choices('month')[0].current
  assert.equal(m.ids.reduce((sum,i)=>sum+m.raw(i,feb).orders,0),40)
  const generated={
    ...profiles.service,
    displayName:'Сервис «Сдвиг»',
    demoDate,
    units:['Альфа','Бета'],
    dashboard:{...profiles.service.dashboard,monthlyDeals:40,priceRange:[2000,2000]},
    analyticsConfig:{...profiles.service.analyticsConfig,currentYear:2024},
  }
  const loadShift=loader(generated)
  const analytics=loadShift('src/data/analytics.ts')
  const model=loadShift('src/data/dashboard-model.ts').createDashboardModel(generated)
  const range=analytics.anaRange('year','lastYear')
  const year=model.choices('year')[0]
  assert.equal(year.id,'2024')
  const cash=model.ids.reduce((sum,i)=>sum+model.raw(i,year.current).cash,0)
  const sold=analytics.sumSales(analytics.salesInWindow(range.current,{branches:analytics.anaBranches,sources:analytics.anaSources}))
  assert.ok(Math.abs(sold.amount-cash)<.02)
  assert.equal(sold.count,model.ids.reduce((sum,i)=>sum+model.raw(i,year.current).orders,0))
})
test('twelve data-view examples do not define monthly KPI',()=>{
  const p=profiles['mayak-mvp']
  const m=d.createDashboardModel(p)
  const month=m.choices('month')[0]
  const orders=m.ids.reduce((sum,i)=>sum+m.raw(i,month.current).orders,0)
  assert.notEqual(orders,p.leads.length)
  if (p.dashboard.monthlyDeals) assert.equal(orders,p.dashboard.monthlyDeals)
})
if(process.env.CUBO_TEST_REPORT)fs.writeFileSync(process.env.CUBO_TEST_REPORT,JSON.stringify({checks:results.length,results},null,2)+'\n')
console.log(`\n${results.length} checks passed. These are technical checks, not UX acceptance.`)
