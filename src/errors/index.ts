// Erros de domínio, sem status code dentro.
// Quem traduz para HTTP é o middleware de erro.

export class DomainError extends Error {}

// Formato inválido na entrada. Vira 400.
export class InvalidInput extends DomainError {
  constructor(public fields: string[] = []) {
    super('invalid input')
  }
}

// Recurso não existe. Vira 404.
export class NotFound extends DomainError {
  constructor(resource: string) {
    super(resource + ' not found')
  }
}

// Regra de negócio violada. Vira 422.
export class RuleViolation extends DomainError {
  constructor(reason: string) {
    super(reason)
  }
}
