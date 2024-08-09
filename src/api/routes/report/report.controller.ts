import catchAsync from '../../../helpers/catchAsync'
import type { Response, Request } from 'express'
import { ErrorBadRequest } from '../../../helpers/errors'
import { startReportDto } from './report.dto'
import { ReportService } from './report.service'

export const ReportController = {
  Start: catchAsync(
    async (req: Request, res: Response) => {
      const validatedBody = startReportDto.safeParse(req.body)
      if (!validatedBody.success) {
        throw new ErrorBadRequest('Invalid input')
      }

      const { reportId } = await ReportService.StartReport(validatedBody.data)
      return res.json({ data: { reportId }, success: true, message: 'Report created successfully' })
    }
  )

}
