import { Request, Response, NextFunction } from 'express'
import Balance from '../model/balanceModel'
import _ from "lodash";
require('dotenv').config()
import { TransferObj } from './transferController'

 export class BalanceObj extends TransferObj {
   constructor() {
     super()
   }
  async getBalanceForUniqueAccNo(req: Request, res: Response, next: NextFunction) {
   try {
    const userAccount = await Balance.findOne({ accountNumber: req.params.accountNumber })
    if (!userAccount) return res.status(400).send({ status: 'failed', message: 'Invalid Account Number. Enter a correct one' })
    const filteredResult = _.pick(userAccount, ['userId', 'accountNumber', 'balance'])
    res.status(200).json({ status: 'success', type:'particular account number', result: filteredResult })
     res.status(200).json(userAccount)
   } catch (err) {
     return res.status(500).json(err)
    }
   }

  async getBalanceForUser(req: Request, res: Response, next: NextFunction) {
   try {
    const userBalance = await Balance.findOne({ userId: req.params.userId })
    if(!userBalance) return res.status(400).send({status: 'failed', message: 'Invalid user ID. Enter a correct ID'})
    console.log(userBalance)
    const filteredResult =  _.pick(userBalance, ['userId', 'accountNumber', 'balance', '_id'])
    res.status(200).json({ status: 'success', type:'particular user', result: filteredResult })
    res.send(userBalance)
   } catch (err) {
    return res.status(500).json(err)
   }
   }

   async getAllAccountsAndBalance(req: Request, res: Response, next: NextFunction) {
    try {
     const AllAccounts = await Balance.find().sort('-balance')
     res.status(200).json({status: 'success', result: AllAccounts})
    } catch (err) {
      return res.status(500).json(err)
    }
   }
 }
