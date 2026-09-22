#!/usr/bin/env node
/**
 * Генератор профиля: сводка → profiles/<slug>.json.
 * По умолчанию строит готовый валидный демонстрационный профиль без слотов и
 * чужих данных. Режим --draft сохраняет прежний путь для ручного дополнения.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { validateProfile, assertAutonomousSvg } from './profile.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))
const archetypes = JSON.parse(fs.readFileSync(path.join(root, 'src/data/archetypes.json'), 'utf8'))
const estimateDefaults = JSON.parse(fs.readFileSync(path.join(root, 'src/data/estimate-defaults.json'), 'utf8'))
const PLACE = ' ЗАПОЛНИТЬ: '
const fail = message => { throw new Error(`Invalid summary: ${message}`) }
const isRandPartnerName = name => String(name ?? '').trim().toLowerCase() === 'rand'
const text = (value, name) => { if (typeof value !== 'string' || !value.trim()) fail(`${name} must be non-empty text`) }
const cap = value => value ? value.charAt(0).toUpperCase() + value.slice(1) : value
const lower = value => value ? value.charAt(0).toLowerCase() + value.slice(1) : value
const fmtMoney = value => new Intl.NumberFormat('ru-RU').format(Math.round(value)) + ' ₽'
const fmtDate = iso => iso.split('-').reverse().join('.')
const compactText = value => String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ')
function demoPhone(seed) {
  let hash = 2166136261
  for (const char of String(seed)) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0
  const digits = [9]
  let next = hash
  while (digits.length < 10) {
    next = (Math.imul(next, 1664525) + 1013904223) >>> 0
    digits.push(next % 10)
  }
  if (digits.slice(1, 3).join('') === '00') digits[1] = 1
  if (digits.slice(3, 6).join('') === '000') digits[3] = 4
  if (digits.slice(6, 8).join('') === '00') digits[6] = 2
  if (digits.slice(8, 10).join('') === '00') digits[8] = 3
  const number = digits.join('')
  return { display: `+7 ${number.slice(0, 3)} ${number.slice(3, 6)}-${number.slice(6, 8)}-${number.slice(8, 10)}`, tel: `+7${number}` }
}
// Первая «настоящая» буква/цифра: кавычки, скобки и № в начало инициалов не попадают.
const firstLetter = value => (String(value ?? '').match(/[0-9A-Za-zА-Яа-яЁё]/) ?? [''])[0]
const initials = name => String(name).split(/\s+/).map(firstLetter).filter(Boolean).join('').toUpperCase().slice(0, 2) || 'ДМ'
// Минимальная русская морфология для генератора (task-15). Фолбэк `${word}ы`
// давал «Площадкаы» и «поставкау»; таблицы неправильных форм — выше по коду,
// здесь — предсказуемые правила для незнакомых слов.
const TAKES_I = char => 'гкхжчшщц'.includes(char ?? '')
function pluralWord(word) {
  const w = String(word).trim()
  const stem = w.slice(0, -1)
  const last = w.at(-1)?.toLowerCase()
  if (last === 'а') return stem + (TAKES_I(stem.at(-1)?.toLowerCase()) ? 'и' : 'ы')
  if (last === 'я' || last === 'ь' || last === 'й') return stem + 'и'
  if (w.endsWith('ие')) return stem + 'я'
  if (last === 'о') return stem + 'а'
  if (last === 'е') return stem + 'я'
  return w + (TAKES_I(last) ? 'и' : 'ы')
}
function dativeWord(word) {
  const w = String(word).trim()
  const last = w.at(-1)?.toLowerCase()
  if (last === 'а' || last === 'я') return w.slice(0, -1) + 'е'
  if (last === 'ь') return w.slice(0, -1) + 'и'
  if (last === 'й' || last === 'о') return w.slice(0, -1) + 'у'
  if (last === 'е') return w.slice(0, -1) + 'ю'
  return w + 'у'
}
function genitiveWord(word) {
  const w = String(word).trim()
  const stem = w.slice(0, -1)
  const last = w.at(-1)?.toLowerCase()
  if (last === 'а') return stem + (TAKES_I(stem.at(-1)?.toLowerCase()) ? 'и' : 'ы')
  if (last === 'я' || last === 'ь' || last === 'й') return stem + 'и'
  return w + 'а'
}
// Фраза из нескольких слов («Заказ поставки») склоняется по первому слову —
// главному существительному; зависимое слово в родительном падеже не меняется.
// Склонение всей строки по последнему символу давало «заказ поставкиу».
function inflectHead(word, rule) {
  const parts = String(word).trim().split(/\s+/)
  return parts.length > 1 ? [rule(parts[0]), ...parts.slice(1)].join(' ') : rule(word)
}
const pluralNoun = word => inflectHead(word, pluralWord)
const dativeNoun = word => inflectHead(word, dativeWord)
const genitiveNoun = word => inflectHead(word, genitiveWord)
// Имя уже в кавычках не заворачиваем второй раз: «Снаб» → «Снаб», не ««Снаб»».
const quoteName = value => /[«»]/.test(value) ? value : `«${value}»`
// Дата должна не только совпадать с маской, но и существовать: 2026-13-40 — отказ.
const isRealDate = iso => {
  const date = new Date(`${iso}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === iso
}
const slot = (label, draft) => draft ? `[${PLACE}${label}]` : label

function hashSeed(str) {
  let hash = 0x811c9dc5
  for (let index = 0; index < str.length; index++) { hash ^= str.charCodeAt(index); hash = Math.imul(hash, 0x01000193) }
  return hash >>> 0
}
const unit01 = (seed, tag) => (hashSeed(`${seed}:${tag}`) % 10000) / 10000
export const STAGE_KEYS = ['new', 'trial', 'contract', 'paid']
export function lastCompletedMonth(demoDate) {
  const [year, month] = demoDate.split('-').map(Number)
  return month === 1 ? { y: year - 1, m: 12 } : { y: year, m: month - 1 }
}
export function lastCompletedCalendarYear(demoDate) {
  return Number(demoDate.slice(0, 4)) - 1
}
export function lastCompletedAcademicStart(demoDate) {
  const [year, month] = demoDate.split('-').map(Number)
  return month >= 7 ? year - 1 : year - 2
}
export function stageProgress(stageKey, pipeline) {
  const index = STAGE_KEYS.indexOf(stageKey)
  if (index < 0 || !Array.isArray(pipeline) || pipeline.length !== 4) throw new Error('stageProgress needs a known stage and 4 labels')
  const used = index + 1
  const total = pipeline.length
  const last = index === total - 1
  const label = pipeline[index]
  return { key: stageKey, index, used, total, last, label, text: `Этап ${used} из ${total}: ${label}`, tone: last ? 'ok' : 'info' }
}
function daysAgoIso(demoDate, days) {
  const date = new Date(`${demoDate}T12:00:00Z`)
  date.setUTCDate(date.getUTCDate() - days)
  return date.toISOString().slice(0, 10)
}
function daysFromIso(demoDate, days) {
  const date = new Date(`${demoDate}T12:00:00Z`)
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

function validateSummary(summary) {
  text(summary?.company?.name, 'company.name')
  text(summary?.company?.displayName, 'company.displayName')
  text(summary?.company?.slug, 'company.slug')
  if (!/^[a-z0-9][a-z0-9-]{0,63}$/.test(summary.company.slug)) fail('company.slug must match ^[a-z0-9][a-z0-9-]{0,63}$')
  if (!['school', 'service'].includes(summary.archetype)) fail('archetype must be school or service')
  if (summary.company.brand?.primary !== undefined && !/^#[0-9a-fA-F]{6}$/.test(summary.company.brand.primary)) fail('company.brand.primary must be #rrggbb')
  if (summary.company.brand?.logo !== undefined && summary.company.brand.logo !== null && typeof summary.company.brand.logo !== 'string') fail('company.brand.logo must be text, or omitted')
  if (summary.company.brand?.coverPlate !== undefined && summary.company.brand.coverPlate !== true) fail('company.brand.coverPlate must be true, or omitted')
  text(summary?.customer?.singular, 'customer.singular')
  text(summary?.customer?.entity, 'customer.entity')
  text(summary?.customer?.entityExample?.name, 'customer.entityExample.name')
  if (summary.customer.entityExample.subject !== undefined) text(summary.customer.entityExample.subject, 'customer.entityExample.subject')
  if (summary.customer.entityExample.fields !== undefined) {
    if (!Array.isArray(summary.customer.entityExample.fields) || summary.customer.entityExample.fields.length > 6) fail('customer.entityExample.fields: up to 6 items')
    const labels = new Set()
    for (const [index, field] of summary.customer.entityExample.fields.entries()) {
      text(field?.label, `customer.entityExample.fields[${index}].label`)
      text(field?.value, `customer.entityExample.fields[${index}].value`)
      if (labels.has(field.label)) fail('customer.entityExample.fields labels must be unique')
      labels.add(field.label)
    }
  }
  if (summary.customer.entityExample.dueDate !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(summary.customer.entityExample.dueDate)) fail('customer.entityExample.dueDate must be YYYY-MM-DD')
  if (summary.customer.entityExample.dueDate !== undefined && !isRealDate(summary.customer.entityExample.dueDate)) fail('customer.entityExample.dueDate must be a real date')
  if (summary.customer.examples !== undefined) {
    if (!Array.isArray(summary.customer.examples)) fail('customer.examples must be a list')
    summary.customer.examples.forEach(name => text(name, 'customer example'))
  }
  if (!Array.isArray(summary?.offer?.items) || !summary.offer.items.length) fail('offer.items required')
  summary.offer.items.forEach(item => text(item, 'offer item'))
  const resolvedSubject = summary.customer.entityExample.subject ?? summary.customer.entityExample.name
  if (summary.offer.items.some(item => compactText(item) === compactText(resolvedSubject))) {
    fail('customer.entityExample.subject must describe the work, not repeat an offer item')
  }
  const exampleTexts = [summary.customer.entityExample.name, summary.customer.entityExample.subject].filter(Boolean)
  for (const item of summary.offer.items.slice(1)) {
    if (exampleTexts.some(text => compactText(text).includes(compactText(item)))) {
      fail('entityExample must follow offer.items[0], not another catalog item')
    }
  }
  if (!Array.isArray(summary?.offer?.priceRange) || summary.offer.priceRange.length !== 2 || summary.offer.priceRange.some(value => !Number.isFinite(value) || value < 0)) fail('offer.priceRange[min,max]')
  if (summary.offer.priceRange[1] < summary.offer.priceRange[0]) fail('offer.priceRange: max must not be less than min')
  text(summary?.deal?.noun, 'deal.noun')
  if (!Array.isArray(summary?.deal?.pipeline) || summary.deal.pipeline.length !== 4) fail('deal.pipeline needs exactly 4 stages')
  summary.deal.pipeline.forEach(stage => text(stage, 'deal pipeline stage'))
  if (!/^\d{4}-\d{2}-\d{2}$/.test(summary?.time?.demoDate ?? '')) fail('time.demoDate must be YYYY-MM-DD')
  if (!isRealDate(summary.time.demoDate)) fail('time.demoDate must be a real date')
  if (!Number.isFinite(summary?.scale?.monthlyDeals) || summary.scale.monthlyDeals <= 0) fail('scale.monthlyDeals')
  if (!Array.isArray(summary?.units?.names)) fail('units.names list (possibly empty)')
  summary.units.names.forEach(unit => text(unit, 'unit name'))
  if (summary.units.kind !== undefined) text(summary.units.kind, 'units.kind')
  if (summary.customer.entityExample.unit !== undefined) {
    text(summary.customer.entityExample.unit, 'customer.entityExample.unit')
    if (!summary.units.names.includes(summary.customer.entityExample.unit)) fail('customer.entityExample.unit must be one of units.names')
  }
  if (!Array.isArray(summary?.assumptions)) fail('assumptions list required (может быть пустым)')
  // Джобы (task-22): необязательные; роли 1–4, на роль 1–3 истории «когда / хочу / чтобы».
  if (summary.jobs !== undefined) {
    text(summary.jobs?.main, 'jobs.main')
    if (!Array.isArray(summary.jobs.roles) || summary.jobs.roles.length < 1 || summary.jobs.roles.length > 4) fail('jobs.roles: 1–4 roles')
    const metricIds = new Set(archetypes[summary.archetype].metrics.map(metric => metric.id))
    for (const role of summary.jobs.roles) {
      text(role?.role, 'jobs.roles[].role')
      if (!Array.isArray(role.stories) || role.stories.length < 1 || role.stories.length > 3) fail(`jobs role «${role?.role}»: 1–3 stories`)
      for (const story of role.stories) {
        for (const key of ['when', 'want', 'so']) text(story?.[key], `jobs story ${key}`)
        if (story.metrics !== undefined) {
          if (!Array.isArray(story.metrics)) fail('jobs story metrics must be a list')
          story.metrics.forEach(metric => {
            text(metric, 'jobs story metric')
            if (!metricIds.has(metric)) fail(`jobs story metric «${metric}» is not in the ${summary.archetype} library`)
          })
        }
        if (story.screens !== undefined) {
          if (!Array.isArray(story.screens)) fail('jobs story screens must be a list')
          story.screens.forEach(screen => { if (!['01', '02', '03', '04', '05', '06'].includes(String(screen))) fail(`jobs story screen must be 01–06, got «${screen}»`) })
        }
        if (story.result !== undefined) text(story.result, 'jobs story result')
      }
    }
  }
  // Необязательные поля оболочки (task-21): интро, пара «партнёр × клиент», коммерческая оценка.
  if (summary.proposal?.intro !== undefined) {
    text(summary.proposal.intro, 'proposal.intro')
    if (summary.proposal.intro.includes('—')) fail('proposal.intro must not use an em dash')
  }
  if (summary.proposal?.partner !== undefined && summary.proposal.partner !== null) {
    text(summary.proposal.partner?.name, 'proposal.partner.name')
    if (isRandPartnerName(summary.proposal.partner.name) && summary.proposal.partner.logo) {
      fail('proposal.partner.logo is not used for RAND: omit the field, the template SVG is inlined')
    }
    if (summary.proposal.partner.logo !== undefined && summary.proposal.partner.logo !== null && typeof summary.proposal.partner.logo !== 'string') fail('proposal.partner.logo must be text, or omitted')
  }
  if (summary.proposal?.estimate !== undefined) {
    const estimate = summary.proposal.estimate
    if (!Array.isArray(estimate?.items) || !estimate.items.length) fail('proposal.estimate.items required')
    if (estimate.title !== undefined) text(estimate.title, 'proposal.estimate.title')
    if (estimate.text !== undefined) text(estimate.text, 'proposal.estimate.text')
    if (estimate.rate !== undefined && (!Number.isFinite(estimate.rate) || estimate.rate <= 0)) fail('proposal.estimate.rate must be a positive number')
    const positive = (value, name) => { if (!Number.isFinite(value) || value <= 0) fail(`${name} must be a positive number`) }
    const ids = new Set()
    for (const item of estimate.items) {
      text(item?.id, 'proposal.estimate item id')
      text(item?.title, 'proposal.estimate item title')
      if (ids.has(item.id)) fail('proposal.estimate item ids must be unique')
      ids.add(item.id)
      positive(item.from, `proposal.estimate ${item.id}.from`)
      if (item.to !== undefined) {
        positive(item.to, `proposal.estimate ${item.id}.to`)
        if (item.to <= item.from) fail(`proposal.estimate ${item.id}: to must be greater than from`)
      }
      if (item.hoursFrom !== undefined) positive(item.hoursFrom, `proposal.estimate ${item.id}.hoursFrom`)
      if (item.hoursTo !== undefined) {
        if (item.hoursFrom === undefined) fail(`proposal.estimate ${item.id}: hoursTo without hoursFrom`)
        positive(item.hoursTo, `proposal.estimate ${item.id}.hoursTo`)
        if (item.hoursTo <= item.hoursFrom) fail(`proposal.estimate ${item.id}: hoursTo must be greater than hoursFrom`)
      }
    }
    // Смета целиком — только внутри proposal.estimate; отдельное proposal.total не читается.
    const estimateTotal = estimate.total
    if (estimateTotal !== undefined) {
      positive(estimateTotal?.from, 'proposal.estimate.total.from')
      if (estimateTotal.to !== undefined) {
        positive(estimateTotal.to, 'proposal.estimate.total.to')
        if (estimateTotal.to <= estimateTotal.from) fail('proposal.estimate.total: to must be greater than from')
      }
    }
    // Суммы от часов задаёт один источник: либо rate + часы, либо готовые суммы; противоречий быть не должно.
    if (estimate.rate !== undefined) {
      for (const item of estimate.items) {
        if (item.hoursFrom !== undefined && item.hoursFrom * estimate.rate !== item.from) fail(`proposal.estimate ${item.id}: from ≠ hoursFrom × rate`)
        if (item.hoursTo !== undefined && item.hoursTo * estimate.rate !== item.to) fail(`proposal.estimate ${item.id}: to ≠ hoursTo × rate`)
      }
    }
  }
}

function pluralUnits(word) {
  const forms = { 'Подразделение': 'Подразделения', 'Филиал': 'Филиалы', 'Точка': 'Точки', 'Офис': 'Офисы', 'Пост': 'Посты', 'Бригада': 'Бригады', 'Клиника': 'Клиники', 'Мастерская': 'Мастерские' }
  return forms[word] ?? pluralNoun(word)
}
function manyNouns(word) {
  const forms = { 'Заказ': 'Заказы', 'Платёж': 'Платежи', 'Чек': 'Чеки', 'Сделка': 'Сделки', 'Заявка': 'Заявки', 'Заказ-наряд': 'Заказ-наряды' }
  return forms[word] ?? pluralNoun(word)
}
function lexicon(summary) {
  return {
    slug: summary.company.slug,
    name: summary.company.name,
    activity: summary.company.activity ?? '',
    unitSingular: summary.units.names.length ? summary.units.kind ?? 'Подразделение' : 'Компания',
    unitPlural: summary.units.names.length ? pluralUnits(summary.units.kind ?? 'Подразделение') : 'Компания',
    customer: lower(summary.customer.singular),
    entity: lower(summary.customer.entity),
    itemNoun: lower(summary.offer.itemNoun ?? 'предложение'),
    dealNoun: lower(summary.deal.noun),
    dealMany: manyNouns(summary.deal.noun),
  }
}
function characterData(summary, draft) {
  const source = summary.characters ?? {}
  return {
    staff: { name: source.staff?.name ?? (draft ? slot('имя сотрудника', true) : 'Специалист команды'), role: source.staff?.role ?? (draft ? slot('роль сотрудника', true) : 'Менеджер') },
    colleague: { name: source.colleague?.name ?? (draft ? slot('имя коллеги', true) : 'Коллега команды'), role: source.colleague?.role ?? (draft ? slot('роль коллеги', true) : 'Исполнитель') },
    client: { name: source.client?.name ?? (draft ? slot('имя клиента', true) : 'Клиент демо'), role: source.client?.role ?? lower(summary.customer.singular) },
  }
}

function buildLeads(summary, lex, draft) {
  const stageKeys = ['new', 'trial', 'contract', 'paid']
  const shares = [0.18, 0.26, 0.38, 0.55, 0.68, 0.74, 0.8, 0.86, 0.9, 0.94, 0.97, 1]
  const rotation = Math.floor(unit01(lex.slug, 'leads') * shares.length)
  return shares.map((share, index) => {
    const item = summary.offer.items[index % summary.offer.items.length]
    const stage = stageKeys[(index + rotation) % stageKeys.length]
    const nextStage = summary.deal.pipeline[stageKeys.indexOf(stage) + 1]
    const customer = summary.customer.examples?.[index] ?? (draft ? slot(`имя ${genitiveNoun(lex.customer)} ${index + 1}`, true) : `Демо-клиент ${String(index + 1).padStart(2, '0')}`)
    return {
      id: `l${index + 1}`,
      child: customer,
      initials: initials(customer),
      direction: item,
      branch: summary.units.names.length ? summary.units.names[(index + rotation) % summary.units.names.length] : '',
      stage,
      amount: Math.min(summary.offer.priceRange[1], Math.max(summary.offer.priceRange[0], Math.round((summary.offer.priceRange[0] + (summary.offer.priceRange[1] - summary.offer.priceRange[0]) * share) / 100) * 100)),
      next: nextStage ? `Следующий этап: ${nextStage}` : `Статус: ${summary.deal.pipeline[3]}`,
      created: daysAgoIso(summary.time.demoDate, 12 - index),
    }
  })
}
function entityScenario(summary, lex, characters, draft, progress, focusEntity) {
  const item = summary.offer.items[0]
  const event = label => slot(label, draft)
  const closed = progress.last
  return {
    users: [
      { id: 'u1', name: characters.client.name, role: lex.customer },
      { id: 'u2', name: characters.colleague.name, role: characters.colleague.role },
      { id: 'u3', name: characters.staff.name, role: characters.staff.role },
    ],
    events: [
      { id: 'e1', type: 'system', text: `${/[ая]$/i.test(lex.dealNoun) ? 'Создана' : /[ое]$/i.test(lex.dealNoun) ? 'Создано' : 'Создан'} ${lex.dealNoun}: ${item}`, hours: 96, authorId: 'u3', done: closed },
      { id: 'e2', type: 'message', text: event(`Подготовили результат: «${item}»`), hours: 70, authorId: 'u2', done: closed },
      // Реплика клиента — точка входа джоба экрана 03 (result истории), иначе типовое подтверждение.
      { id: 'e3', type: 'message', text: focusEntity ?? event(closed ? `Клиент подтвердил этап «${progress.label}»` : `Согласуем следующий шаг по ${dativeNoun(lex.entity)}`), hours: 48, authorId: 'u1', done: closed },
      { id: 'e4', type: 'system', text: event(closed ? `Статус: ${progress.label}` : `Предложение отправлено ${dativeNoun(lex.customer)}`), hours: 30, authorId: 'u3', done: closed },
      { id: 't1', type: 'task', text: event('Подготовить предложение'), hours: 26, authorId: 'u3', done: true },
      { id: 'e5', type: 'message', text: event(closed ? `Этап ${progress.used} из ${progress.total} зафиксирован` : 'Подтвердим время следующего шага'), hours: 8, authorId: 'u3', done: closed },
      { id: 't2', type: 'task', text: event(closed ? `Закрыть этап «${progress.label}»` : 'Согласовать дату'), hours: 3, authorId: 'u3', done: closed },
    ],
  }
}
function sections(summary, lex) {
  return [
    ['overview', '01', 'Обзор работы', 'Всё главное на одном экране', `Показатели ${summary.units.names.length ? 'подразделений' : 'компании'} и динамика обращений.`, ['Периоды', 'Сравнение', 'Настройка показателей']],
    ['analytics', '02', 'Аналитика', 'От общей картины к деталям', 'Обращения по направлениям, источникам и типам.', ['Графики', 'Разрезы', 'Сравнение периодов']],
    ['entity', '03', 'Карточка клиента', 'История и свойства в одной карточке', 'Переписка, задачи и детали рядом.', ['История', 'Свойства', 'Задачи']],
    ['dataview', '04', 'Данные', 'Один список в трёх видах', `${cap(lex.dealMany)}: стадии, таблица и карточки.`, ['Пайплайн', 'Таблица', 'Карточки']],
    ['selection', '05', 'Подборки', 'Клиенту ровно то, что нужно', 'Персональная подборка предложений.', ['Ссылка', 'Реакции', 'Заявки']],
    ['portal', '06', 'Кабинет клиента', 'Клиент видит всё сам', 'Статус, следующий шаг и информация об оплате.', ['Вход', cap(lex.dealMany), 'Оплаты']],
  ].map(([id, num, kicker, title, subtitle, meta]) => ({ id, num, kicker, title, subtitle, meta }))
}
function entityProperties(summary, lex, characters, subject, dueDate, total, prepay, draft, phone) {
  const placeholder = label => slot(label, draft)
  const unitValue = summary.customer.entityExample.unit ?? (summary.units.names.length === 1 ? summary.units.names[0] : undefined)
  const details = [
    ...(unitValue ? [{ id: 'unit', label: lex.unitSingular, value: unitValue }] : []),
    ...(summary.customer.entityExample.fields ?? []).map((field, index) => ({ id: `detail-${index + 1}`, label: field.label, value: field.value })),
  ]
  return [
    { id: 'status', label: 'Статус', value: summary.deal.pipeline[3], type: 'status' },
    { id: 'customer', label: 'Клиент', value: characters.client.name },
    { id: 'service', label: cap(lex.itemNoun), value: summary.offer.items[0] },
    { id: 'subject', label: 'Описание', value: draft ? placeholder('описание') : subject },
    ...details,
    { id: 'owner', label: 'Ответственный', value: characters.staff.name },
    { id: 'due', label: 'Срок', value: draft ? placeholder('срок') : fmtDate(dueDate) },
    { id: 'contact', label: 'Контакт', value: characters.client.name },
    { id: 'phone', label: 'Телефон', value: draft ? placeholder('телефон') : phone.display, type: 'link', href: `tel:${phone.tel}` },
    { id: 'cost', label: 'Стоимость', value: fmtMoney(total) },
    { id: 'prepay', label: 'Предоплата', value: fmtMoney(prepay) },
  ]
}

const LOGO_MAX_BYTES = 400 * 1024
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])

function assertInside(summaryDir, filePath, name) {
  const relative = path.relative(summaryDir, filePath)
  if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) fail(`${name} must stay relative to the summary file`)
}

export function embedClientLogo(value, summaryDir, name = 'company.brand.logo') {
  if (value == null) return undefined
  if (typeof value !== 'string') fail(`${name} must be text, or omitted`)
  const trimmed = value.trim()
  if (!trimmed) return undefined
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed) || trimmed.startsWith('//')) {
    fail(`${name} must be a local PNG or SVG path relative to the summary, not a URL`)
  }
  if (path.isAbsolute(trimmed) || /^[a-zA-Z]:[\\/]/.test(trimmed) || trimmed.startsWith('\\\\')) {
    fail(`${name} must be a local PNG or SVG path relative to the summary, not an absolute path`)
  }
  const normalized = trimmed.replace(/\\/g, '/')
  if (normalized.split('/').includes('..')) {
    fail(`${name} must stay relative to the summary file`)
  }
  const filePath = path.resolve(summaryDir, normalized)
  assertInside(summaryDir, filePath, name)
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) fail(`${name} file not found: ${normalized}`)
  const bytes = fs.statSync(filePath).size
  if (bytes === 0) fail(`${name} file is empty`)
  if (bytes > LOGO_MAX_BYTES) fail(`${name} must be at most ${LOGO_MAX_BYTES} bytes`)
  const ext = path.extname(filePath).toLowerCase()
  const data = fs.readFileSync(filePath)
  if (ext === '.png') {
    if (data.length < 8 || !data.subarray(0, 8).equals(PNG_SIGNATURE)) fail(`${name} PNG is not a valid PNG file`)
    return `data:image/png;base64,${data.toString('base64')}`
  }
  if (ext === '.svg') {
    const text = data.toString('utf8')
    assertAutonomousSvg(text, name, fail)
    return `data:image/svg+xml;base64,${data.toString('base64')}`
  }
  fail(`${name} must be a local .png or .svg file`)
}

/**
 * Джобы → профиль (task-22). Метрики — только из библиотеки архетипа (validateSummary
 * отклоняет неизвестные до записи), выбор детерминирован: метрики джобов идут первыми
 * в порядке упоминания, остальные дефолтные — в исходном порядке архетипа.
 * `result` истории — наблюдаемый результат: экран 03 → реплика клиента в истории
 * карточки сущности, экран 06 → блок «Ближайшие» портала. Первая история на слот выигрывает.
 */
