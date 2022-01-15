import express, { Request, Response, NextFunction } from 'express'
const router = express.Router()

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.send('Welcome to Foluso Kayode Banking Transfer Service Application')
})

export default router
