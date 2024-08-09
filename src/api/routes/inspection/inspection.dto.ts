import { z } from 'zod'

const generalDto = z.object({
  truckSerialNumber: z.string(),
  truckModel: z.string(),
  inspectionID: z.string(),
  inspectorName: z.string(),
  inspectionEmployeeID: z.string(),
  dateTime: z.date().default(() => new Date()),
  location: z.string(),
  geoCoordinates: z.string(),
  serviceMeterHours: z.number(),
  inspectorSignature: z.string(),
  customerName: z.string(),
  catCustomerID: z.string()
})

const tiresDto = z.object({
  leftFrontPressure: z.number().positive(),
  rightFrontPressure: z.number().positive(),
  leftFrontCondition: z.enum(['Good', 'Ok', 'Needs Replacement']),
  rightFrontCondition: z.enum(['Good', 'Ok', 'Needs Replacement']),
  leftRearPressure: z.number().positive(),
  rightRearPressure: z.number().positive(),
  leftRearCondition: z.enum(['Good', 'Ok', 'Needs Replacement']),
  rightRearCondition: z.enum(['Good', 'Ok', 'Needs Replacement']),
  overallTireSummary: z.string().max(1000),
  attachedImages: z.array(z.string().url())
})

const batteryDto = z.object({
  make: z.enum(['CAT', 'ABC', 'XYZ', 'Other']),
  replacementDate: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: 'Invalid date format'
  }),
  voltage: z.string().regex(/^\d+V$/, { message: 'Invalid voltage format' }),
  waterLevel: z.enum(['Good', 'Ok', 'Low']),
  damage: z.boolean(),
  damageImage: z.string().optional(),
  leakOrRust: z.boolean(),
  summary: z.string().max(1000),
  attachedImages: z.array(z.string()).optional()
})

const exteriorDto = z.object({
  rustDentDamage: z.boolean(),
  rustDentDamageNotes: z.string().optional(),
  rustDentDamageImages: z.array(z.string().url()).optional(),
  oilLeakSuspension: z.boolean(),
  overallSummary: z.string().max(1000),
  attachedImages: z.array(z.string().url()).optional()
})

const brakeDto = z.object({
  brakeFluidLevel: z.enum(['Good', 'Ok', 'Low']),
  frontBrakeCondition: z.enum(['Good', 'Ok', 'Needs Replacement']),
  rearBrakeCondition: z.enum(['Good', 'Ok', 'Needs Replacement']),
  emergencyBrakeCondition: z.enum(['Good', 'Ok', 'Low']),
  brakeOverallSummary: z.string().max(1000),
  attachedImages: z.array(z.string().url()).optional()
})

const engineDto = z.object({
  rustDentDamageEngine: z.boolean(),
  rustDentDamageEngineNotes: z.string().optional(),
  rustDentDamageEngineImages: z.array(z.string().url()).optional(),
  engineOilCondition: z.enum(['Good', 'Bad']),
  engineOilColor: z.enum(['Clean', 'Brown', 'Black', 'Other']),
  brakeFluidCondition: z.enum(['Good', 'Bad']),
  brakeFluidColor: z.enum(['Clean', 'Brown', 'Black', 'Other']),
  oilLeakEngine: z.boolean(),
  overallSummary: z.string().max(1000),
  attachedImages: z.array(z.string().url()).optional()
})

const feedbackDto = z.object({
  customerFeedback: z.string().optional(),
  feedbackImages: z.array(z.string().url()).optional()
})

type generalDtoType = z.infer<typeof generalDto>
type tiresDtoType = z.infer<typeof tiresDto>
type batteryDtoType = z.infer<typeof batteryDto>
type exteriorDtoType = z.infer<typeof exteriorDto>
type brakeDtoType = z.infer<typeof brakeDto>
type engineDtoType = z.infer<typeof engineDto>
type feedbackDtoType = z.infer<typeof feedbackDto>

export { tiresDto, generalDto, batteryDto, exteriorDto, brakeDto, engineDto, feedbackDto }
export { type generalDtoType, type tiresDtoType, type batteryDtoType, type exteriorDtoType, type brakeDtoType, type engineDtoType, type feedbackDtoType }