function jobsEffect(summary, arch) {
  const jobs = summary.jobs
  if (!jobs) return { defaultMetrics: [...arch.defaultMetrics] }
  const supported = new Set(arch.metrics.map(metric => metric.id))
  const wanted = []
  let focusEntity, focusPortal
  for (const role of jobs.roles) {
    for (const story of role.stories) {
      for (const metric of story.metrics ?? []) {
        if (supported.has(metric) && !wanted.includes(metric)) wanted.push(metric)
      }
      const result = typeof story.result === 'string' && story.result.trim() ? story.result.trim() : undefined
      if (!result) continue
      const targets = (story.screens ?? []).map(String).filter(screen => screen === '03' || screen === '06')
      if (targets.length === 0) {
        console.warn(`jobs story «${story.when}»: result не выводится — укажите экран 03 и/или 06`)
        continue
      }
      for (const screen of targets) {
        if (screen === '03') {
          if (focusEntity === undefined) focusEntity = result
          else console.warn(`jobs story «${story.when}»: result для экрана 03 уже занят — пропущен`)
        } else {
          if (focusPortal === undefined) focusPortal = result
          else console.warn(`jobs story «${story.when}»: result для экрана 06 уже занят — пропущен`)
        }
      }
    }
  }
  const defaultMetrics = [...arch.defaultMetrics]
  for (const metric of wanted) {
    if (!defaultMetrics.includes(metric)) defaultMetrics.push(metric)
  }
  const ordered = [
    ...wanted.filter(metric => defaultMetrics.includes(metric)),
    ...arch.defaultMetrics.filter(metric => defaultMetrics.includes(metric) && !wanted.includes(metric)),
  ]
  return { defaultMetrics: ordered, focusEntity, focusPortal }
}

