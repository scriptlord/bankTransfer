import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

require('dotenv').config()

export function authorize(req: Request, res: Response, next: NextFunction) {
  let token = req.cookies['token']
  if (!token) res.status(401).json('Access denied. No token provided')
  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY as string)
    next()
  } catch (e) {
    res.status(400).send('Invalid token')
  }
}
