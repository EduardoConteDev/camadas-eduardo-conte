import { Database } from 'better-sqlite3';
import { Company, NewCompany } from '../types';

export class CompanyRepository {
  constructor(private db: Database) {}

  findById(id: number): Company | undefined {
    return this.db
      .prepare('SELECT * FROM companies WHERE id = ?')
      .get(id) as Company | undefined;
  }
  
}