function buildProfile(summary, draft = false, summaryDir = process.cwd()) {
  const lex = lexicon(summary)
  const arch = archetypes[summary.archetype]
  const characters = characterData(summary, draft)
  const item = summary.offer.items[0]
  const firstShare = 0.12
  // Округление и минимум 100 ₽ не должны выталкивать сумму из объявленного диапазона (task-15).
  const inPriceRange = value => Math.min(summary.offer.priceRange[1], Math.max(summary.offer.priceRange[0], value))
  const total = inPriceRange(Math.max(100, Math.round((summary.offer.priceRange[0] + (summary.offer.priceRange[1] - summary.offer.priceRange[0]) * firstShare) / 100) * 100))
  const prepay = Math.round(total * 0.3)
  const rest = total - prepay
  const subject = summary.customer.entityExample.subject ?? summary.customer.entityExample.name
  const dueDate = summary.customer.entityExample.dueDate ?? daysFromIso(summary.time.demoDate, 7)
  const progress = stageProgress('paid', summary.deal.pipeline)
  const jobsFx = jobsEffect(summary, arch)
  const phone = demoPhone(lex.slug)
  const unitLine = summary.units.names.length
    ? `Подразделения: ${summary.units.names.length}. Учёт ведётся раздельно.`
    : 'Подразделения не указаны. Показатели считаются по всей компании.'
  const logo = embedClientLogo(summary.company.brand?.logo, summaryDir)
  const proposal = summary.proposal ?? {}
  const partnerLogo = proposal.partner && !isRandPartnerName(proposal.partner.name)
    ? embedClientLogo(proposal.partner.logo, summaryDir, 'proposal.partner.logo')
    : undefined
  // Оценка менеджера заменяет базу целиком; без неё — принятая база из estimate-defaults.
  const estimate = proposal.estimate
    ? {
        title: proposal.estimate.title ?? estimateDefaults.title,
        text: proposal.estimate.text ?? estimateDefaults.text,
        ...(proposal.estimate.rate !== undefined ? { rate: proposal.estimate.rate } : {}),
        items: proposal.estimate.items.map(item => ({ ...item })),
        ...(proposal.estimate.total ? { total: { ...proposal.estimate.total } } : {}),
      }
    : { ...estimateDefaults, items: estimateDefaults.items.map(item => ({ ...item })) }
  const profile = {
    id: lex.slug,
    name: lex.name,
    displayName: summary.company.displayName,
    initials: firstLetter(lex.name) || 'К',
    staffInitials: initials(characters.staff.name),
    staffName: characters.staff.name,
    staffRole: characters.staff.role,
    business: summary.archetype,
    units: [...summary.units.names],
    unitSingular: lex.unitSingular,
    unitPlural: lex.unitPlural,
    demoDate: summary.time.demoDate,
    theme: { primary: summary.company.brand?.primary ?? '#4f46e5' },
    brand: { name: 'Cubo', note: `Предложение для ${quoteName(lex.name)}`, site: 'cuboapp.ru' },
    ...(logo ? { logo } : {}),
    ...(summary.company.brand?.coverPlate ? { logoCover: 'plate' } : {}),
    ...(proposal.partner ? { partner: { name: proposal.partner.name, ...(partnerLogo ? { logo: partnerLogo } : {}) } } : {}),
    estimate,
    hero: { kicker: `Для ${quoteName(lex.name)}`, titleLines: draft ? [slot('строка 1 героя', true), slot('строка 2 героя', true)] : ['Ваши процессы.', 'Возможности Cubo.'], subtitle: 'Показатели команды, обращения и кабинет клиента на примерах вашей отрасли.', cta: 'Посмотреть примеры', ...(proposal.intro ? { intro: proposal.intro } : {}) },
    sections: sections(summary, lex),
    footer: { title: 'Обсудим ваши процессы?', text: proposal.partner?.name?.trim() ? `Это пример от ${proposal.partner.name.trim()}. Состав данных и сценарии уточняются вместе с вашей командой.` : 'Состав данных и сценарии уточняются вместе с вашей командой.', cta: 'Обсудить внедрение', url: 'https://cuboapp.ru', note: `Персональное демо для ${quoteName(lex.name)}`, disclaimer: 'Компания и данные вымышлены. Действия в примерах не отправляются и не сохраняются после перезагрузки.' },
    urls: { overview: `${lex.slug}.cubo.app/overview`, analytics: `${lex.slug}.cubo.app/analytics`, entity: `${lex.slug}.cubo.app/orders/demo`, dataview: `${lex.slug}.cubo.app/orders`, selection: `${lex.slug}.cubo.app/selections/demo`, selectionMass: `${lex.slug}.cubo.app/selections/services`, portal: `${lex.slug}.cubo.app/portal` },
    navigation: summary.archetype === 'school' ? ['Показатели', 'Ученики', 'Заявки', 'Оплаты'] : ['Показатели', 'Заказы', 'Клиенты', 'Оплаты'],
    stageNames: { new: summary.deal.pipeline[0], trial: summary.deal.pipeline[1], contract: summary.deal.pipeline[2], paid: summary.deal.pipeline[3] },
    dashboard: { defaultMetrics: [...jobsFx.defaultMetrics], scales: [...arch.scales], monthlyDeals: summary.scale.monthlyDeals, priceRange: [...summary.offer.priceRange], assumptions: [unitLine, 'Выручка в демо основана на закрытых обращениях.', ...summary.assumptions].join(' ') },
    dataView: { title: `${cap(lex.dealMany)} в работе`, nameLabel: cap(lex.customer), directionLabel: cap(lex.itemNoun), amountSuffix: '₽', nav: ['Новые', cap(lex.dealMany), 'Клиенты'], nextLabel: 'Следующий шаг' },
    leads: buildLeads(summary, lex, draft),
    entity: { name: summary.customer.entityExample.name, initials: firstLetter(summary.customer.entityExample.name.replace(/.*[·] */, '').trim()) || firstLetter(lex.name) || 'К', actions: { call: draft ? slot('телефон для звонка', true) : phone.tel, task: draft ? slot('следующий шаг', true) : (progress.last ? `Статус: ${progress.label}` : 'Согласовать следующий шаг') }, properties: entityProperties(summary, lex, characters, subject, dueDate, total, prepay, draft, phone) },
    entityScenario: entityScenario(summary, lex, characters, draft, progress, jobsFx.focusEntity),
  }
  // Первая запись — тот же пример, что в карточке, подборке и кабинете.
  Object.assign(profile.leads[0], { child: characters.client.name, initials: initials(characters.client.name), direction: item, stage: progress.key, amount: total, next: progress.last ? `Статус: ${progress.label}` : 'Согласовать следующий шаг' })
  const courses = summary.offer.items.map((name, index) => {
    const share = [0.12, 0.45, 0.7, 0.3, 0.85][index % 5]
    const rawPrice = summary.offer.priceRange[0] + (summary.offer.priceRange[1] - summary.offer.priceRange[0]) * share
    const sent = 48
    return { id: `c${index + 1}`, name, caption: draft ? slot(`подпись «${name}»`, true) : `Демонстрационный вариант «${name}»`, price: fmtMoney(inPriceRange(Math.max(100, Math.round(rawPrice / 100) * 100))), liked: index === 0, likes: Math.min(sent, 12 + index * 7), dislikes: 3 + index * 2, sent }
  })
  profile.selectionCourses = courses
  profile.massStats = [{ label: 'Отправлено', value: 48 }, { label: 'Открыли', value: 36 }, { label: 'Отреагировали', value: 19 }, { label: 'Оставили заявку', value: 5 }]
  profile.selection = { title: `Подборка · ${characters.client.name}`, hint: 'Личная ссылка', description: `Отметьте сердечком, что подходит: ${characters.staff.name.split(' ')[0]} пришлёт предложение без звонка.`, sender: { name: characters.staff.name, role: lower(characters.staff.role), action: 'ваш контакт по подборке', massAction: 'контакт по рассылке' }, contact: 'Написать менеджеру', action: 'Подготовить запрос', massTitle: 'Подборка предложений', massHint: 'Одна ссылка для разных получателей. Ниже пример статистики завершённой рассылки.', initialLiked: [courses[0].id] }
  profile.portal = {
    login: { title: 'Вход в кабинет', email: draft ? slot('почта клиента', true) : 'demo@example.com', welcome: 'Здесь статус, счета и документы.' },
    parent: { name: characters.client.name.split(' ')[0], initials: initials(characters.client.name) },
    children: [{ name: summary.customer.entityExample.name, caption: `${item} · демонстрационные данные`, sub: { used: progress.used, total: progress.total, text: progress.text, until: `обновлено ${fmtDate(summary.time.demoDate)}` }, status: { label: progress.label, tone: progress.tone } }],
    upcoming: [{ label: progress.last ? 'Текущий статус' : 'Следующий шаг', name: item, caption: progress.last ? progress.text : `Контакт: ${characters.client.name}`, icon: 'calendar-event' }, { label: 'Информация о записи', name: jobsFx.focusPortal ? summary.customer.entityExample.name : 'Демонстрационные данные', caption: jobsFx.focusPortal ?? 'Детали сценария уточняются с командой клиента.', icon: 'file-text' }],
    payment: { items: [{ id: 'p-rest', label: `${summary.customer.entityExample.name} · остаток`, amount: fmtMoney(rest), date: 'по текущей записи', state: 'due' }, { id: 'p-advance', label: `${summary.customer.entityExample.name} · предоплата`, amount: fmtMoney(prepay), date: fmtDate(summary.time.demoDate), state: 'paid' }] },
    chat: { title: `Чат · ${characters.staff.role}`, peer: { name: characters.staff.name, role: characters.staff.role, initials: initials(characters.staff.name), status: 'на связи' }, messages: [], emptyTitle: 'Сообщений пока нет', emptyText: `Задайте вопрос по ${dativeNoun(lex.entity)}. Команда ответит в рабочее время.` },
  }
  profile.portalCopy = { mark: firstLetter(lex.name) || 'К', itemsTitle: cap(lex.dealMany), historyTitle: 'История', greeting: 'Добрый день', dateLabel: `Пример кабинета · ${fmtDate(summary.time.demoDate)}`, billAction: 'Посмотреть счёт', billTitle: 'Счёт', billText: `${summary.customer.entityExample.name}: демонстрационная сумма ${fmtMoney(total)}.`, dueLabel: 'К оплате', allPaidLabel: 'Всё оплачено' }
  const period = arch.analyticsPeriod
  const schoolPeriod = summary.archetype === 'school'
  const currentYear = schoolPeriod ? lastCompletedAcademicStart(summary.time.demoDate) : lastCompletedCalendarYear(summary.time.demoDate)
  // В сводке нет тарифов/форматов: не приписываем школе «пакеты работ»
  // и не выдумываем абонементы только по имени архетипа.
  profile.analyticsConfig = { startMonth: period.startMonth, currentYear, yearMonths: period.yearMonths, periodLabel: schoolPeriod ? 'Учебный год' : 'Год', halfLabels: schoolPeriod ? ['Сентябрь–январь', 'Февраль–июнь'] : ['Январь–июнь', 'Июль–декабрь'], directions: [...summary.offer.items], programs: ['Первичное обращение', 'Повторное обращение'], sources: ['Сайт', 'Рекомендации', 'Повторное обращение'], revenueLabel: 'Выручка', countLabel: 'Обращения', averageLabel: 'Среднее значение', itemsLabel: 'Предложения', directionLabel: cap(lex.itemNoun), programLabel: 'Тип обращения', moneyNote: 'Все значения демонстрационные.' }
  return profile
}

