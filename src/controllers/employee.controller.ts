import { Request, Response, NextFunction } from 'express'
import { employeeDTO } from '../dtos/employee.dto'
import { EmployeeService } from '../services/employee.service'

export class EmployeeController {
  constructor(private service: EmployeeService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = employeeDTO(req.body)
      const created = await this.service.create(dto)
      res.status(201).json(created)
    } catch (error) {
      next(error)
    }
  }

  async findByCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = Number(req.params.id)
      const list = await this.service.findByCompany(companyId)
      res.status(200).json(list)
    } catch (error) {
      next(error)
    }
  }
}