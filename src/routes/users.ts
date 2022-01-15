import express, { Request, Response, NextFunction } from 'express'
import UserObj from '../controllers/userController'
const router = express.Router()

router.post('/signup', new UserObj().signUp)

router.post('/login', new UserObj().login)





export default router