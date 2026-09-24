import { NotFound, RuleViolation } from '../errors'
import { Company, NewCompany } from '../types'
import { CompanyRepository } from '../repositories/company.repository'
import { EmployeeRepository } from '../repositories/employee.repository'

export class CompanyService {
  constructor(
    private companies: CompanyRepository,
    private employees: EmployeeRepository
  ) {}

  async findAll(): Promise<Company[]> {
    return this.companies.findAll()
  }

  async findById(id: number): Promise<Company> {
    const company = this.companies.findById(id)
    if (!company) throw new NotFound('company')
    return company
  }

  async create(data: NewCompany): Promise<Company> {
    const existing = this.companies.findByCnpj(data.cnpj)
    if (existing) {
      throw new RuleViolation('duplicate CNPJ')
    }
    return this.companies.save(data)
  }

  async remove(id: number): Promise<void> {
    const company = this.companies.findById(id)
    if (!company) throw new NotFound('company')

    const employees = this.employees.findByCompany(id)
    if (employees.length > 0) {
      throw new RuleViolation('company has employees')
    }

    this.companies.remove(id)
  }
}