import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import envHandler from '../../config/envHandler'
import logger from '../../loaders/logger'
import { UserModel } from '@/models/user'

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (
    req.headers.authorization == null ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    res.status(400).json({ error: 'Invalid token', verified: false })
    return
  }
  const token = req.headers.authorization.split(' ')[1]

  jwt.verify(token, envHandler.JWT_KEY, function (err, decoded) {
    if (err != null) {
      logger.error(err.message + 'by' + req.ip)
      return res
        .status(401)
        .json({ error: 'Unauthorized access', verified: false })
    }
    req.body.decoded = decoded
    if (decoded?.sub == null) {
      res.status(401).json({ error: 'Unauthorized access', verified: false })
      return
    }

    const existingUser = UserModel.findById(decoded.sub)

    if (existingUser == null) {
      res.status(401).json({ error: 'Unauthorized access', verified: false })
      return
    }
    req.body.decoded.user = existingUser
    next()
  })
}
