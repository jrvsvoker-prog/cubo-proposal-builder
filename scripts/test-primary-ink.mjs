import assert from 'node:assert/strict'
import { primaryForeground, LIGHT_PRIMARY_LUMINANCE } from '../src/utils/primary-ink.ts'

const white = '#ffffff'
const black = '#000000'

const cases = [
  ['#00b368', white, 'qlean green: white on mid brand, not the higher black contrast'],
  ['#3633cd', white, 'dark brand stays white'],
  ['#0369a1', white, 'palette blue stays white'],
  ['#f97316', white, 'mid orange stays white'],
  ['#eab308', black, 'yellow is light: black'],
  ['#86efac', black, 'pale mint is light: black'],
  ['#f8fafc', black, 'near-white is light: black'],
]

for (const [hex, ink, label] of cases) {
  assert.equal(primaryForeground(hex).ink, ink, label)
}

assert.equal(LIGHT_PRIMARY_LUMINANCE, 0.45)
console.log(`ok ${cases.length} primary-ink cases`)
