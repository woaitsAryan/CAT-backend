import catchAsync from '../../../helpers/catchAsync'
import type { Response, Request } from 'express'
import { ErrorBadRequest } from '../../../helpers/errors'
import { batteryDto, brakeDto, engineDto, exteriorDto, feedbackDto, generalDto, tiresDto } from './inspection.dto'
import { InspectionService } from './inspection.service'

export const InspectionController = {
  Create: catchAsync(
    async (req: Request, res: Response) => {
      const reportId = req.params.id
      if (reportId == null) {
        throw new ErrorBadRequest('Invalid input')
      }

      const { inspectionId } = await InspectionService.Create(reportId)
      return res.json({ data: { inspectionId }, success: true, message: 'Report created successfully' })
    }
  ),
  General: catchAsync(
    async (req: Request, res: Response) => {
      const validatedBody = generalDto.safeParse(req.body)
      if (!validatedBody.success) {
        throw new ErrorBadRequest('Invalid input')
      }
      const reportId = req.params.id
      if (reportId == null) {
        throw new ErrorBadRequest('Invalid input')
      }

      await InspectionService.General(validatedBody.data, reportId)
      return res.json({ data: {}, success: true, message: 'Report created successfully' })
    }
  ),
  Tires: catchAsync(
    async (req: Request, res: Response) => {
      const validatedBody = tiresDto.safeParse(req.body)
      if (!validatedBody.success) {
        throw new ErrorBadRequest('Invalid input')
      }
      const reportId = req.params.id
      if (reportId == null) {
        throw new ErrorBadRequest('Invalid input')
      }

      await InspectionService.Tires(validatedBody.data, reportId)
      return res.json({ data: {}, success: true, message: 'Report created successfully' })
    }
  ),
  Battery: catchAsync(
    async (req: Request, res: Response) => {
      const validatedBody = batteryDto.safeParse(req.body)
      if (!validatedBody.success) {
        throw new ErrorBadRequest('Invalid input')
      }
      const reportId = req.params.id
      if (reportId == null) {
        throw new ErrorBadRequest('Invalid input')
      }

      await InspectionService.Battery(validatedBody.data, reportId)
      return res.json({ data: { }, success: true, message: 'Report created successfully' })
    }
  ),
  Exterior: catchAsync(
    async (req: Request, res: Response) => {
      const validatedBody = exteriorDto.safeParse(req.body)
      if (!validatedBody.success) {
        throw new ErrorBadRequest('Invalid input')
      }
      const reportId = req.params.id
      if (reportId == null) {
        throw new ErrorBadRequest('Invalid input')
      }

      await InspectionService.Exterior(validatedBody.data, reportId)
      return res.json({ data: { }, success: true, message: 'Report created successfully' })
    }
  ),
  Brake: catchAsync(
    async (req: Request, res: Response) => {
      const validatedBody = brakeDto.safeParse(req.body)
      if (!validatedBody.success) {
        throw new ErrorBadRequest('Invalid input')
      }
      const reportId = req.params.id
      if (reportId == null) {
        throw new ErrorBadRequest('Invalid input')
      }

      await InspectionService.Brake(validatedBody.data, reportId)
      return res.json({ data: { }, success: true, message: 'Report created successfully' })
    }
  ),
  Engine: catchAsync(
    async (req: Request, res: Response) => {
      const validatedBody = engineDto.safeParse(req.body)
      if (!validatedBody.success) {
        throw new ErrorBadRequest('Invalid input')
      }
      const reportId = req.params.id
      if (reportId == null) {
        throw new ErrorBadRequest('Invalid input')
      }

      await InspectionService.Engine(validatedBody.data, reportId)
      return res.json({ data: { }, success: true, message: 'Report created successfully' })
    }
  ),
  Feedback: catchAsync(
    async (req: Request, res: Response) => {
      const validatedBody = feedbackDto.safeParse(req.body)
      if (!validatedBody.success) {
        throw new ErrorBadRequest('Invalid input')
      }
      const reportId = req.params.id
      if (reportId == null) {
        throw new ErrorBadRequest('Invalid input')
      }

      await InspectionService.Feedback(validatedBody.data, reportId)
      return res.json({ data: { }, success: true, message: 'Report created successfully' })
    }
  )

}
