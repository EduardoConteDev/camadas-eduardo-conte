import { InvalidInput } from '../errors'
import { NewEmployee } from '../types'

export function employeeDTO(body: unknown): NewEmployee {
  const data = body as Record<string, unknown>

  if (!data || typeof data.name !== 'string' ||
    data.name.length < 3 || 
    typeof data.email !== 'string' || 
    !data.email.includes('@') ||
    typeof data.salary !== 'number' ||
    typeof data.companyId !== 'number'
  ) {
    throw new InvalidInput(['e-mail sem @, nome curto ou dados inválidos'])
  }

  return {
    name: data.name as string,
    email: data.email as string,
    salary: data.salary as number,
    companyId: data.companyId as number
  }
}