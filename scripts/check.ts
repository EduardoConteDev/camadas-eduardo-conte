// Confere a estrutura do projeto e as respostas da API.
// Uso: com "npm start" rodando em outro terminal, execute "npm run check".
// Erros de tipo são conferidos à parte, com "npm run typecheck".

import fs from 'fs'
import path from 'path'

const root = path.join(__dirname, '..', 'src')
const BASE = 'http://localhost:3001'
let passed = 0
let failed = 0

function mark(ok: boolean, text: string, hint?: string) {
  if (ok) { passed++; console.log('  \u2714 ' + text) }
  else { failed++; console.log('  \u2718 ' + text + (hint ? '\n      hint: ' + hint : '')) }
}

function exists(rel: string) {
  return fs.existsSync(path.join(root, rel))
}

function filesIn(folder: string) {
  const p = path.join(root, folder)
  if (!fs.existsSync(p)) return []
  return fs.readdirSync(p)
    .filter(n => n.endsWith('.ts'))
    .map(n => ({ name: folder + '/' + n, text: fs.readFileSync(path.join(p, n), 'utf8') }))
}

const SQL = /\b(SELECT|INSERT|UPDATE|DELETE)\b/i
const BUSINESS_NUMBER = /1518|0\.11/

function structure() {
  console.log('\nStructure')
  for (const rel of [
    'controllers/employee.controller.ts',
    'services/employee.service.ts',
    'repositories/employee.repository.ts',
    'repositories/company.repository.ts',
    'routes/employee.routes.ts',
    'middlewares/error.middleware.ts'
  ]) mark(exists(rel), 'src/' + rel + ' exists')

  for (const f of [...filesIn('routes'), ...filesIn('controllers')]) {
    mark(!SQL.test(f.text), f.name + ' has no SQL', 'SQL belongs only in repositories')
    mark(!BUSINESS_NUMBER.test(f.text), f.name + ' has no business numbers', 'minimum wage and INSS belong in the service')
  }
  for (const f of filesIn('services')) {
    mark(!SQL.test(f.text), f.name + ' has no SQL', 'the service calls the repository, not the database')
    mark(!/\breq\.|\bres\.|from 'express'/.test(f.text), f.name + ' has no req/res/express', 'the service does not know about HTTP')
  }
  for (const f of filesIn('repositories')) {
    const concat = /\$\{/.test(f.text) || /['"`]\s*\+\s*\w/.test(f.text)
    mark(!concat, f.name + ' uses parameters (?) instead of concatenation', 'use ? and pass values to .get/.all/.run')
  }
  for (const f of filesIn('controllers')) {
    const statuses = (f.text.match(/status\((4|5)\d\d\)/g) || []).length
    mark(statuses === 0, f.name + ' does not choose error status codes', 'send errors to next(error); the middleware picks the status')
  }
}

async function call(method: string, route: string, body?: unknown) {
  const r = await fetch(BASE + route, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  })
  let data: any = null
  try { data = await r.json() } catch {}
  return { status: r.status, data }
}

async function api() {
  console.log('\nEmployees API (Part 2)')
  try { await fetch(BASE) } catch {
    mark(false, 'server responding at ' + BASE, 'run "npm start" in another terminal')
    return
  }
  const valid = { name: 'Ana Ribeiro', email: 'ana@acme.com', salary: 4200, companyId: 1 }
  let r = await call('POST', '/employees', valid)
  mark(r.status === 201, 'valid POST returns 201 (got ' + r.status + ')')
  r = await call('POST', '/employees', { ...valid, email: 'no-at-sign' })
  mark(r.status === 400, 'email without @ returns 400 (got ' + r.status + ')')
  r = await call('POST', '/employees', { ...valid, companyId: 99 })
  mark(r.status === 404, 'missing company returns 404 (got ' + r.status + ')')
  r = await call('POST', '/employees', { ...valid, salary: 800 })
  mark(r.status === 422, 'salary below minimum returns 422 (got ' + r.status + ')')
  r = await call('GET', '/companies/1/employees')
  mark(r.status === 200 && Array.isArray(r.data), 'list by company returns 200 with a JSON list')

  console.log('\nCompanies API (Part 3)')
  r = await call('GET', '/companies')
  if (r.status === 404 && !Array.isArray(r.data)) {
    console.log('  - company routes do not exist yet, expected before Part 3')
    return
  }
  mark(r.status === 200 && Array.isArray(r.data), 'GET /companies returns 200 with a list')
  r = await call('GET', '/companies/99')
  mark(r.status === 404, 'missing company returns 404 (got ' + r.status + ')')
  r = await call('POST', '/companies', { name: 'X', cnpj: '123', state: 'SPP' })
  mark(r.status === 400, 'badly formatted data returns 400 (got ' + r.status + ')')
  r = await call('POST', '/companies', { name: 'Acme Copy', cnpj: '12345678000190', state: 'SP' })
  mark(r.status === 422, 'duplicate CNPJ returns 422 (got ' + r.status + ')')
  const cnpj = String(Date.now()).padStart(14, '0').slice(-14)
  r = await call('POST', '/companies', { name: 'Test Company', cnpj, state: 'RJ' })
  mark(r.status === 201 && r.data && r.data.id, 'valid POST returns 201 with id (got ' + r.status + ')')
  const newId = r.data && r.data.id
  r = await call('DELETE', '/companies/1')
  mark(r.status === 422, 'deleting a company with employees returns 422 (got ' + r.status + ')')
  if (newId) {
    r = await call('DELETE', '/companies/' + newId)
    mark(r.status === 204, 'deleting a company without employees returns 204 (got ' + r.status + ')')
  }
}

;(async () => {
  structure()
  await api()
  console.log('\n' + passed + ' passed, ' + failed + ' failed\n')
})()
