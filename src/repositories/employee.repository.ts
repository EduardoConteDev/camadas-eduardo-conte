import { Database } from 'better-sqlite3';
import { Employee } from '../types';


export class EmployeeRepository {
  constructor(private db: Database) {}

  findById(id: number): Employee | undefined {
    return this.db
      .prepare('SELECT * FROM employees WHERE id = ?')
      .get(id) as Employee | undefined;
  }

  findByCompany(companyId: number): Employee[] {
    return this.db
      .prepare('SELECT * FROM employees WHERE company_id = ?')
      .all(companyId) as Employee[];
  }

  save(data: {name: string, email: string, gross_salary: number, net_salary: number, company_id: number}): Employee {
    const result = this.db
      .prepare(
        `INSERT INTO employees (name, email, gross_salary, net_salary, company_id)
         VALUES (?, ?, ?, ?, ?)`
      )
      .run(data.name, data.email, data.gross_salary, data.net_salary, data.company_id)

    return {
      id: Number(result.lastInsertRowid),
      name: data.name,
      email: data.email,
      gross_salary: data.gross_salary,
      net_salary: data.net_salary,
      company_id: data.company_id
    }
  }
}