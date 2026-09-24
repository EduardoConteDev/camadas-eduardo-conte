import { Request, Response, NextFunction } from 'express'
import { InvalidInput, NotFound, RuleViolation } from '../errors'

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof InvalidInput) {
    return res.status(400).json({ error: error.message, fields: error.fields })
  }
  if (error instanceof NotFound) {
    return res.status(404).json({ error: error.message })
  }
  if (error instanceof RuleViolation) {
    return res.status(422).json({ error: error.message })
  }
  console.error(error)
  return res.status(500).json({ error: 'internal server error' })
}