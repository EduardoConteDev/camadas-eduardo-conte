// ANTES: uma rota que faz sete coisas diferentes.
// Este é o código do exercício 1. Não use como referência de projeto,
// use como material de leitura crítica.
//
// As sete responsabilidades, marcadas no código abaixo:
//   1. ler e desestruturar a requisição HTTP
//   2. validar formato dos dados de entrada
//   3. consultar o banco de dados direto, com SQL cru
//   4. aplicar regra de negócio (mínimo e desconto de INSS)
//   5. persistir o registro
//   6. decidir o status code de cada erro
//   7. montar o HTML da resposta
// E de brinde: injeção de SQL, em (3) e (5).

import path from 'path'
import express from 'express'
import Database from 'better-sqlite3'

const db = new Database(path.join(__dirname, '..', 'data.db'))
const app = express()
app.use(express.json())

app.post('/employees', (req, res) => {
  // [1] ler e desestruturar a requisição
  const { name, email, salary, companyId } = req.body

  // [2] validar formato          [6] escolher o status code do erro
  if (!name || name.length < 3) return res.status(400).send('invalid name')
  if (!email || !email.includes('@')) return res.status(400).send('invalid email')

  // [3] consultar o banco direto, com SQL concatenado (injeção de SQL)
  const company = db.prepare(
    'SELECT * FROM companies WHERE id = ' + companyId
  ).get()
  // [6] status code decidido aqui também
  if (!company) return res.status(404).send('company not found')

  // [4] regra de negócio solta no meio da rota
  const gross = Number(salary)
  if (gross < 1518) return res.status(422).send('salary below minimum wage') // [6]
  const inss = gross * 0.11
  const net = gross - inss

  // [5] persistir, também concatenando (injeção de SQL)
  db.exec(`INSERT INTO employees
    (name, email, gross_salary, net_salary, company_id)
    VALUES ('${name}', '${email}', ${gross}, ${net}, ${companyId})`)

  // [7] montar o HTML da resposta
  res.send(`<h1>${name} created</h1>
    <p>Net salary: R$ ${net.toFixed(2)}</p>`)
})

app.get('/companies/:id/employees', (req, res) => {
  // [1] ler a requisição   [3] consultar o banco direto, concatenando
  const rows = db.prepare(
    'SELECT * FROM employees WHERE company_id = ' + req.params.id
  ).all() as any[]

  // [7] montar o HTML da resposta
  let html = '<ul>'
  for (const r of rows) {
    // [4] formatação e cálculo de exibição misturados na montagem
    html += '<li>' + r.name + ', R$ ' + r.net_salary.toFixed(2) + '</li>'
  }
  html += '</ul>'
  res.send(html)
})

app.listen(3000, () => console.log('legacy: http://localhost:3000'))
