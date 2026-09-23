import fs from 'fs'
import path from 'path'
import Database from 'better-sqlite3'

// Recria o banco do zero e insere duas empresas de exemplo.
const db = new Database(path.join(__dirname, '..', 'data.db'))
db.exec(fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8'))

const insert = db.prepare('INSERT INTO companies (name, cnpj, state) VALUES (?, ?, ?)')
insert.run('Acme Indústria', '12345678000190', 'SP')
insert.run('Bravo Logística', '98765432000111', 'MG')

console.log('Database created at data.db with 2 companies.')
