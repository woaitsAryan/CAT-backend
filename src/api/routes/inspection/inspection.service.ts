import { type batteryDtoType, type brakeDtoType, type engineDtoType, type exteriorDtoType, type feedbackDtoType, type tiresDtoType, type generalDtoType } from './inspection.dto'
import { InspectionModel } from '@/models/inspection'
import { ErrorBadRequest } from '@/helpers/errors'

export const InspectionService = {
  Create: async (reportId: string): Promise<{ inspectionId: string }> => {
    const existingReport = await InspectionModel.findOne({ report: reportId })
    if (existingReport != null) {
      throw new ErrorBadRequest('Report already exists')
    }

    const newInspection = new InspectionModel({
      general: {},
      tires: {},
      battery: {},
      exterior: {},
      brake: {},
      engine: {},
      feedback: {},
      completed: false,
      report: reportId
    })
    await newInspection.save()
    return { inspectionId: newInspection._id as string }
  },
  General: async (
    generalReportDto: generalDtoType,
    reportId: string
  ): Promise<void> => {
    const existingReport = await InspectionModel.findOne({ report: reportId })
    if (existingReport == null) {
      throw new ErrorBadRequest('Report doesn\'t exist')
    }
    existingReport.general = generalReportDto
    await existingReport.save()
  },
  Tires: async (
    tiresReportDto: tiresDtoType,
    reportId: string
  ): Promise<void> => {
    const existingReport = await InspectionModel.findOne({ report: reportId })
    if (existingReport == null) {
      throw new ErrorBadRequest('Report doesn\'t exist')
    }
    existingReport.tires = tiresReportDto
    await existingReport.save()
  },
  Battery: async (
    batteryReportDto: batteryDtoType,
    reportId: string
  ): Promise<void> => {
    const existingReport = await InspectionModel.findOne({ report: reportId })
    if (existingReport == null) {
      throw new ErrorBadRequest('Report doesn\'t exist')
    }
    existingReport.battery = batteryReportDto
    await existingReport.save()
  },
  Exterior: async (
    exteriorReportDto: exteriorDtoType,
    reportId: string
  ): Promise<void> => {
    const existingReport = await InspectionModel.findOne({ report: reportId })
    if (existingReport == null) {
      throw new ErrorBadRequest('Report doesn\'t exist')
    }
    existingReport.exterior = exteriorReportDto
    await existingReport.save()
  },
  Brake: async (
    brakeReportDto: brakeDtoType,
    reportId: string
  ): Promise<void> => {
    const existingReport = await InspectionModel.findOne({ report: reportId })
    if (existingReport == null) {
      throw new ErrorBadRequest('Report doesn\'t exist')
    }
    existingReport.brake = brakeReportDto
    await existingReport.save()
  },
  Engine: async (
    engineReportDto: engineDtoType,
    reportId: string
  ): Promise<void> => {
    const existingReport = await InspectionModel.findOne({ report: reportId })
    if (existingReport == null) {
      throw new ErrorBadRequest('Report doesn\'t exist')
    }
    existingReport.engine = engineReportDto
    await existingReport.save()
  },
  Feedback: async (
    feedbackReportDto: feedbackDtoType,
    reportId: string
  ): Promise<void> => {
    const existingReport = await InspectionModel.findOne({ report: reportId })
    if (existingReport == null) {
      throw new ErrorBadRequest('Report doesn\'t exist')
    }
    existingReport.feedback = feedbackReportDto
    await existingReport.save()
  }
}
