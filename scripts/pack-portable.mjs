#!/usr/bin/env node
/**
 * Собирает переносимую папку Cubo Proposal Builder без монорепозитория.
 * Приложение оказывается в корне выдачи: рядом AGENTS.md, README.md,
 * package.json, src/, scripts/, docs/. Не меняет UI, профили, генератор
 * и vendor: только копирует разрешённый состав и проверяет его на
 * локальные пути.
 *
 *   node scripts/pack-portable.mjs --out /path/to/cubo-proposal-builder
 *
 * Образец собирается сам в процессе упаковки штатной командой
 * `npx vite build --mode mayak-mvp --outDir dist/mayak-mvp`:
 * в выдачу попадает только результат успешной сборки этой версии исходников.
 */
import { execFileSync } from 'node:child_process'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

function runtimeVersions() {
  const npm = execFileSync('npm', ['-v'], { encoding: 'utf8' }).trim()
  return { node: process.version.replace(/^v/, ''), npm }
}

const appRoot = fileURLToPath(new URL('..', import.meta.url))

// Демо-профили, разрешённые в выдаче. Остальные профили — служебные
// фикстуры проверок и в пакет не входят.
const DEMO_PROFILES = ['school', 'service', 'mehanika', 'kontur', 'mayak-mvp']

const INCLUDE = [
  'package.json',
  'package-lock.json',
  '.npmrc',
  'vite.config.ts',
  'tsconfig.json',
  'index.html',
  'stand.html',
  'AGENTS.md',
  'README.md',
  'src/',
  'vendor/cubo/',
  'scripts/profile.mjs',
  'scripts/profile-draft.mjs',
  'scripts/test-proposal.mjs',
  'scripts/test-profile-draft.mjs',
  'scripts/pack-portable.mjs',
  'docs/context.md',
  'docs/dynamic-proposal/agent-runbook.md',
  'docs/dynamic-proposal/builder-pipeline.md',
  'docs/dynamic-proposal/ui-rules.md',
  'docs/dynamic-proposal/LOGIC.md',
  'docs/dynamic-proposal/how-it-works.md',
  'docs/dynamic-proposal/data-contract.md',
  'docs/dynamic-proposal/runs/mehanika/',
  'docs/dynamic-proposal/runs/mayak-mvp/',
]

const EXCLUDE = [
  (relative) => relative.startsWith('src/data/profiles/')
    && !DEMO_PROFILES.some((slug) => relative === `src/data/profiles/${slug}.json`),
]

const SKIP_DIRS = new Set(['node_modules', 'dist', 'dist-snapshots'])

// Проверка всех текстовых файлов выдачи: локальные пути и служебные ссылки
// нашей машины в пакете недопустимы. Упоминание протокола file:// в
// документах — легально (критерий проверки HTML), запрещены только
// file:-зависимости в package.json/package-lock.json.
const HOST_MARKERS = ['/' + 'Users/', 'cubo-' + 'worktrees']
const TEXT_EXT = new Set(['.json', '.md', '.ts', '.tsx', '.mjs', '.js', '.scss', '.css', '.html', '.txt', '.yml', '.yaml', '.npmrc', '.gitignore'])

function fail(message) {
  throw new Error(message)
}

function parseArgs(argv) {
  const outIndex = argv.indexOf('--out')
  if (outIndex === -1 || !argv[outIndex + 1]) fail('Usage: node scripts/pack-portable.mjs --out <dir>')
  if (argv.some((arg, index) => arg !== '--out' && index !== outIndex + 1)) fail('Usage: node scripts/pack-portable.mjs --out <dir>')
  return path.resolve(argv[outIndex + 1])
}

function matchesInclude(relative) {
  return INCLUDE.some((rule) => rule.endsWith('/') ? relative === rule.slice(0, -1) || relative.startsWith(rule) : relative === rule)
}

function matchesExclude(relative) {
  return EXCLUDE.some((rule) => rule(relative))
}

function walkFiles(dir, base = dir) {
  const entries = []
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name)
    const relative = path.relative(base, full).split(path.sep).join('/')
    if (name.isDirectory()) {
      if (SKIP_DIRS.has(name.name)) continue
      entries.push(...walkFiles(full, base))
    } else if (name.isFile()) entries.push({ full, relative })
    else fail(`Refusing to pack special file: ${relative}`)
  }
  return entries
}

function sha256File(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')
}

