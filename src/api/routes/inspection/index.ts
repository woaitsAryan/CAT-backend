import { Router } from 'express'
import { InspectionController } from './inspection.controller'

const inspectionRouter = Router()

export default (app: Router): void => {
  app.use('/inspection', inspectionRouter)

  inspectionRouter.post('/:id/create', InspectionController.Create)
  inspectionRouter.post('/:id/tires', InspectionController.Tires)
  inspectionRouter.post('/:id/battery', InspectionController.Battery)
  inspectionRouter.post('/:id/exterior', InspectionController.Exterior)
  inspectionRouter.post('/:id/engine', InspectionController.Engine)
  inspectionRouter.post('/:id/feedback', InspectionController.Feedback)
  inspectionRouter.post('/:id/brake', InspectionController.Brake)
}
