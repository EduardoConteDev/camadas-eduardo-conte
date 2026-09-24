import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';

export function employeeRoutes(controller: EmployeeController): Router {
  const router = Router();

  router.post('/employees', (req, res, next) => {
    controller.create(req, res, next);
  });

  router.get('/companies/:id/employees', (req, res, next) => {
    controller.findByCompany(req, res, next);
  });

  return router;
}