function run() {
  const args = process.argv.slice(2)
  const [inputPath, ...options] = args
  const draft = options.includes('--draft')
  const outIndex = options.indexOf('--out')
  const outPathOption = outIndex === -1 ? null : options[outIndex + 1]
  const validOptions = options.every((option, index) => option === '--draft' || option === '--out' || (outIndex !== -1 && index === outIndex + 1))
  if (!inputPath || !outPathOption && outIndex !== -1 || !validOptions || options.filter(option => option === '--out').length > 1 || options.filter(option => option === '--draft').length > 1) throw new Error('Usage: node scripts/profile-draft.mjs <summary.json> [--draft] [--out <profile.json>]')
  const summaryPath = path.resolve(inputPath)
  const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'))
  validateSummary(summary)
  const profile = buildProfile(summary, draft, path.dirname(summaryPath))
  validateProfile(profile)
  const slots = JSON.stringify(profile).match(/\[\s*ЗАПОЛНИТЬ[^\]]*\]/g) ?? []
  if (!draft && slots.length) throw new Error('Ready profile must not contain draft slots')
  const outPath = outPathOption ? path.resolve(outPathOption) : path.join(root, 'src/data/profiles', `${summary.company.slug}${draft ? '.draft' : ''}.json`)
  fs.writeFileSync(outPath, JSON.stringify(profile, null, 2) + '\n')
  console.log(`${draft ? 'Черновик' : 'Готовый профиль'}: ${outPath}`)
  console.log(`Слотов для ручного заполнения: ${slots.length}`)
  console.log('Валидация: профиль проходит validateProfile')
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
if (isMain) try { run() } catch (error) { console.error(error.message); process.exitCode = 1 }
