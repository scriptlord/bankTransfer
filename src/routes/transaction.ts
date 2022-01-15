import express from 'express'
import { TransferObj } from '../controllers/transferController'
const router = express.Router()



router.get('/transaction/:accountNumber', new TransferObj().getAllTransactionOfAUser)
router.get('/transaction/credit/:accountNumber', new TransferObj().getAllCreditTransactionOfAUser)
router.get('/tansaction/debit/:accountNumber', new TransferObj().getAllDebitTransactionOfAUser)
router.post('/', new TransferObj().makeTransferToAnotherAccount)

export default router

