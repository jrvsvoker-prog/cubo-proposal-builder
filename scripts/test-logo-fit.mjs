import assert from 'node:assert/strict'
import { isLogoMark, logoSize } from '../src/utils/logo-fit.ts'

const toData = (markup, mime = 'image/svg+xml') =>
  `data:${mime};base64,${Buffer.from(markup).toString('base64')}`

const wordmark = toData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 22"><path d="M0 0h62v22H0z"/></svg>')
const mark = toData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12"/></svg>')
const encoded = `data:image/svg+xml,${encodeURIComponent('<svg viewBox="0 0 24 24"></svg>')}`

assert.deepEqual(logoSize(wordmark), { width: 62, height: 22 })
assert.equal(isLogoMark(wordmark), false)
assert.deepEqual(logoSize(mark), { width: 32, height: 32 })
assert.equal(isLogoMark(mark), true)
assert.equal(isLogoMark(encoded), true)
assert.equal(isLogoMark(''), false)
assert.equal(isLogoMark('not-a-data-uri'), false)

console.log('ok 6 logo-fit cases')
