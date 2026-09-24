import path from 'path'
import express from 'express'
import Database from 'better-sqlite3'

import { EmployeeRepository } from './repositories/employee.repository'
import { CompanyRepository } from './repositories/company.repository'
import { EmployeeService } from './services/employee.service'
import { EmployeeController } from './controllers/employee.controller'
import { employeeRoutes } from './routes/employee.routes'
import { errorMiddleware } from './middlewares/error.middleware'

// Parte 3: descomente as linhas marcadas com [P3]
import { CompanyService } from './services/company.service'  // [P3]
import { CompanyController } from './controllers/company.controller'  // [P3]
import { companyRoutes } from './routes/company.routes'  // [P3]

// Composição: o único lugar do projeto que conhece as classes concretas.
const db = new Database(path.join(__dirname, '..', 'data.db'))
const employeeRepo = new EmployeeRepository(db)
const companyRepo = new CompanyRepository(db)

const employeeController = new EmployeeController(
  new EmployeeService(employeeRepo, companyRepo)
)
const companyController = new CompanyController(  // [P3]
  new CompanyService(companyRepo, employeeRepo)  // [P3]
)  // [P3]

const app = express()
app.use(express.json())
app.use(employeeRoutes(employeeController))
app.use(companyRoutes(companyController))  // [P3]
app.use(errorMiddleware)

app.listen(3001, () => console.log('layered: http://localhost:3001'))
