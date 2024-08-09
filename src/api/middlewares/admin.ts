import type { Request, Response, NextFunction } from 'express'
import { type UserInterface } from '@/models/user'

export const checkAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user = req.body.decoded.user as UserInterface | null
  if (user == null) {
    res.status(401).json({ error: 'Unauthorized access', verified: false })
    return
  }
  if (user.role !== 'Admin') {
    res.status(401).json({ error: 'Unauthorized access', verified: false })
    return
  }
  next()
}
