import { ErrorBadRequest } from '../../../helpers/errors'
import { type loginDtoType, type registerDtoType } from './auth.dto'
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { type UserInterface } from '../../../models/user'
import { UserModel } from '../../../models/user'
import envHandler from '../../../config/envHandler'

export const AuthService = {
  Register: async (registerDto: registerDtoType): Promise<{ token: string, user: UserInterface }> => {
    const existingUser = await UserModel.findOne({ email: registerDto.email })
    if (existingUser != null) {
      throw new ErrorBadRequest('Email already exists')
    }
    const salt = randomBytes(16).toString('hex')
    const hashedpassword = scryptSync(registerDto.password, salt, 32).toString('hex') + salt
    const newUser = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      name: registerDto.name,
      email: registerDto.email,
      password: hashedpassword,
      employeeID: registerDto.employeeID,
      role: registerDto.role,
      contactNumber: registerDto.contactNumber
    })
    await newUser.save()
    const token = jwt.sign({ userID: newUser._id }, envHandler.JWT_KEY, {
      expiresIn: '30d'
    })

    return { token, user: newUser }
  },

  Login: async (loginDto: loginDtoType): Promise<{ token: string, user: UserInterface }> => {
    const user = await UserModel.findOne({ email: loginDto.email })
    if (user === null) {
      throw new ErrorBadRequest('Invalid username or password')
    }
    const salt = user.password.slice(64)
    const originalHash = user.password.slice(0, 64)
    const hashedPassword = scryptSync(loginDto.password, salt, 32).toString('hex')
    const result = timingSafeEqual(Buffer.from(originalHash), Buffer.from(hashedPassword))
    if (!result) {
      throw new ErrorBadRequest('Invalid username or password')
    }
    const token = jwt.sign({ userID: user._id }, envHandler.JWT_KEY, {
      expiresIn: '30d'
    })
    return { token, user }
  }
}
