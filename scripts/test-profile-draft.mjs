#!/usr/bin/env node
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { validateProfile } from './profile.mjs'
import { lastCompletedAcademicStart, lastCompletedCalendarYear, stageProgress } from './profile-draft.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'cubo-profile-draft-'))
const script = path.join(root, 'scripts/profile-draft.mjs')
const mehanikaPath = path.join(root, 'docs/dynamic-proposal/runs/mehanika/summary.json')
const mehanika = JSON.parse(fs.readFileSync(mehanikaPath, 'utf8'))
const run = (...args) => spawnSync(process.execPath, [script, ...args], { encoding: 'utf8' })
const read = name => JSON.parse(fs.readFileSync(path.join(temp, name), 'utf8'))
const writeSummary = (name, data) => {
  const file = path.join(temp, name)
  fs.writeFileSync(file, JSON.stringify(data))
  return file
}
const check = (name, callback) => { callback(); console.log(`PASS ${name}`) }

try {
  const mehanikaOut = path.join(temp, 'mehanika.json')
  check('mehanika ready profile validates', () => {
    const result = run(mehanikaPath, '--out', mehanikaOut)
    assert.equal(result.status, 0, result.stderr)
    validateProfile(read('mehanika.json'))
  })

  check('mehanika does not carry service client data', () => {
    const serialized = JSON.stringify(read('mehanika.json'))
    for (const forbidden of ['1042', '1031', 'оборудование смонтировано', 'объект 3', 'Инженер', 'Алексей Крылов', 'Елена Миронова']) assert.equal(serialized.includes(forbidden), false, forbidden)
  })

  const oneService = { ...mehanika, company: { ...mehanika.company, slug: 'mehanika-one' }, offer: { ...mehanika.offer, items: ['Диагностика'] } }
  const onePath = writeSummary('mehanika-one-summary.json', oneService)
  const oneOut = path.join(temp, 'mehanika-one.json')
  check('one service creates a valid selection', () => {
    const result = run(onePath, '--out', oneOut)
    assert.equal(result.status, 0, result.stderr)
    const profile = read('mehanika-one.json')
    validateProfile(profile)
    assert.equal(profile.selectionCourses.length, 1)
    assert.deepEqual(profile.selection.initialLiked, ['c1'])
    assert.deepEqual(profile.analyticsConfig.directions, ['Диагностика'])
  })

  check('same summary is deterministic', () => {
    const first = path.join(temp, 'same-a.json')
    const second = path.join(temp, 'same-b.json')
    assert.equal(run(onePath, '--out', first).status, 0)
    assert.equal(run(onePath, '--out', second).status, 0)
    assert.equal(fs.readFileSync(first, 'utf8'), fs.readFileSync(second, 'utf8'))
  })

  check('portable sample profile matches its summary and current generator', () => {
    const out = path.join(temp, 'mayak-mvp.json')
    const result = run(path.join(root, 'docs/dynamic-proposal/runs/mayak-mvp/summary.json'), '--out', out)
    assert.equal(result.status, 0, result.stderr)
    assert.deepEqual(read('mayak-mvp.json'), JSON.parse(fs.readFileSync(path.join(root, 'src/data/profiles/mayak-mvp.json'), 'utf8')))
  })

  const invalid = { ...oneService, company: { ...oneService.company, slug: 'invalid-profile' }, offer: { ...oneService.offer, items: [] } }
  const invalidPath = writeSummary('invalid-summary.json', invalid)
  const invalidResult = { ...oneService, company: { ...oneService.company, slug: 'invalid-result' }, units: { ...oneService.units, names: ['Центр', 'Центр'] } }
  const invalidResultPath = writeSummary('invalid-result-summary.json', invalidResult)
  check('invalid input fails without creating or overwriting output', () => {
    const missing = path.join(temp, 'missing.json')
    assert.notEqual(run(invalidPath, '--out', missing).status, 0)
    assert.equal(fs.existsSync(missing), false)
    const protectedFile = path.join(temp, 'protected.json')
    fs.writeFileSync(protectedFile, 'keep')
    assert.notEqual(run(invalidPath, '--out', protectedFile).status, 0)
    assert.equal(fs.readFileSync(protectedFile, 'utf8'), 'keep')
    assert.notEqual(run(mehanikaPath, '--unknown', '--out', protectedFile).status, 0)
    assert.equal(fs.readFileSync(protectedFile, 'utf8'), 'keep')
    assert.notEqual(run(invalidResultPath, '--out', protectedFile).status, 0)
    assert.equal(fs.readFileSync(protectedFile, 'utf8'), 'keep')
  })

  const school = {
    company: { name: 'Орион', displayName: 'Школа «Орион»', activity: 'детский центр', slug: 'orion', brand: { primary: '#7c3aed' } },
    archetype: 'school', units: { kind: 'Филиал', names: ['Речной', 'Лесной'] },
    customer: { singular: 'Родитель', entity: 'Ученик', entityExample: { name: 'Ученик № О-12 · Семья' } },
    offer: { itemNoun: 'Занятие', items: ['Робототехника'], priceRange: [4000, 8000] },
    deal: { noun: 'Заявка', pipeline: ['Новая', 'Пробное занятие', 'Договор', 'Активна'] },
    time: { demoDate: '2026-09-16' }, scale: { monthlyDeals: 80, avgDeal: 6000 }, assumptions: [],
    characters: { staff: { name: 'Вера Полякова', role: 'Куратор' }, colleague: { name: 'Роман Белый', role: 'Преподаватель' }, client: { name: 'Нина Громова', role: 'родитель' } },
  }
  const schoolPath = writeSummary('school-summary.json', school)
  const schoolOut = path.join(temp, 'orion.json')
  check('school does not carry former school names', () => {
    const result = run(schoolPath, '--out', schoolOut)
    assert.equal(result.status, 0, result.stderr)
    const serialized = JSON.stringify(read('orion.json'))
    for (const forbidden of ['Среда', 'Ковалёв', 'Смирнова', 'Маша', 'Елена', 'Игорь']) assert.equal(serialized.includes(forbidden), false, forbidden)
  })

  for (const source of [school, mehanika]) {
    for (const count of [0, 1, 3]) {
      check(`${source.archetype}: copy follows supplied terms and ${count} units`, () => {
        const summary = structuredClone(source)
        summary.company.slug = `copy-${source.archetype}-${count}`
        summary.units.names = ['Север', 'Центр', 'Юг'].slice(0, count)
        // Термин задаёт сводка, а не привычное для архетипа слово «Услуга».
        summary.offer.itemNoun = source.archetype === 'school' ? 'Курс' : 'Работа'
        const out = path.join(temp, `${summary.company.slug}.json`)
        const result = run(writeSummary(`${summary.company.slug}-summary.json`, summary), '--out', out)
        assert.equal(result.status, 0, result.stderr)
        const profile = JSON.parse(fs.readFileSync(out, 'utf8'))
        assert.deepEqual(profile.units, summary.units.names)
        if (count === 0) {
          assert.doesNotMatch(profile.sections.find(section => section.id === 'overview').subtitle, /подразделени|филиал|бригад/i)
          assert.equal(profile.unitPlural, 'Компания')
          assert.match(profile.dashboard.assumptions, /Подразделения не указаны/)
          assert.doesNotMatch(profile.dashboard.assumptions, /Подразделений нет/)
          assert.ok(profile.leads.every(lead => lead.branch === ''))
        } else {
          assert.match(profile.sections.find(section => section.id === 'overview').subtitle, /подразделени/i)
          assert.equal(profile.unitSingular, summary.units.kind)
        }
        assert.equal(profile.analyticsConfig.directionLabel, summary.offer.itemNoun)
        assert.equal(profile.sections.find(section => section.id === 'portal').meta[1], profile.portalCopy.itemsTitle)
        assert.equal(profile.entity.properties.find(property => property.id === 'service').label, summary.offer.itemNoun)
        assert.deepEqual(profile.analyticsConfig.directions, summary.offer.items)
        // Тарифы и форматы обучения/работ не заданы: не выдумывать их из архетипа.
        assert.deepEqual(profile.analyticsConfig.programs, ['Первичное обращение', 'Повторное обращение'])
        assert.doesNotMatch(profile.entity.properties.find(property => property.id === 'subject').label, /заказ/i)
        assert.doesNotMatch(profile.portal.payment.items.find(item => item.id === 'p-rest').date, /выполнения работ/i)
        for (const lead of profile.leads.filter(lead => lead.stage !== 'paid')) {
          const stageIndex = ['new', 'trial', 'contract', 'paid'].indexOf(lead.stage)
          assert.ok(lead.next.includes(summary.deal.pipeline[stageIndex + 1]), lead.next)
        }
      })
    }
  }

  check('missing offer noun uses neutral copy for school and service', () => {
    for (const source of [school, mehanika]) {
      const summary = structuredClone(source)
      delete summary.offer.itemNoun
      const out = path.join(temp, `no-noun-${source.archetype}.json`)
      const result = run(writeSummary(`no-noun-${source.archetype}-summary.json`, summary), '--out', out)
      assert.equal(result.status, 0, result.stderr)
      const profile = JSON.parse(fs.readFileSync(out, 'utf8'))
      assert.equal(profile.dataView.directionLabel, 'Предложение')
      assert.equal(profile.analyticsConfig.directionLabel, 'Предложение')
      assert.equal(profile.entity.properties.find(property => property.id === 'service').label, 'Предложение')
    }
  })

  check('ready profile contains no draft slots', () => {
    assert.equal(JSON.stringify(read('mehanika.json')).includes('ЗАПОЛНИТЬ'), false)
  })

  check('ready profile has concrete data and one consistent total', () => {
    const profile = read('mehanika.json')
    const serialized = JSON.stringify(profile)
    for (const rawValue of ['имя заказчика', 'предмет заказа', 'срок выполнения']) assert.equal(serialized.includes(rawValue), false, rawValue)
    const amount = value => Number(value.replace(/\D/g, ''))
    const properties = Object.fromEntries(profile.entity.properties.map(property => [property.id, property.value]))
    assert.equal(profile.leads[0].child, properties.customer)
    assert.equal(profile.stageNames[profile.leads[0].stage], properties.status)
    assert.equal(profile.leads[0].amount, amount(properties.cost))
    assert.equal(amount(properties.cost), amount(profile.selectionCourses[0].price))
    assert.equal(amount(properties.prepay), amount(profile.portal.payment.items.find(item => item.id === 'p-advance').amount))
    assert.equal(amount(properties.cost), profile.portal.payment.items.reduce((sum, item) => sum + amount(item.amount), 0))
  })

  check('card description cannot repeat an offer item', () => {
    const protectedFile = path.join(temp, 'subject-protected.json')
    fs.writeFileSync(protectedFile, 'keep-subject')
    const summary = {
      ...mehanika,
      company: { ...mehanika.company, slug: 'dup-subject' },
      customer: { ...mehanika.customer, entityExample: { name: 'Заказ № М-1 · Объект', subject: 'Диагностика' } },
    }
    const result = run(writeSummary('dup-subject.json', summary), '--out', protectedFile)
    assert.notEqual(result.status, 0, result.stdout + result.stderr)
    assert.match(result.stderr + result.stdout, /not repeat an offer item/)
    assert.equal(fs.readFileSync(protectedFile, 'utf8'), 'keep-subject')
  })

  check('entity example cannot mix two catalog items', () => {
    const protectedFile = path.join(temp, 'mix-protected.json')
    fs.writeFileSync(protectedFile, 'keep-mix')
    const summary = {
      ...mehanika,
      company: { ...mehanika.company, slug: 'mix-sku' },
      customer: {
        ...mehanika.customer,
        entityExample: { name: 'Заказ № 1 · Плановое ТО', subject: 'Диагностика на подъёмнике' },
      },
    }
    const result = run(writeSummary('mix-sku.json', summary), '--out', protectedFile)
    assert.notEqual(result.status, 0, result.stdout + result.stderr)
    assert.match(result.stderr + result.stdout, /follow offer\.items\[0\]/)
    assert.equal(fs.readFileSync(protectedFile, 'utf8'), 'keep-mix')
  })

  check('proposal intro rejects an em dash', () => {
    const protectedFile = path.join(temp, 'intro-protected.json')
    fs.writeFileSync(protectedFile, 'keep-intro')
    const summary = {
      ...mehanika,
      company: { ...mehanika.company, slug: 'intro-dash' },
      proposal: { intro: 'Заказы команды — на примере услуг.' },
    }
    const result = run(writeSummary('intro-dash.json', summary), '--out', protectedFile)
    assert.notEqual(result.status, 0, result.stdout + result.stderr)
    assert.match(result.stderr + result.stdout, /em dash/)
    assert.equal(fs.readFileSync(protectedFile, 'utf8'), 'keep-intro')
  })

  check('card phone is a demo number and business fields appear', () => {
    const summary = {
      ...mehanika,
      company: { ...mehanika.company, slug: 'card-details' },
      units: { kind: 'Мастерская', names: ['ARTPLAY'] },
      customer: {
        ...mehanika.customer,
        entityExample: {
          name: 'Заказ № МБ-101 · Городской велосипед',
          subject: 'Сезонное обслуживание: тормоза, давление колёс, цепь.',
          fields: [{ label: 'Велосипед', value: 'Городской' }],
        },
      },
    }
    const out = path.join(temp, 'card-details.json')
    assert.equal(run(writeSummary('card-details-summary.json', summary), '--out', out).status, 0)
    const profile = JSON.parse(fs.readFileSync(out, 'utf8'))
    const byId = Object.fromEntries(profile.entity.properties.map(property => [property.id, property]))
    assert.notEqual(byId.subject.value, summary.offer.items[0])
    assert.equal(byId.unit.value, 'ARTPLAY')
    assert.equal(byId['detail-1'].label, 'Велосипед')
    assert.match(byId.phone.value, /^\+7 \d{3} \d{3}-\d{2}-\d{2}$/)
    assert.notEqual(byId.phone.value, '+7 000 000-00-00')
    assert.equal(byId.phone.href, `tel:${profile.entity.actions.call}`)
    assert.notEqual(profile.entity.actions.call, '+70000000000')
  })

  check('stage progress uses position, not a Russian completion word', () => {
    const last = stageProgress('paid', ['Альфа', 'Бета', 'Гамма', 'Дельта'])
    assert.equal(last.used, 4)
    assert.equal(last.total, 4)
    assert.equal(last.last, true)
    assert.equal(last.text, 'Этап 4 из 4: Дельта')
    assert.equal(last.tone, 'ok')
    const mid = stageProgress('trial', ['Новая', 'Выполнено', 'Согласование', 'Архив'])
    assert.equal(mid.used, 2)
    assert.equal(mid.last, false)
    assert.match(mid.text, /Выполнено/)
    assert.equal(mid.tone, 'info')
  })

  const mayakLike = {
    ...mehanika,
    company: { ...mehanika.company, name: 'Маяк-тест', displayName: 'Сервис «Маяк-тест»', slug: 'mayak-test', brand: { primary: '#0f766e' } },
    units: { kind: 'Бригада', names: [] },
    offer: { ...mehanika.offer, items: ['Плановое обслуживание'], priceRange: [6500, 6500] },
    deal: { noun: 'Заказ', pipeline: ['Новая', 'Диагностика', 'Согласование', 'Выполнено'] },
    time: { demoDate: '2026-09-17' },
    scale: { monthlyDeals: 70 },
    assumptions: [],
    characters: { staff: { name: 'Вера Зорина', role: 'Менеджер' }, colleague: { name: 'Павел Левин', role: 'Мастер' }, client: { name: 'Ольга Денисова', role: 'заказчик' } },
  }
  const mayakPath = writeSummary('mayak-test-summary.json', mayakLike)
  const mayakOut = path.join(temp, 'mayak-test.json')
  check('generated last stage and empty units stay consistent', () => {
    assert.equal(run(mayakPath, '--out', mayakOut).status, 0)
    const profile = read('mayak-test.json')
    const child = profile.portal.children[0]
    assert.equal(profile.units.length, 0)
    assert.match(profile.dashboard.assumptions, /Подразделения не указаны/)
    assert.equal(profile.dashboard.assumptions.includes('Подразделения: 1'), false)
    assert.deepEqual(profile.dashboard.priceRange, [6500, 6500])
    assert.equal(profile.dashboard.monthlyDeals, 70)
    assert.equal(child.sub.used, 4)
    assert.equal(child.sub.total, 4)
    assert.equal(child.sub.text, 'Этап 4 из 4: Выполнено')
    assert.equal(child.status.label, 'Выполнено')
    assert.equal(child.status.tone, 'ok')
    assert.equal(profile.entity.properties.find(property => property.id === 'status').value, 'Выполнено')
    assert.equal(profile.stageNames[profile.leads[0].stage], 'Выполнено')
    assert.equal(profile.leads[0].next, 'Статус: Выполнено')
    assert.ok(profile.entityScenario.events.every(event => event.type !== 'task' || event.done))
    assert.equal(profile.analyticsConfig.currentYear, lastCompletedCalendarYear('2026-09-17'))
  })

  const renamed = { ...mayakLike, company: { ...mayakLike.company, slug: 'renamed-stages' }, deal: { noun: 'Заказ', pipeline: ['Альфа', 'Бета', 'Гамма', 'Дельта'] } }
  const renamedPath = writeSummary('renamed-summary.json', renamed)
  check('renamed last stage still completes progress', () => {
    const out = path.join(temp, 'renamed.json')
    assert.equal(run(renamedPath, '--out', out).status, 0)
    const profile = JSON.parse(fs.readFileSync(out, 'utf8'))
    assert.equal(profile.portal.children[0].sub.text, 'Этап 4 из 4: Дельта')
    assert.equal(profile.portal.children[0].status.label, 'Дельта')
    assert.equal(profile.entity.properties.find(property => property.id === 'status').value, 'Дельта')
  })

  const shifted = {
    ...school,
    company: { ...school.company, slug: 'orion-shifted' },
    time: { demoDate: '2025-03-15' },
    units: { kind: 'Филиал', names: ['Речной'] },
  }
  const shiftedPath = writeSummary('shifted-summary.json', shifted)
  check('school and service closed years follow demoDate, not a hardcoded 2026', () => {
    const out = path.join(temp, 'orion-shifted.json')
    assert.equal(run(shiftedPath, '--out', out).status, 0)
    const profile = JSON.parse(fs.readFileSync(out, 'utf8'))
    assert.equal(profile.analyticsConfig.currentYear, lastCompletedAcademicStart('2025-03-15'))
    assert.equal(profile.analyticsConfig.currentYear, 2023)
    assert.equal(profile.units.length, 1)
    assert.match(profile.dashboard.assumptions, /Подразделения: 1/)
    const serviceShift = { ...mayakLike, company: { ...mayakLike.company, slug: 'service-shifted' }, time: { demoDate: '2025-03-15' }, units: { kind: 'Бригада', names: ['Север', 'Центр', 'Юг'] } }
    const serviceOut = path.join(temp, 'service-shifted.json')
    assert.equal(run(writeSummary('service-shifted-summary.json', serviceShift), '--out', serviceOut).status, 0)
    const serviceProfile = JSON.parse(fs.readFileSync(serviceOut, 'utf8'))
    assert.equal(serviceProfile.analyticsConfig.currentYear, lastCompletedCalendarYear('2025-03-15'))
    assert.equal(serviceProfile.analyticsConfig.currentYear, 2024)
    assert.deepEqual(serviceProfile.units, ['Север', 'Центр', 'Юг'])
    assert.equal(JSON.stringify(serviceProfile).includes('Речной'), false)
    assert.equal(serviceProfile.portal.children[0].sub.total, 4)
  })

  const crc32 = buffer => {
    let crc = ~0
    for (const byte of buffer) {
      crc ^= byte
      for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1))
    }
    return ~crc >>> 0
  }
  const pngChunk = (type, data) => {
    const payload = Buffer.concat([Buffer.from(type), data])
    const length = Buffer.alloc(4)
    length.writeUInt32BE(data.length)
    const crc = Buffer.alloc(4)
    crc.writeUInt32BE(crc32(payload))
    return Buffer.concat([length, payload, crc])
  }
  const writePng = (file, width, height, rgb) => {
    const ihdr = Buffer.alloc(13)
    ihdr.writeUInt32BE(width, 0)
    ihdr.writeUInt32BE(height, 4)
    ihdr[8] = 8
    ihdr[9] = 2
    const rows = []
    for (let y = 0; y < height; y++) {
      rows.push(Buffer.from([0]))
      rows.push(rgb.subarray(y * width * 3, (y + 1) * width * 3))
    }
    const png = Buffer.concat([
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      pngChunk('IHDR', ihdr),
      pngChunk('IDAT', zlib.deflateSync(Buffer.concat(rows))),
      pngChunk('IEND', Buffer.alloc(0)),
    ])
    fs.writeFileSync(file, png)
  }
  const rgbFill = (width, height, r, g, b) => {
    const buf = Buffer.alloc(width * height * 3)
    for (let i = 0; i < buf.length; i += 3) { buf[i] = r; buf[i + 1] = g; buf[i + 2] = b }
    return buf
  }
  const logoDir = path.join(temp, 'logos')
  fs.mkdirSync(logoDir)
  const squarePng = path.join(logoDir, 'square.png')
  const widePng = path.join(logoDir, 'wide.png')
  writePng(squarePng, 32, 32, rgbFill(32, 32, 21, 128, 61))
  writePng(widePng, 96, 32, rgbFill(96, 32, 15, 118, 110))
  fs.writeFileSync(path.join(logoDir, 'mark.svg'), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#0f766e"/><circle cx="16" cy="16" r="8" fill="#fff"/></svg>\n')
  fs.writeFileSync(path.join(logoDir, 'gradient.svg'), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><linearGradient id="g"><stop offset="0" stop-color="#0f766e"/><stop offset="1" stop-color="#134e4a"/></linearGradient></defs><rect width="32" height="32" rx="6" fill="url(\'#g\')"/></svg>\n')
  fs.writeFileSync(path.join(logoDir, 'handlers.svg'), '<svg xmlns="http://www.w3.org/2000/svg" onload="void 0"><rect width="32" height="32"/></svg>\n')
  fs.writeFileSync(path.join(logoDir, 'external-fill.svg'), '<svg xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="url(https://example.com/p.png)"/></svg>\n')
  fs.writeFileSync(path.join(logoDir, 'external.svg'), '<svg xmlns="http://www.w3.org/2000/svg"><image href="https://example.com/logo.png"/></svg>\n')
  fs.writeFileSync(path.join(logoDir, 'note.jpg'), 'not-a-logo')
  const withLogo = (slug, logo) => {
    const summary = {
      ...mayakLike,
      company: { ...mayakLike.company, slug, brand: { primary: '#0f766e', ...(logo !== undefined ? { logo } : {}) } },
    }
    return writeSummary(`${slug}-summary.json`, summary)
  }

  check('png logo embeds as data URI and keeps Cubo brand name', () => {
    const summaryPath = withLogo('logo-png', 'logos/square.png')
    const out = path.join(temp, 'logo-png.json')
    const result = run(summaryPath, '--out', out)
    assert.equal(result.status, 0, result.stderr)
    const profile = JSON.parse(fs.readFileSync(out, 'utf8'))
    assert.equal(profile.brand.name, 'Cubo')
    assert.match(profile.logo, /^data:image\/png;base64,/)
    assert.equal(profile.logo.includes('https://'), false)
    assert.equal(profile.logo.includes('file:'), false)
    validateProfile(profile)
  })

  check('svg logo embeds and stays autonomous', () => {
    const out = path.join(temp, 'logo-svg.json')
    assert.equal(run(withLogo('logo-svg', 'logos/mark.svg'), '--out', out).status, 0)
    const profile = JSON.parse(fs.readFileSync(out, 'utf8'))
    assert.match(profile.logo, /^data:image\/svg\+xml;base64,/)
    assert.equal(profile.brand.name, 'Cubo')
    const decoded = Buffer.from(profile.logo.split(',')[1], 'base64').toString('utf8')
    assert.equal(decoded.includes('example.com'), false)
    assert.equal(/href\s*=\s*["']https?:/i.test(decoded), false)
  })

  check('missing logo field keeps letter fallback and does not write logo', () => {
    const profile = read('mayak-test.json')
    assert.equal(profile.logo, undefined)
    assert.equal(profile.initials, 'М')
    assert.equal(profile.brand.name, 'Cubo')
  })

  // task-21: оболочка — интро, пара «партнёр × клиент», коммерческая оценка.
  check('summary without proposal gets the accepted default estimate', () => {
    const out = path.join(temp, 'shell-default.json')
    assert.equal(run(withLogo('shell-default', undefined), '--out', out).status, 0)
    const profile = JSON.parse(fs.readFileSync(out, 'utf8'))
    validateProfile(profile)
    assert.equal(profile.partner, undefined)
    assert.equal(profile.hero.intro, undefined)
    assert.equal(profile.estimate.items.length, 5)
    assert.deepEqual(profile.estimate.items.map(i => [i.from, i.to ?? null]), [
      [175000, 280000], [245000, 385000], [210000, 350000], [140000, 245000], [5600000, null],
    ])
    assert.equal(profile.estimate.total, undefined)
    assert.match(profile.estimate.text, /ориентировочн/i)
    assert.match(profile.estimate.text, /согласованного объёма/i)
    assert.equal(profile.hero.kicker.includes('демонстрационные данные'), false)
  })

  check('proposal intro, partner and manager estimate pass summary → profile', () => {
    const summary = {
      ...mayakLike,
      company: { ...mayakLike.company, slug: 'shell-full' },
      proposal: {
        intro: 'Сервисная компания: заказы, клиенты и кабинет в одной системе.',
        partner: { name: 'RAND' },
        estimate: {
          title: 'Смета от менеджера',
          text: 'Индивидуальная оценка по согласованному объёму.',
          items: [
            { id: 'dashboard', title: 'Дашборд', from: 200000, to: 300000 },
            { id: 'portal', title: 'Кабинет клиента', from: 250000 },
          ],
          total: { from: 450000, to: 550000 },
        },
      },
    }
    const summaryPath = writeSummary('shell-full-summary.json', summary)
    const out = path.join(temp, 'shell-full.json')
    assert.equal(run(summaryPath, '--out', out).status, 0)
    const profile = JSON.parse(fs.readFileSync(out, 'utf8'))
    validateProfile(profile)
    assert.equal(profile.hero.intro, summary.proposal.intro)
    assert.equal(profile.partner.name, 'RAND')
    assert.equal(profile.partner.logo, undefined)
    // Смета заменяет базу целиком, без смешивания позиций и rate.
    assert.deepEqual(profile.estimate.items.map(i => i.id), ['dashboard', 'portal'])
    assert.equal('rate' in profile.estimate, false)
    assert.deepEqual(profile.estimate.total, { from: 450000, to: 550000 })
  })

  check('RAND partner rejects a custom logo file', () => {
    const protectedFile = path.join(temp, 'rand-protected.json')
    fs.writeFileSync(protectedFile, 'keep-rand')
    const summary = {
      ...mayakLike,
      company: { ...mayakLike.company, slug: 'rand-logo-forbidden' },
      proposal: { partner: { name: 'RAND', logo: 'logos/mark.svg' } },
    }
    const result = run(writeSummary('rand-logo-forbidden.json', summary), '--out', protectedFile)
    assert.notEqual(result.status, 0, result.stdout + result.stderr)
    assert.match(result.stderr + result.stdout, /not used for RAND/)
    assert.equal(fs.readFileSync(protectedFile, 'utf8'), 'keep-rand')
  })

  check('invalid estimate fields fail without writing the profile', () => {
    const protectedFile = path.join(temp, 'shell-protected.json')
    fs.writeFileSync(protectedFile, 'keep-estimate')
    const base = { ...mayakLike, company: { ...mayakLike.company, slug: 'shell-bad' } }
    const cases = [
      { ...base, proposal: { estimate: { items: [{ id: 'x', title: 'X', from: 100000, to: 50000 }] } } },
      { ...base, proposal: { estimate: { items: [{ id: 'x', title: 'X', from: 0 }] } } },
      { ...base, proposal: { estimate: { items: [] } } },
      { ...base, proposal: { estimate: { items: [{ id: 'x', title: 'X', from: 100000 }], total: { from: 90000, to: 1000 } } } },
      { ...base, proposal: { estimate: { rate: 3500, items: [{ id: 'x', title: 'X', hoursFrom: 50, hoursTo: 100, from: 175000, to: 999999 }] } } },
      { ...base, proposal: { partner: { name: 'RAND', logo: 'logos/external.svg' } } },
    ]
    cases.forEach((summary, index) => {
      const result = run(writeSummary(`shell-bad-${index}.json`, summary), '--out', protectedFile)
      assert.notEqual(result.status, 0, result.stdout + result.stderr)
      assert.equal(fs.readFileSync(protectedFile, 'utf8'), 'keep-estimate')
    })
  })

  // task-22: джобы → содержание. Метрики — только из библиотеки архетипа;
  // result истории: экран 03 → реплика клиента в карточке, экран 06 → «Ближайшие» портала.
  const jobsBase = {
    ...mayakLike,
    company: { ...mayakLike.company, slug: 'jobs-base' },
    jobs: {
      main: 'When закрывается месяц, I want to сравнить точки, so I can найти отстающую',
      roles: [
        { role: 'Руководитель', stories: [
          { when: 'закрывается месяц', want: 'сравнить точки по выручке и загрузке', so: 'найти отстающую точку', metrics: ['revenue', 'load'], screens: ['01', '02'] },
          { when: 'готовлю планёрку', want: 'помнить договорённости по клиентам', so: 'не переспрашивать команду' },
        ] },
        { role: 'Мастер', stories: [{ when: 'заказчик спрашивает про срок', want: 'видеть статус и следующий шаг по заказу рядом', so: 'отвечать без обхода постов', metrics: ['ontime'], screens: ['03'], result: 'Подскажите, когда будет готов мой заказ?' }] },
        { role: 'Заказчик', stories: [{ when: 'жду машину', want: 'видеть статус ремонта и счёт в кабинете', so: 'не звонить мастеру', screens: ['06'], result: 'Статус ремонта и счёт — в кабинете, без звонка.' }] },
      ],
    },
  }
  check('jobs lift supported metrics and keep archetype order for the rest', () => {
    const out = path.join(temp, 'jobs-base.json')
    const result = run(writeSummary('jobs-base-summary.json', jobsBase), '--out', out)
    assert.equal(result.status, 0, result.stderr)
    const profile = JSON.parse(fs.readFileSync(out, 'utf8'))
    validateProfile(profile)
    assert.deepEqual(profile.dashboard.defaultMetrics, ['revenue', 'load', 'ontime', 'orders'])
    // 03: result → реплика клиента в истории карточки; 06: result → «Ближайшие» портала.
    assert.equal(profile.entityScenario.events.find(event => event.id === 'e3').text, 'Подскажите, когда будет готов мой заказ?')
    assert.equal(profile.portal.upcoming[1].name, 'Заказ № 2187 · Гелиос')
    assert.equal(profile.portal.upcoming[1].caption, 'Статус ремонта и счёт — в кабинете, без звонка.')
  })

  check('jobs result without screens 03/06 warns and stays internal', () => {
    const summary = {
      ...mayakLike,
      company: { ...mayakLike.company, slug: 'jobs-unrouted' },
      jobs: {
        main: 'M',
        roles: [{ role: 'Владелец', stories: [{ when: 'закрывается месяц', want: 'видеть выручку', so: 'оценивать бизнес', metrics: ['revenue'], screens: ['01'], result: 'Не попадёт в профиль' }] }],
      },
    }
    const out = path.join(temp, 'jobs-unrouted.json')
    const result = run(writeSummary('jobs-unrouted-summary.json', summary), '--out', out)
    assert.equal(result.status, 0, result.stderr)
    assert.match(result.stderr, /result не выводится/)
    const profile = JSON.parse(fs.readFileSync(out, 'utf8'))
    assert.equal(JSON.stringify(profile).includes('Не попадёт в профиль'), false)
    assert.equal(profile.portal.upcoming[1].caption, 'Детали сценария уточняются с командой клиента.')
    assert.equal(profile.entityScenario.events.find(event => event.id === 'e3').text, 'Клиент подтвердил этап «Выполнено»')
  })

  check('control pair: different job priorities change the visible profile', () => {
    const alt = {
      ...mayakLike,
      company: { ...mayakLike.company, slug: 'jobs-alt' },
      jobs: {
        main: 'When клиент просит счёт, I want to показать статус оплаты, so I can не отвечать вручную',
        roles: [
          { role: 'Владелец', stories: [{ when: 'закрывается месяц', want: 'видеть средний чек и повторные обращения', so: 'понимать качество и выручку', metrics: ['average', 'repeat'], screens: ['01', '02'] }] },
          { role: 'Мастер', stories: [{ when: 'заказчик уточняет состав работ', want: 'видеть историю и смету в карточке', so: 'отвечать из одного экрана', screens: ['03'], result: 'А что входит в мой заказ и сколько это стоит?' }] },
          { role: 'Клиент', stories: [{ when: 'жду машину', want: 'видеть статус заказа и счёт', so: 'не звонить мастеру', screens: ['06'], result: 'Статус заказа и счёт видны в кабинете.' }] },
        ],
      },
    }
    const outA = path.join(temp, 'jobs-a.json')
    const outB = path.join(temp, 'jobs-b.json')
    assert.equal(run(writeSummary('jobs-a.json', jobsBase), '--out', outA).status, 0)
    assert.equal(run(writeSummary('jobs-b.json', alt), '--out', outB).status, 0)
    const a = JSON.parse(fs.readFileSync(outA, 'utf8'))
    const b = JSON.parse(fs.readFileSync(outB, 'utf8'))
    assert.notDeepEqual(a.dashboard.defaultMetrics, b.dashboard.defaultMetrics)
    assert.notEqual(a.entityScenario.events.find(event => event.id === 'e3').text, b.entityScenario.events.find(event => event.id === 'e3').text)
    assert.ok(a.portal.upcoming[1].caption !== b.portal.upcoming[1].caption)
    // jobs.main — внутреннее поле карты джобов: меняет только смысл сводки, не профиль.
    const mainOnly = { ...jobsBase, jobs: { ...jobsBase.jobs, main: 'Другая формулировка главного джоба' } }
    const mainOut = path.join(temp, 'jobs-main.json')
    assert.equal(run(writeSummary('jobs-main-summary.json', mainOnly), '--out', mainOut).status, 0)
    assert.equal(fs.readFileSync(mainOut, 'utf8'), fs.readFileSync(outA, 'utf8'))
    // повтор из той же сводки идентичен
    const repeat = path.join(temp, 'jobs-a2.json')
    assert.equal(run(path.join(temp, 'jobs-base-summary.json'), '--out', repeat).status, 0)
    assert.equal(fs.readFileSync(repeat, 'utf8'), fs.readFileSync(outA, 'utf8'))
  })

  check('single extra metric joins defaults: no four-card cap, repeats counted once', () => {
    // Подтверждённое ревью поведение: одна метрика 'average' даёт пять KPI.
    const single = {
      ...mayakLike,
      company: { ...mayakLike.company, slug: 'jobs-single-metric' },
      jobs: {
        main: 'M',
        roles: [{ role: 'Владелец', stories: [{ when: 'закрывается месяц', want: 'видеть средний заказ', so: 'оценивать чек', metrics: ['average'], screens: ['01'] }] }],
      },
    }
    const singleOut = path.join(temp, 'jobs-single.json')
    const singleResult = run(writeSummary('jobs-single-summary.json', single), '--out', singleOut)
    assert.equal(singleResult.status, 0, singleResult.stderr)
    assert.deepEqual(JSON.parse(fs.readFileSync(singleOut, 'utf8')).dashboard.defaultMetrics, ['average', 'revenue', 'orders', 'ontime', 'load'])
    // Повторы метрик в разных историях не дублируют карточки и не меняют порядок.
    const repeated = {
      ...mayakLike,
      company: { ...mayakLike.company, slug: 'jobs-repeat-metric' },
      jobs: {
        main: 'M',
        roles: [
          { role: 'Владелец', stories: [{ when: 'закрывается месяц', want: 'видеть средний заказ и выручку', so: 'оценивать бизнес', metrics: ['average', 'revenue'], screens: ['01'] }] },
          { role: 'Мастер', stories: [{ when: 'планирую неделю', want: 'видеть средний заказ', so: 'оценивать загрузку', metrics: ['average'], screens: ['01'] }] },
        ],
      },
    }
    const repeatOut = path.join(temp, 'jobs-repeat.json')
    const repeatResult = run(writeSummary('jobs-repeat-summary.json', repeated), '--out', repeatOut)
    assert.equal(repeatResult.status, 0, repeatResult.stderr)
    assert.deepEqual(JSON.parse(fs.readFileSync(repeatOut, 'utf8')).dashboard.defaultMetrics, ['average', 'revenue', 'orders', 'ontime', 'load'])
  })

  check('invalid jobs fields fail without writing the profile', () => {
    const protectedFile = path.join(temp, 'jobs-protected.json')
    fs.writeFileSync(protectedFile, 'keep-jobs')
    const badJobs = jobs => ({ ...mayakLike, company: { ...mayakLike.company, slug: 'jobs-bad' }, jobs })
    const story = extra => ({ role: 'R', stories: [{ when: 'w', want: 'x', so: 's', ...extra }] })
    const cases = [
      badJobs({ main: '', roles: [] }),
      badJobs({ main: 'M', roles: [{ role: 'R', stories: [{ when: 'w', want: '', so: 's' }] }] }),
      badJobs({ main: 'M', roles: [story({ screens: ['09'] })] }),
      badJobs({ main: 'M', roles: [story({ metrics: ['nps'] })] }),      // метрики нет в библиотеке
      badJobs({ main: 'M', roles: [story({ metrics: ['fill'] })] }),     // метрика другого архетипа (school)
      badJobs({ main: 'M', roles: [story({ metrics: 'revenue' })] }),    // metrics не список
      badJobs({ main: 'M', roles: [story({ result: '' })] }),            // пустой result
      badJobs({ main: 'M', roles: [story({ result: 42 })] }),            // result не текст
    ]
    cases.forEach((summary, index) => {
      const result = run(writeSummary(`jobs-bad-${index}.json`, summary), '--out', protectedFile)
      assert.notEqual(result.status, 0, result.stdout + result.stderr)
      assert.equal(fs.readFileSync(protectedFile, 'utf8'), 'keep-jobs')
    })
  })

  check('ready profile with non-autonomous embedded svg is rejected', () => {
    const profile = read('mayak-test.json')
    const svgUri = svg => `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
    const external = svgUri('<svg xmlns="http://www.w3.org/2000/svg"><image href="https://example.com/x.png"/></svg>')
    const clean = svgUri('<svg xmlns="http://www.w3.org/2000/svg"><rect width="8" height="8"/></svg>')
    // Локальный url('#g') — не внешний ресурс (ревью 21.09).
    const gradient = svgUri('<svg xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g"><stop offset="0" stop-color="#000"/></linearGradient></defs><rect width="8" height="8" fill="url(\'#g\')"/></svg>')
    assert.doesNotThrow(() => validateProfile({ ...profile, logo: gradient }))
    assert.doesNotThrow(() => validateProfile({ ...profile, logo: clean }))
    assert.throws(() => validateProfile({ ...profile, logo: external }), /logo SVG must be autonomous/)
    assert.throws(() => validateProfile({ ...profile, logo: svgUri('<svg xmlns="http://www.w3.org/2000/svg"><rect width="8" height="8" fill="url(https://example.com/p.png)"/></svg>') }), /logo SVG must be autonomous/)
    assert.throws(() => validateProfile({ ...profile, logo: svgUri('<svg xmlns="http://www.w3.org/2000/svg" onload="void 0"><rect width="8" height="8"/></svg>') }), /logo SVG must be autonomous/)
    assert.throws(() => validateProfile({ ...profile, partner: { name: 'Acme', logo: external } }), /partner\.logo SVG must be autonomous/)
    const encoded = `data:image/svg+xml,${encodeURIComponent('<svg><image href="https://example.com/x.png"/></svg>')}`
    assert.throws(() => validateProfile({ ...profile, logo: encoded }), /logo SVG must be autonomous/)
    assert.throws(() => validateProfile({ ...profile, logo: 'data:image/svg+xml;base64,bm90LXN2Zw==' }), /logo must be a valid SVG document/)
  })

  check('svg logo with local url(#g) embeds, executable attributes are rejected', () => {
    const ok = path.join(temp, 'logo-gradient.json')
    assert.equal(run(withLogo('logo-gradient', 'logos/gradient.svg'), '--out', ok).status, 0, run(withLogo('logo-gradient', 'logos/gradient.svg'), '--out', ok).stderr)
    assert.match(JSON.parse(fs.readFileSync(ok, 'utf8')).logo, /^data:image\/svg\+xml;base64,/)
    const protectedFile = path.join(temp, 'logo-svg-protected.json')
    fs.writeFileSync(protectedFile, 'keep-svg')
    for (const file of ['handlers.svg', 'external-fill.svg', 'external.svg']) {
      const result = run(withLogo(`logo-bad-${file}`, `logos/${file}`), '--out', protectedFile)
      assert.notEqual(result.status, 0, `${file}: ${result.stdout} ${result.stderr}`)
      assert.equal(fs.readFileSync(protectedFile, 'utf8'), 'keep-svg')
    }
  })

  check('invalid logo does not overwrite an existing profile', () => {
    const protectedFile = path.join(temp, 'logo-protected.json')
    fs.writeFileSync(protectedFile, 'keep-logo')
    const cases = [
      withLogo('logo-missing', 'logos/no-file.png'),
      withLogo('logo-url', 'https://example.com/logo.png'),
      withLogo('logo-abs', path.resolve(squarePng)),
      withLogo('logo-jpg', 'logos/note.jpg'),
      withLogo('logo-ext', 'logos/external.svg'),
    ]
    for (const summaryPath of cases) {
      const result = run(summaryPath, '--out', protectedFile)
      assert.notEqual(result.status, 0, result.stdout + result.stderr)
      assert.equal(fs.readFileSync(protectedFile, 'utf8'), 'keep-logo')
    }
  })

  // task-15: границы генерации — морфология, инициалы, цены, даты, нагрузка.
  const fieldCase = {
    ...mehanika,
    company: { ...mehanika.company, slug: 't15-field-test', name: '«Снаб»', displayName: 'Снабженец «Снаб»' },
    units: { kind: 'Площадка', names: ['Площадка Север', 'Площадка Юг'] },
    customer: { ...mehanika.customer, entity: 'Поставка', entityExample: { name: 'Поставка № 44 · «Гелиос»' }, examples: ['«Гелиос» Агро', 'ООО «Вымпел-Ком»', '  ИП   Сидоров  '] },
    deal: { ...mehanika.deal, noun: 'Поставка' },
    offer: { ...mehanika.offer, items: ['Поставка запчастей', 'Срочная поставка'] },
  }
  check('field-test morphology: Площадки, по поставке, Поставки в работе', () => {
    const out = path.join(temp, 't15-field-test.json')
    assert.equal(run(writeSummary('t15-field-summary.json', fieldCase), '--out', out).status, 0)
    const profile = JSON.parse(fs.readFileSync(out, 'utf8'))
    validateProfile(profile)
    const serialized = JSON.stringify(profile)
    assert.equal(serialized.includes('Площадкаы'), false)
    assert.equal(serialized.includes('поставкау'), false)
    assert.equal(serialized.includes('Поставкаы'), false)
    assert.equal(profile.unitPlural, 'Площадки')
    assert.equal(profile.dataView.title, 'Поставки в работе')
    assert.match(profile.portal.chat.emptyText, /по поставке\./)
    assert.equal(profile.entityScenario.events[0].text.startsWith('Создана поставка'), true)
    // Имя уже в кавычках не получает вторую пару.
    assert.equal(profile.hero.kicker, 'Для «Снаб»')
    assert.equal(profile.brand.note, 'Предложение для «Снаб»')
    assert.equal(serialized.includes('««'), false)
  })

  check('website case: Мастерская uses Мастерские without changing supplied locations', () => {
    const summary = structuredClone(mehanika)
    summary.units = { kind: 'Мастерская', names: ['ARTPLAY'] }
    const out = path.join(temp, 'workshop-site.json')
    const result = run(writeSummary('workshop-site-summary.json', summary), '--out', out)
    assert.equal(result.status, 0, result.stderr)
    const profile = JSON.parse(fs.readFileSync(out, 'utf8'))
    assert.equal(profile.unitSingular, 'Мастерская')
    assert.equal(profile.unitPlural, 'Мастерские')
    assert.deepEqual(profile.units, ['ARTPLAY'])
  })

  check('phrase «Заказ поставки» inflects by head word, summary stays full', () => {
    const orderCase = {
      ...mayakLike,
      company: { ...mayakLike.company, slug: 't15-order-phrase' },
      customer: { ...mayakLike.customer, entity: 'Заказ поставки' },
      deal: { ...mayakLike.deal, noun: 'Заказ поставки' },
    }
    const out = path.join(temp, 't15-order-phrase.json')
    const result = run(writeSummary('t15-order-phrase-summary.json', orderCase), '--out', out)
    assert.equal(result.status, 0, result.stderr)
    const profile = JSON.parse(fs.readFileSync(out, 'utf8'))
    validateProfile(profile)
    // Согласованный случай task-15: «по заказу поставки» и «Заказы поставки в работе».
    assert.equal(profile.dataView.title, 'Заказы поставки в работе')
    assert.match(profile.portal.chat.emptyText, /по заказу поставки\./)
    const serialized = JSON.stringify(profile)
    for (const broken of ['поставкиу', 'поставкиы']) assert.equal(serialized.includes(broken), false, broken)
  })

  check('initials skip quotes and punctuation, pick first letters', () => {
    const profile = JSON.parse(fs.readFileSync(path.join(temp, 't15-field-test.json'), 'utf8'))
    assert.equal(profile.initials, 'С')                     // «Снаб» → С, не «
    assert.equal(profile.portalCopy.mark, 'С')
    assert.equal(profile.entity.initials, 'Г')             // «Гелиос» → Г
    assert.deepEqual(profile.leads.slice(1, 3).map(l => l.initials), ['ОВ', 'ИС'])
    assert.equal(profile.leads[1].child, 'ООО «Вымпел-Ком»')
  })

  check('price rounding never leaves the declared range', () => {
    const tiny = { ...mayakLike, company: { ...mayakLike.company, slug: 'price-tiny' }, offer: { ...mayakLike.offer, priceRange: [0, 50] } }
    const out = path.join(temp, 'price-tiny.json')
    assert.equal(run(writeSummary('price-tiny-summary.json', tiny), '--out', out).status, 0)
    const profile = JSON.parse(fs.readFileSync(out, 'utf8'))
    validateProfile(profile)
    const amount = value => Number(String(value).replace(/\D/g, ''))
    for (const course of profile.selectionCourses) {
      const price = amount(course.price)
      assert.ok(price >= 0 && price <= 50, `price ${price} out of [0,50]`)
    }
    for (const lead of profile.leads) assert.ok(lead.amount >= 0 && lead.amount <= 50, `lead ${lead.amount} out of [0,50]`)
    assert.ok(amount(profile.portal.payment.items[0].amount) <= 50)
  })

  check('fractional and zero price ranges stay finite and inside range', () => {
    const frac = { ...mayakLike, company: { ...mayakLike.company, slug: 'price-frac' }, offer: { ...mayakLike.offer, priceRange: [1234.56, 5678.9] } }
    const fracOut = path.join(temp, 'price-frac.json')
    assert.equal(run(writeSummary('price-frac-summary.json', frac), '--out', fracOut).status, 0)
    const fracProfile = JSON.parse(fs.readFileSync(fracOut, 'utf8'))
    validateProfile(fracProfile)
    assert.ok(fracProfile.leads.every(lead => Number.isFinite(lead.amount) && lead.amount >= 1234 && lead.amount <= 5700))
    const zero = { ...mayakLike, company: { ...mayakLike.company, slug: 'price-zero' }, offer: { ...mayakLike.offer, priceRange: [0, 0] } }
    const zeroOut = path.join(temp, 'price-zero.json')
    assert.equal(run(writeSummary('price-zero-summary.json', zero), '--out', zeroOut).status, 0)
    const zeroProfile = JSON.parse(fs.readFileSync(zeroOut, 'utf8'))
    validateProfile(zeroProfile)
    assert.ok(zeroProfile.leads.every(lead => lead.amount === 0))
  })

  check('boundary inputs fail without writing the profile', () => {
    const protectedFile = path.join(temp, 'bounds-protected.json')
    fs.writeFileSync(protectedFile, 'keep-bounds')
    const bad = extra => ({ ...mayakLike, company: { ...mayakLike.company, slug: 'bounds-bad' }, ...extra })
    const cases = [
      bad({ offer: { ...mayakLike.offer, priceRange: [60000, 8000] } }),                    // обратный диапазон
      bad({ offer: { ...mayakLike.offer, priceRange: [8000, -100] } }),                     // отрицательная цена
      bad({ offer: { ...mayakLike.offer, priceRange: [8000] } }),                           // не пара
      bad({ time: { demoDate: '2026-13-40' } }),                                            // месяц 13
      bad({ time: { demoDate: '2026-02-30' } }),                                            // 30 февраля
      bad({ time: { demoDate: '13.09.2026' } }),                                            // другой формат
      bad({ archetype: 'retail' }),                                                          // неизвестный для генератора архетип
      bad({ archetype: 'shop' }),                                                            // совсем неизвестный
      bad({ customer: { ...mayakLike.customer, entityExample: { name: '', dueDate: '2026-09-40' } } }),
      bad({ deal: { noun: 'Заказ', pipeline: ['Новая', 'Готово'] } }),                      // не 4 стадии
      bad({ scale: { monthlyDeals: 0 } }),                                                  // нулевой масштаб
      bad({ company: { ...mayakLike.company, slug: 'Bad Slug' } }),                         // slug с пробелом/капсом
    ]
    cases.forEach((summary, index) => {
      const result = run(writeSummary(`bounds-bad-${index}.json`, summary), '--out', protectedFile)
      assert.notEqual(result.status, 0, `${index}: ${result.stdout} ${result.stderr}`)
      assert.equal(fs.readFileSync(protectedFile, 'utf8'), 'keep-bounds')
    })
  })

  check('load case 12 services / 10 units stays consistent', () => {
    const load = {
      ...mehanika,
      company: { ...mehanika.company, slug: 't15-load-test' },
      units: { kind: 'Площадка', names: Array.from({ length: 10 }, (_, i) => `Площадка ${i + 1}`) },
      offer: { ...mehanika.offer, items: Array.from({ length: 12 }, (_, i) => `Услуга ${i + 1}`) },
    }
    const out = path.join(temp, 't15-load-test.json')
    assert.equal(run(writeSummary('t15-load-summary.json', load), '--out', out).status, 0)
    const profile = JSON.parse(fs.readFileSync(out, 'utf8'))
    validateProfile(profile)
    assert.equal(profile.selectionCourses.length, 12)
    assert.equal(profile.units.length, 10)
    assert.ok(profile.selectionCourses.every(course => course.likes <= course.sent), 'likes ≤ sent')
    assert.equal(profile.analyticsConfig.directions.length, 12)
  })
} finally {
  fs.rmSync(temp, { recursive: true, force: true })
}
