import mongoose, { type Document } from 'mongoose'

interface Name {
  firstName: string
  lastName: string
}

interface UserInterface extends Document {
  name: Name
  email: string
  password: string
  employeeID: string
  role: 'Inspector' | 'Admin'
  contactNumber?: string
  dateCreated: Date
}

const userSchema = new mongoose.Schema({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
  },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  employeeID: { type: String, unique: true, required: true },
  role: {
    type: String,
    enum: ['Inspector', 'Admin'],
    required: true
  },
  contactNumber: { type: String },
  dateCreated: { type: Date, default: Date.now }
})

userSchema.set('toJSON', {
  transform: function (_doc, ret, _options) {
    delete ret.password
    delete ret._id
    delete ret.__v
    return ret
  }
})

const UserModel = mongoose.model<UserInterface>('User', userSchema)

export { UserModel, type UserInterface }
