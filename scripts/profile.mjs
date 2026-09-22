import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const archetypesPath = fileURLToPath(new URL('../src/data/archetypes.json', import.meta.url))
const archetypes = JSON.parse(fs.readFileSync(archetypesPath, 'utf8'))

/**
 * Autonomous SVG: документ без скриптов, внешних стилей и внешних ресурсов.
 * `fail` — локальный обработчик ошибки вызывающей стороны (summary или profile).
 */
export function assertAutonomousSvg(text, name, fail) {
  if (!/<svg[\s>]/i.test(text)) fail(`${name} must be a valid SVG document`)
  // on*-атрибуты — исполняемый код, им место в том же запрете, что и script.
  if (/<script[\s>]/i.test(text) || /<\?xml-stylesheet/i.test(text) || /@import/i.test(text) || /\son[a-z]+\s*=/i.test(text)) {
    fail(`${name} SVG must be autonomous: no scripts, stylesheets or imports`)
  }
  // Внешний url(): разрешены только локальные якоря #id и data:. Кавычка в
  // группе обязана согласоваться с содержимым — иначе бэктрекинг регулярки
  // пропускал кавычку в url('#g') и помечал локальную ссылку как внешнюю.
  const urlRefs = [...text.matchAll(/url\s*\(\s*(['"]?)([^)'"]*)\1\s*\)/gi)]
  const urlCount = (text.match(/url\s*\(/gi) ?? []).length
  const external = urlRefs.some(([, , ref]) => {
    const value = ref.trim()
    return !value.startsWith('#') && !value.startsWith('data:')
  })
  if (external || urlRefs.length !== urlCount) {
    fail(`${name} SVG must be autonomous: no external resources`)
  }
  // Прямые внешние ссылки: href/xlink:href/src с кавычкой, не якорь и не data:.
  if (/\b(?:href|xlink:href|src)\s*=\s*(['"])(?!#|data:)/i.test(text)) {
    fail(`${name} SVG must be autonomous: no external resources`)
  }
}

/** Validate preparation input before embedding it into a customer-facing file. */
export function validateProfile(p) {
  const fail = message => { throw new Error(`Invalid proposal profile: ${message}`) }
  const text = (v, name) => { if (typeof v !== 'string' || !v.trim()) fail(`${name} must be non-empty text`) }
  for (const key of ['id','name','displayName','initials','staffInitials','unitSingular','unitPlural']) text(p?.[key],key)

  const archetype = archetypes[p.business]
  if (!archetype) fail(`unknown business "${p.business}"`)
  if (!archetype.fullProposal) fail(`${p.business}: только стенд, вне объёма v1`)

  if (!Array.isArray(p.units) || new Set(p.units).size !== p.units.length) fail('units must have unique names')
  p.units.forEach(x=>text(x,'unit'))
  for (const key of ['brand','hero','footer','urls','dashboard','entity','entityScenario','dataView','selection','portal','portalCopy','analyticsConfig']) {
    if (!p[key] || typeof p[key] !== 'object') fail(`missing ${key}`)
  }
  if (!/^#[0-9a-fA-F]{6}$/.test(p.theme?.primary ?? '')) fail('theme.primary must be a 6-digit hex color')
  const checkEmbeddedLogo = (value, name) => {
    if (typeof value !== 'string' || !/^data:image\/(?:png|svg\+xml)(?:;|,)/i.test(value) || !value.includes(',')) {
      fail(`${name} must be an embedded PNG or SVG data URI; brand.name stays Cubo`)
    }
    if (/^data:image\/svg\+xml/i.test(value)) {
      const separator = value.indexOf(',')
      const meta = value.slice(0, separator)
      const payload = value.slice(separator + 1)
      let svg
      try {
        svg = /;base64/i.test(meta) ? Buffer.from(payload, 'base64').toString('utf8') : decodeURIComponent(payload)
      } catch {
        fail(`${name} must be an embedded PNG or SVG data URI; brand.name stays Cubo`)
      }
      assertAutonomousSvg(svg, name, fail)
    }
  }
  if (p.logo !== undefined) checkEmbeddedLogo(p.logo, 'logo')
  if (p.partner !== undefined) {
    text(p.partner?.name, 'partner.name')
    if (p.partner.logo !== undefined) checkEmbeddedLogo(p.partner.logo, 'partner.logo')
  }
  if (p.estimate !== undefined) {
    const estimate = p.estimate
    text(estimate?.title, 'estimate.title')
    text(estimate?.text, 'estimate.text')
    if (estimate.rate !== undefined && (!Number.isFinite(estimate.rate) || estimate.rate <= 0)) fail('estimate.rate must be a positive number')
    if (!Array.isArray(estimate.items) || !estimate.items.length) fail('estimate.items required')
    const itemIds = new Set()
    const money = (value, name) => { if (!Number.isFinite(value) || value <= 0) fail(`${name} must be a positive number`) }
    for (const item of estimate.items) {
      text(item?.id, 'estimate item id')
      text(item?.title, 'estimate item title')
      if (itemIds.has(item.id)) fail('estimate item ids must be unique')
      itemIds.add(item.id)
      money(item.from, `estimate ${item.id}.from`)
      if (item.to !== undefined) {
        money(item.to, `estimate ${item.id}.to`)
        if (item.to <= item.from) fail(`estimate ${item.id}: to must be greater than from`)
      }
      if (item.hoursFrom !== undefined) money(item.hoursFrom, `estimate ${item.id}.hoursFrom`)
      if (item.hoursTo !== undefined) {
        if (item.hoursFrom === undefined) fail(`estimate ${item.id}: hoursTo without hoursFrom`)
        money(item.hoursTo, `estimate ${item.id}.hoursTo`)
        if (item.hoursTo <= item.hoursFrom) fail(`estimate ${item.id}: hoursTo must be greater than hoursFrom`)
      }
    }
    if (estimate.total !== undefined) {
      money(estimate.total?.from, 'estimate.total.from')
      if (estimate.total.to !== undefined) {
        money(estimate.total.to, 'estimate.total.to')
        if (estimate.total.to <= estimate.total.from) fail('estimate.total: to must be greater than from')
      }
    }
  }
  for (const key of ['name','note','site']) text(p.brand[key],`brand.${key}`)
  for (const key of ['kicker','subtitle','cta']) text(p.hero[key],`hero.${key}`)
  if (!Array.isArray(p.hero.titleLines) || p.hero.titleLines.length!==2) fail('hero requires two title lines')
  if (!/^https:\/\//.test(p.footer.url)) fail('contact URL must use HTTPS')
  const ids=['overview','analytics','entity','dataview','selection','portal']
  if (!Array.isArray(p.sections) || p.sections.map(s=>s.id).join()!==ids.join()) fail('six existing sections in their agreed order are required')
  for (const s of p.sections) { for (const k of ['id','num','kicker','title','subtitle']) text(s[k],`section.${k}`); if(!Array.isArray(s.meta))fail('section.meta'); text(p.urls[s.id],`urls.${s.id}`) }

  const validMetrics = new Set(archetype.metrics.map(m => m.id))
  if (!p.dashboard.defaultMetrics?.length || p.dashboard.defaultMetrics.some(id=>!validMetrics.has(id)) || new Set(p.dashboard.defaultMetrics).size!==p.dashboard.defaultMetrics.length) fail('invalid default metrics')
  if (p.dashboard.scales?.join()!==archetype.scales.join()) fail('unsupported period presets')
  if (p.dashboard.monthlyDeals !== undefined && (!Number.isFinite(p.dashboard.monthlyDeals) || p.dashboard.monthlyDeals <= 0)) fail('invalid dashboard.monthlyDeals')
  if (p.dashboard.priceRange !== undefined && (!Array.isArray(p.dashboard.priceRange) || p.dashboard.priceRange.length !== 2 || p.dashboard.priceRange.some(value => !Number.isFinite(value) || value < 0))) fail('invalid dashboard.priceRange')

  if (!Array.isArray(p.entity.properties) || !p.entity.properties.length) fail('entity properties are required')
  const propertyIds = new Set()
  for (const property of p.entity.properties) {
    if (!property || typeof property !== 'object') fail('invalid entity property')
    for (const key of ['id', 'label', 'value']) text(property[key], `entity property ${key}`)
    if (propertyIds.has(property.id)) fail('entity property ids must be unique')
    propertyIds.add(property.id)
    const type = property.type ?? 'text'
    if (!['text', 'status', 'link'].includes(type)) fail('invalid entity property type')
    if (type === 'link') {
      text(property.href, 'entity property href')
      let url
      try { url = new URL(property.href) } catch { fail('invalid entity property link') }
      if (!['https:', 'tel:', 'mailto:'].includes(url.protocol) || !url.pathname) fail('invalid entity property link')
    } else if (property.href !== undefined) fail('only link properties can have href')
  }
  if (p.entityScenario.users?.length<3) fail('timeline needs the existing three demo roles')
  const users=new Set(p.entityScenario.users.map(u=>u.id)), events=new Set()
  for(const e of p.entityScenario.events??[]){if(events.has(e.id)||!users.has(e.authorId)||!['message','system','task'].includes(e.type)||!Number.isFinite(e.hours))fail('invalid timeline event');text(e.text,'timeline text');events.add(e.id)}
  const leads=new Set()
  for(const row of p.leads??[]){if(leads.has(row.id)||!p.stageNames[row.stage]||!Number.isFinite(row.amount)||row.amount<0)fail('invalid data-view row');if(row.branch&&!p.units.includes(row.branch))fail('data-view unit does not exist');leads.add(row.id)}
  const items=new Set()
  for(const item of p.selectionCourses??[]){if(items.has(item.id)||!Number.isFinite(item.likes)||item.likes<0||item.likes>item.sent)fail('invalid selection item');text(item.name,'selection item');items.add(item.id)}
  if(!items.size||p.selection.initialLiked.some(id=>!items.has(id)))fail('invalid initial selection')
  for(const child of p.portal.children??[]){text(child.name,'portal item');text(child.caption,'portal item caption')}
  if(!Array.isArray(p.portal.upcoming)||!p.portal.upcoming.length)fail('portal.upcoming must be a non-empty list')
  for(const item of p.portal.upcoming){text(item.label,'portal.upcoming.label');text(item.name,'portal.upcoming.name');text(item.caption,'portal.upcoming.caption')}

  const a=p.analyticsConfig
  if(!a.sources?.length||!a.directions?.length||!a.programs?.length)fail('analytics breakdowns are required')
  const ap = archetype.analyticsPeriod
  if(a.yearMonths!==ap.yearMonths||a.startMonth!==ap.startMonth||!Number.isInteger(a.currentYear))fail('invalid analytics period')

  return p
}
export function readProfile(root, mode) {
  const name=['development','production'].includes(mode)?'school':mode
  if(!/^[a-z0-9][a-z0-9-]{0,63}$/.test(name))throw new Error('Invalid profile name')
  const file=path.join(root,'src/data/profiles',`${name}.json`)
  if(!fs.existsSync(file))throw new Error(`Profile "${name}" does not exist; no fallback company will be built`)
  return {file,profile:validateProfile(JSON.parse(fs.readFileSync(file,'utf8')))}
}
