import { Request, Response, NextFunction } from 'express'
import Balance from '../model/balanceModel'
import _ from 'lodash'
require('dotenv').config()
import {validateTransferBody, Transaction} from '../model/transactionModel'

export class TransferObj {
 constructor() { }
 
  async makeTransferToAnotherAccount(req: Request, res: Response, next: NextFunction) {
    const { error } = validateTransferBody(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { senderAccount, receiverAccount, amount, transferDescription } = req.body
    if (senderAccount === receiverAccount) return res.status(401).send('User cannot send money from an account into the same account')
    try {
      let senderInfo = await Balance.findOne({ accountNumber: senderAccount }).select('balance accountNumber')
      let receiverInfo = await Balance.findOne({ accountNumber: receiverAccount }).select('balance accountNumber')
      if (!senderInfo) return res.status(400).send('Sender Account does nor exists')
      if (!receiverInfo) return res.status(400).send('Receiver account does not exist')

      
      if (senderInfo.balance < amount) return res.status(400).send('Insufficient fund')
      senderInfo.balance = senderInfo.balance - amount
      if(senderInfo.balance)
      receiverInfo.balance = receiverInfo.balance + amount
      
      let newSenderBalance = await senderInfo.save()
      console.log('newSenderBalance', newSenderBalance)
      
      let newReceiverBalance = await receiverInfo.save()
      console.log('newReceiverBalance', newReceiverBalance)

       const transactionDetails = await Transaction.create({senderAccount, amount, receiverAccount, transferDescription: req.body.transferDescription})
     

      res.status(200).json({sender:{'Account No.': senderAccount, 'Debit': amount, 'Balance': senderInfo.balance}, receiver:{'Account No.': receiverAccount, 'Credit': receiverInfo.balance, 'Balance': receiverAccount.balance}})
      
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  async getAllTransactionOfAUser(req: Request, res: Response, next: NextFunction) {
   try {
    const user = await Balance.find({ accountNumber: req.params.accountNumber }).select('accountNumber balance userId')
    if (!user) return res.status(400).send({ status: 'failed', message: 'Invalid Account Number. Enter a correct one'})
    
    res.status(200).json({ status: 'success', user })
   } catch (err) {
     return res.status(500).json(err)
    }
  }

  async getAllCreditTransactionOfAUser(req: Request, res: Response, next: NextFunction) {
    try {
      let userTransact = await Transaction.find({ receiverAccount: req.params.accountNumber }).select('senderAccount amount')
      if (userTransact.length === 0) return res.status(400).send({ status: 'failed', message: 'Invalid Account Number. Enter a correct one'})
      
      res.status(200).json({ status: 'success', credit: userTransact })

    } catch (err) {
      return res.status(500).json(err)
    }
  }

  async getAllDebitTransactionOfAUser(req: Request, res: Response, next: NextFunction) {
    try {
      let userTransact = await Transaction.find({senderAccount: req.params.accountNumber}).select('receiverAccount amount')
      console.log(userTransact)
      if (userTransact.length === 0) return res.status(400).send({status: 'failed', message: 'Invalid Account Number. Enter a correct one'})

      res.status(200).json({ status: 'success', debit: userTransact })
    } catch (err) {
      return res.status(500).json(err)
    }
  }
}


