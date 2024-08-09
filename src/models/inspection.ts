import mongoose, { type Document, Schema } from 'mongoose'
import { type ReportInterface } from './report'
import { type batteryDtoType, type brakeDtoType, type engineDtoType, type exteriorDtoType, type feedbackDtoType, type generalDtoType, type tiresDtoType } from '@/api/routes/inspection/inspection.dto'

interface InspectionInterface extends Document {
  general: generalDtoType
  tires: tiresDtoType
  battery: batteryDtoType
  exterior: exteriorDtoType
  brake: brakeDtoType
  engine: engineDtoType
  feedback: feedbackDtoType
  completed: boolean
  report: ReportInterface['_id']
}

const inspectionSchema = new Schema({
  general: {
    type: Object,
    required: true
  },
  tires: {
    type: Object,
    required: true
  },
  battery: {
    type: Object,
    required: true
  },
  exterior: {
    type: Object,
    required: true
  },
  brake: {
    type: Object,
    required: true
  },
  engine: {
    type: Object,
    required: true
  },
  feedback: {
    type: Object,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  report: {
    type: Schema.Types.ObjectId,
    ref: 'Report',
    required: true
  }
})

const InspectionModel = mongoose.model<InspectionInterface>('Inspection', inspectionSchema)

export { InspectionModel, type InspectionInterface }
