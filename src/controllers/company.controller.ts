import { Request, Response, NextFunction } from 'express'
import { companyDTO } from '../dtos/company.dto'
import { CompanyService } from '../services/company.service'

export class CompanyController {
  constructor(private service: CompanyService) {}

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await this.service.findAll()
      res.status(200).json(list)
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const company = await this.service.findById(id)
      res.status(200).json(company)
    } catch (error) {
      next(error)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = companyDTO(req.body)
      const created = await this.service.create(dto)
      res.status(201).json(created)
    } catch (error) {
      next(error)
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      await this.service.remove(id)
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  }
}