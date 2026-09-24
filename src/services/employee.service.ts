import { EmployeeRepository } from '../repositories/employee.repository';
import { Employee, NewEmployee } from '../types';
import { NotFound, RuleViolation } from '../errors';
import { CompanyRepository } from '../repositories/company.repository';

const MINIMO_SALARIAL = 1518;
const TAXA_INSS = 0.11;

export class EmployeeService {
  constructor(private employees: EmployeeRepository, private companies: CompanyRepository) {}

  async create(data: NewEmployee): Promise<Employee> {

    const company = this.companies.findById(data.companyId);
    if (!company) {
      throw new NotFound('empresa inexistente');
    }

    if (data.salary < MINIMO_SALARIAL) {
      throw new RuleViolation('salário abaixo de 1518');
    }

    const inss = data.salary * TAXA_INSS;
    const netSalary = data.salary - inss;

    const employeeData = {
      name: data.name,
      email: data.email,
      gross_salary: data.salary,
      net_salary: netSalary,
      company_id: data.companyId,
    };

    const newId = this.employees.save(employeeData);

    return {
      id: Number(newId),
      ...employeeData
    } as unknown as Employee;
  }

  async findByCompany(companyId: number): Promise<Employee[]> {
    return this.employees.findByCompany(companyId);
  }

}