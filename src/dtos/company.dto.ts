import { InvalidInput } from '../errors'
import { NewCompany } from '../types'

export function companyDTO(body: unknown): NewCompany {
  const data = body as Record<string, unknown>
  const fields: string[] = []

  if (!data || typeof data.name !== 'string' || data.name.length < 3) {
    fields.push('name')
  }
  if (!data || typeof data.cnpj !== 'string' || !/^\d{14}$/.test(data.cnpj)) {
    fields.push('cnpj')
  }
  if (!data || typeof data.state !== 'string' || !/^[A-Za-z]{2}$/.test(data.state)) {
    fields.push('state')
  }

  if (fields.length > 0) {
    throw new InvalidInput(fields)
  }

  return {
    name: data.name as string,
    cnpj: data.cnpj as string,
    state: data.state as string
  }
}