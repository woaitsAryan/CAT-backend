import mongoose, { type Document } from 'mongoose'

interface ReportInterface extends Document {
  name: string
  location: string
}

const reportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now }
})

reportSchema.set('toJSON', {
  transform: function (_doc, ret, _options) {
    delete ret._id
    delete ret.__v
    return ret
  }
})

const ReportModel = mongoose.model<ReportInterface>('Report', reportSchema)

export { ReportModel, type ReportInterface }
