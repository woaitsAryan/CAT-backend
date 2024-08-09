import { ReportModel } from '@/models/report'
import { type startReportDtoType } from './report.dto'

export const ReportService = {
  StartReport: async (
    startReportDto: startReportDtoType
  ): Promise<{ reportId: string }> => {
    const newReport = new ReportModel({
      name: startReportDto.name,
      location: startReportDto.location
    })
    await newReport.save()
    return { reportId: newReport._id as string }
  }
}
