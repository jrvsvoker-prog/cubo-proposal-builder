#!/usr/bin/env node
// Browser regression: compile the real component styles, then measure rendered
// PNG/SVG images against their slots. Open the generated HTML and inspect
// window.__logoLayoutResults (an oversized image fails even if overflow hides it).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { deflateSync } from 'node:zlib'
import { compile } from 'sass-embedded'

const root = fileURLToPath(new URL('..', import.meta.url))
const out = path.resolve(process.argv[2] || path.join(root, 'dist/logo-layout.html'))
const css = compile(path.join(root, 'src/index.scss')).css
const shapes = [[180, 100], [32, 32], [24, 96], [600, 24], [96, 24], [12, 8]]

function crc32(bytes) {
  let crc = 0xffffffff
  for (const byte of bytes) {
    crc ^= byte
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0)
  }
  return (crc ^ 0xffffffff) >>> 0
}
function chunk(type, body) {
  const name = Buffer.from(type)
  const length = Buffer.alloc(4)
  length.writeUInt32BE(body.length)
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([name, body])))
  return Buffer.concat([length, name, body, crc])
}
function png(width, height) {
  const header = Buffer.alloc(13)
  header.writeUInt32BE(width, 0)
  header.writeUInt32BE(height, 4)
  header[8] = 8
  header[9] = 6
  const pixels = Buffer.alloc((width * 4 + 1) * height)
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const offset = y * (width * 4 + 1) + 1 + x * 4
    const edge = x === 0 || y === 0 || x === width - 1 || y === height - 1
    pixels.set(edge ? [220, 40, 40, 255] : [40, 100, 180, 255], offset)
  }
  return Buffer.concat([Buffer.from('89504e470d0a1a0a', 'hex'), chunk('IHDR', header), chunk('IDAT', deflateSync(pixels)), chunk('IEND', Buffer.alloc(0))])
}
const slots = {
  sidebar: brand => `<aside class="scr-sidebar"><div class="scr-sidebar__brand"><span class="scr-sidebar__mark is-logo">${brand}</span><button class="scr-sidebar__toggle">↔</button></div></aside>`,
  collapsed: brand => `<aside class="scr-sidebar is-collapsed"><div class="scr-sidebar__brand"><button class="scr-sidebar__mark-btn"><span class="scr-sidebar__mark is-logo">${brand}</span></button></div></aside>`,
  'rail-open': brand => `<aside class="scr-sidebar is-rail-open"><div class="scr-sidebar__brand"><span class="scr-sidebar__mark is-logo">${brand}</span></div></aside>`,
  selection: brand => `<span class="sel-brand__mark is-logo">${brand}</span>`,
  portal: brand => `<span class="por-bar__mark is-logo">${brand}</span>`,
  login: brand => `<span class="por-login__mark is-logo">${brand}</span>`,
}
const cases = []
for (const [width, height] of shapes) for (const format of ['png', 'svg']) {
  const bytes = format === 'png' ? png(width, height) : Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect x=".5" y=".5" width="${width - 1}" height="${height - 1}" fill="#2864b4" stroke="#dc2828"/></svg>`)
  const src = `data:image/${format === 'svg' ? 'svg+xml' : 'png'};base64,${bytes.toString('base64')}`
  for (const [slot, render] of Object.entries(slots)) {
    const name = `${format} ${width}×${height} ${slot}`
    cases.push(`<section class="case" data-name="${name}"><p>${name}</p>${render(`<span class="client-brand client-brand--logo"><img src="${src}" alt="" /></span>`)}</section>`)
  }
}
const check = async () => {
  await Promise.all([...document.images].map(img => img.decode()))
  const failures = []
  for (const fixture of document.querySelectorAll('.case')) {
    const img = fixture.querySelector('img')
    const brand = img.parentElement
    const slot = brand.parentElement
    const box = img.getBoundingClientRect()
    for (const parent of [brand, slot]) {
      const bounds = parent.getBoundingClientRect()
      if (box.width <= 0 || box.height <= 0 || box.left < bounds.left - .5 || box.top < bounds.top - .5 || box.right > bounds.right + .5 || box.bottom > bounds.bottom + .5) {
        failures.push({ name: fixture.dataset.name, image: box.toJSON(), slot: bounds.toJSON() })
        break
      }
    }
    if (getComputedStyle(img).objectFit !== 'contain') failures.push({ name: fixture.dataset.name, reason: 'image must preserve its aspect ratio' })
  }
  window.__logoLayoutResults = { total: document.querySelectorAll('.case').length, failures }
  document.querySelector('#result').textContent = failures.length ? `FAIL: ${failures.length} cropped logos` : `PASS: ${window.__logoLayoutResults.total} logo layouts`
  document.title = document.querySelector('#result').textContent
}
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, `<!doctype html><html lang="en"><meta charset="utf-8"><title>Logo layout regression</title><style>${css}\nbody{padding:24px}main{display:flex;flex-wrap:wrap;gap:16px}.case{position:relative;width:280px;height:110px;padding:8px;border:1px solid #ccc}.case p{font:12px sans-serif;margin:0 0 8px}.case .scr-sidebar{height:65px}.case .is-rail-open{position:static;height:65px}</style><h1 id="result">Checking logos…</h1><main>${cases.join('')}</main><script>(${check.toString()})().catch(error => { window.__logoLayoutResults = {error:String(error)}; document.title = 'FAIL'; });</script></html>`)
console.log(`Open ${out}; inspect window.__logoLayoutResults. ${cases.length} layouts use actual component CSS.`)
