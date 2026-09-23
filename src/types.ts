// Formato das linhas do banco e dos dados de entrada já validados.

export interface Company {
  id: number
  name: string
  cnpj: string
  state: string
}

export interface Employee {
  id: number
  name: string
  email: string
  gross_salary: number
  net_salary: number
  company_id: number
}

export interface NewEmployee {
  name: string
  email: string
  salary: number
  companyId: number
}

export interface NewCompany {
  name: string
  cnpj: string
  state: string
}