// .gitignore выдачи: новые вводные, research, логотипы, клиентские профили
// и HTML — локальные материалы, в репозиторий выдачи не коммитятся.
// Явно разрешённые синтетические примеры сохранены исключениями.
function packageGitignore() {
  return `node_modules
dist/
dist-snapshots/

# Локальные материалы клиентских запусков (вводные, research, логотипы)
client-materials/
docs/dynamic-proposal/runs/*
!docs/dynamic-proposal/runs/mehanika/
!docs/dynamic-proposal/runs/mayak-mvp/

# Сгенерированные клиентские профили; демо-примеры остаются
src/data/profiles/*.json
${DEMO_PROFILES.map((slug) => `!src/data/profiles/${slug}.json`).join('\n')}
`
}

function main() {
  const outDir = parseArgs(process.argv.slice(2))
  if (fs.existsSync(outDir)) {
    const names = fs.readdirSync(outDir)
    if (names.length) fail(`Refusing to write into a non-empty directory: ${outDir}`)
  }
  fs.mkdirSync(outDir, { recursive: true })

  const selected = walkFiles(appRoot)
    .filter((entry) => matchesInclude(entry.relative) && !matchesExclude(entry.relative))
    .sort((a, b) => a.relative.localeCompare(b.relative))
  if (!selected.length) fail('Include list matched no files')
  for (const rule of INCLUDE) {
    const found = selected.some((entry) => rule.endsWith('/') ? entry.relative.startsWith(rule) : entry.relative === rule)
    if (!found) fail(`Missing included path: ${rule}`)
  }

  // Образец HTML собирается здесь же, из этих же исходников: подложенный
  // старый файл перезаписывается свежей сборкой, а ошибка сборки прерывает
  // упаковку до копирования файлов — готового пакета не объявляется.
  execFileSync('npx', ['vite', 'build', '--mode', 'mayak-mvp', '--outDir', 'dist/mayak-mvp'], {
    cwd: appRoot,
    stdio: 'inherit',
  })
  const sampleSource = path.join(appRoot, 'dist/mayak-mvp/index.html')
  if (!fs.existsSync(sampleSource)) {
    fail('Sample build did not produce dist/mayak-mvp/index.html')
  }

  const files = []
  const copy = (source, relative) => {
    const dest = path.join(outDir, relative)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.copyFileSync(source, dest)
    fs.chmodSync(dest, fs.statSync(source).mode & 0o777)
    files.push({ path: relative.split(path.sep).join('/'), bytes: fs.statSync(dest).size, sha256: sha256File(dest) })
  }

  for (const entry of selected) {
    copy(entry.full, entry.relative)
    const ext = path.extname(entry.relative)
    if (TEXT_EXT.has(ext) || !ext) {
      const text = fs.readFileSync(path.join(outDir, entry.relative), 'utf8')
      for (const marker of HOST_MARKERS) {
        if (text.includes(marker)) fail(`Packed file still contains a host marker "${marker}": ${entry.relative}`)
      }
      if ((entry.relative === 'package.json' || entry.relative === 'package-lock.json') && /["']file:/.test(text)) {
        fail(`Packed manifest still contains a file: dependency: ${entry.relative}`)
      }
    }
  }

  copy(sampleSource, 'examples/mayak-mvp.html')

  const gitignoreDest = path.join(outDir, '.gitignore')
  fs.writeFileSync(gitignoreDest, packageGitignore())
  files.push({ path: '.gitignore', bytes: fs.statSync(gitignoreDest).size, sha256: sha256File(gitignoreDest) })

  const manifest = {
    task: 'task-16',
    name: 'cubo-proposal-builder',
    createdAt: new Date().toISOString(),
    runtime: runtimeVersions(),
    demoProfiles: DEMO_PROFILES,
    sample: 'examples/mayak-mvp.html',
    entry: { manager: 'README.md', agent: 'AGENTS.md', runbook: 'docs/dynamic-proposal/agent-runbook.md' },
    include: INCLUDE,
    exclude: ['node_modules', 'dist', 'dist-snapshots', 'docs/archive', 'docs/history.md', 'docs/lock', 'docs/design-explorations', 'docs/dynamic-proposal/tasks', 'docs/dynamic-proposal/reviews', 'scripts/check-browser.py', 'scripts/build-browser-fixtures.mjs', 'src/data/profiles/* (кроме demoProfiles)'],
    files: files.sort((a, b) => a.path.localeCompare(b.path)),
  }
  const catalog = manifest.files.map((file) => `${file.sha256}  ${file.path}\n`).join('')
  manifest.catalogSha256 = crypto.createHash('sha256').update(catalog).digest('hex')
  fs.writeFileSync(path.join(outDir, 'portable-manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
  console.log(`Portable folder: ${outDir}`)
  console.log(`Files: ${manifest.files.length}`)
  console.log(`catalogSha256: ${manifest.catalogSha256}`)
}

try { main() } catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
