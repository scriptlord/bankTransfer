import express, { Request, Response, NextFunction } from 'express'
// import UserObj from '../controller'
const router = express.Router()
import { BalanceObj } from '../controllers/balanceController'

router.get('/acc/:accountNumber', new BalanceObj().getBalanceForUniqueAccNo)

router.get('/id/:userId', new BalanceObj().getBalanceForUser)

router.get('/', new BalanceObj().getAllAccountsAndBalance)

export default router
