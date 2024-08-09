import { Router } from 'express'
import { ReportController } from './report.controller'

const reportRouter = Router()

export default (app: Router): void => {
  app.use('/report', reportRouter)

  reportRouter.post('/start', ReportController.Start)
}
