import mongoose, { type Document, Schema } from 'mongoose'

interface GeoCoordinates {
  latitude: number
  longitude: number
}

interface TirePressure {
  leftFront: number
  rightFront: number
  leftRear: number
  rightRear: number
}

interface TireCondition {
  leftFront: 'Good' | 'Ok' | 'Needs Replacement'
  rightFront: 'Good' | 'Ok' | 'Needs Replacement'
  leftRear: 'Good' | 'Ok' | 'Needs Replacement'
  rightRear: 'Good' | 'Ok' | 'Needs Replacement'
}

interface Battery {
  make: string
  replacementDate: Date
  voltage: string
  waterLevel: 'Good' | 'Ok' | 'Low'
  condition: 'Y' | 'N'
  leakOrRust: 'Y' | 'N'
  overallBatterySummary?: string
  attachedImages?: string[]
}

interface Exterior {
  rustDentDamage: 'Y' | 'N'
  oilLeakInSuspension: 'Y' | 'N'
  overallExteriorSummary?: string
  attachedImages?: string[]
}

interface Brakes {
  fluidLevel: 'Good' | 'Ok' | 'Low'
  conditionFront: 'Good' | 'Ok' | 'Needs Replacement'
  conditionRear: 'Good' | 'Ok' | 'Needs Replacement'
  emergencyBrake: 'Good' | 'Ok' | 'Low'
  overallBrakeSummary?: string
  attachedImages?: string[]
}

interface Engine {
  rustDentDamage: 'Y' | 'N'
  oilCondition: 'Good' | 'Bad'
  oilColor: 'Clean' | 'Brown' | 'Black'
  fluidCondition: 'Good' | 'Bad'
  fluidColor: 'Clean' | 'Brown' | 'Black'
  oilLeak: 'Y' | 'N'
  overallEngineSummary?: string
  attachedImages?: string[]
}

interface VoiceOfCustomer {
  feedback?: string
  attachedImages?: string[]
}

interface InspectionInterface extends Document {
  truckSerialNumber: string
  truckModel: string
  inspectionID: number
  inspectorName: string
  inspectionEmployeeID: string
  dateTime: Date
  location: string
  geoCoordinates: GeoCoordinates
  serviceMeterHours: number
  inspectorSignature: string
  customerName: string
  catCustomerID: string
  tires: {
    tirePressure: TirePressure
    tireCondition: TireCondition
    overallTireSummary?: string
    attachedImages?: string[]
  }
  battery: Battery
  exterior: Exterior
  brakes: Brakes
  engine: Engine
  voiceOfCustomer: VoiceOfCustomer
  reportSummary?: string
  completed: boolean
}

const inspectionSchema: Schema = new Schema({
  truckSerialNumber: { type: String, required: true },
  truckModel: { type: String, required: true },
  inspectionID: {
    type: Number,
    unique: true,
    required: true,
    autoIncrement: true
  },
  inspectorName: { type: String, required: true },
  inspectionEmployeeID: { type: String, required: true },
  dateTime: { type: Date, default: Date.now },
  location: { type: String, required: true },
  geoCoordinates: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  serviceMeterHours: { type: Number, required: true },
  inspectorSignature: { type: String, required: true },
  customerName: { type: String, required: true },
  catCustomerID: { type: String, required: true },
  tires: {
    tirePressure: {
      leftFront: { type: Number, required: true },
      rightFront: { type: Number, required: true },
      leftRear: { type: Number, required: true },
      rightRear: { type: Number, required: true }
    },
    tireCondition: {
      leftFront: {
        type: String,
        enum: ['Good', 'Ok', 'Needs Replacement'],
        required: true
      },
      rightFront: {
        type: String,
        enum: ['Good', 'Ok', 'Needs Replacement'],
        required: true
      },
      leftRear: {
        type: String,
        enum: ['Good', 'Ok', 'Needs Replacement'],
        required: true
      },
      rightRear: {
        type: String,
        enum: ['Good', 'Ok', 'Needs Replacement'],
        required: true
      }
    },
    overallTireSummary: { type: String, maxlength: 1000 },
    attachedImages: [{ type: String }]
  },
  battery: {
    make: { type: String, required: true },
    replacementDate: { type: Date, required: true },
    voltage: { type: String, required: true },
    waterLevel: { type: String, enum: ['Good', 'Ok', 'Low'], required: true },
    condition: { type: String, enum: ['Y', 'N'], required: true },
    leakOrRust: { type: String, enum: ['Y', 'N'], required: true },
    overallBatterySummary: { type: String, maxlength: 1000 },
    attachedImages: [{ type: String }]
  },
  exterior: {
    rustDentDamage: { type: String, enum: ['Y', 'N'], required: true },
    oilLeakInSuspension: { type: String, enum: ['Y', 'N'], required: true },
    overallExteriorSummary: { type: String, maxlength: 1000 },
    attachedImages: [{ type: String }]
  },
  brakes: {
    fluidLevel: { type: String, enum: ['Good', 'Ok', 'Low'], required: true },
    conditionFront: {
      type: String,
      enum: ['Good', 'Ok', 'Needs Replacement'],
      required: true
    },
    conditionRear: {
      type: String,
      enum: ['Good', 'Ok', 'Needs Replacement'],
      required: true
    },
    emergencyBrake: {
      type: String,
      enum: ['Good', 'Ok', 'Low'],
      required: true
    },
    overallBrakeSummary: { type: String, maxlength: 1000 },
    attachedImages: [{ type: String }]
  },
  engine: {
    rustDentDamage: { type: String, enum: ['Y', 'N'], required: true },
    oilCondition: { type: String, enum: ['Good', 'Bad'], required: true },
    oilColor: {
      type: String,
      enum: ['Clean', 'Brown', 'Black'],
      required: true
    },
    fluidCondition: { type: String, enum: ['Good', 'Bad'], required: true },
    fluidColor: {
      type: String,
      enum: ['Clean', 'Brown', 'Black'],
      required: true
    },
    oilLeak: { type: String, enum: ['Y', 'N'], required: true },
    overallEngineSummary: { type: String, maxlength: 1000 },
    attachedImages: [{ type: String }]
  },
  voiceOfCustomer: {
    feedback: { type: String },
    attachedImages: [{ type: String }]
  },
  reportSummary: { type: String, maxlength: 1000 },
  completed: { type: Boolean, default: false }
})

const InspectionModel = mongoose.model<InspectionInterface>('Inspection', inspectionSchema)

export { InspectionModel, type InspectionInterface }
