"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferObj = void 0;
const balanceModel_1 = __importDefault(require("../model/balanceModel"));
require('dotenv').config();
const transactionModel_1 = require("../model/transactionModel");
class TransferObj {
    constructor() { }
    makeTransferToAnotherAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = (0, transactionModel_1.validateTransferBody)(req.body);
            if (error)
                return res.status(400).send(error.details[0].message);
            const { senderAccount, receiverAccount, amount, transferDescription } = req.body;
            if (senderAccount === receiverAccount)
                return res.status(401).send('User cannot send money from an account into the same account');
            try {
                let senderInfo = yield balanceModel_1.default.findOne({ accountNumber: senderAccount }).select('balance accountNumber');
                let receiverInfo = yield balanceModel_1.default.findOne({ accountNumber: receiverAccount }).select('balance accountNumber');
                if (!senderInfo)
                    return res.status(400).send('Sender Account does nor exists');
                if (!receiverInfo)
                    return res.status(400).send('Receiver account does not exist');
                if (senderInfo.balance < amount)
                    return res.status(400).send('Insufficient fund');
                senderInfo.balance = senderInfo.balance - amount;
                if (senderInfo.balance)
                    receiverInfo.balance = receiverInfo.balance + amount;
                let newSenderBalance = yield senderInfo.save();
                console.log('newSenderBalance', newSenderBalance);
                let newReceiverBalance = yield receiverInfo.save();
                console.log('newReceiverBalance', newReceiverBalance);
                const transactionDetails = yield transactionModel_1.Transaction.create({ senderAccount, amount, receiverAccount, transferDescription: req.body.transferDescription });
                res.status(200).json({ sender: { 'Account No.': senderAccount, 'Debit': amount, 'Balance': senderInfo.balance }, receiver: { 'Account No.': receiverAccount, 'Credit': receiverInfo.balance, 'Balance': receiverAccount.balance } });
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    getAllTransactionOfAUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield balanceModel_1.default.find({ accountNumber: req.params.accountNumber }).select('accountNumber balance userId');
                if (!user)
                    return res.status(400).send({ status: 'failed', message: 'Invalid Account Number. Enter a correct one' });
                res.status(200).json({ status: 'success', user });
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    getAllCreditTransactionOfAUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userTransact = yield transactionModel_1.Transaction.find({ receiverAccount: req.params.accountNumber }).select('senderAccount amount');
                if (userTransact.length === 0)
                    return res.status(400).send({ status: 'failed', message: 'Invalid Account Number. Enter a correct one' });
                res.status(200).json({ status: 'success', credit: userTransact });
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    getAllDebitTransactionOfAUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userTransact = yield transactionModel_1.Transaction.find({ senderAccount: req.params.accountNumber }).select('receiverAccount amount');
                console.log(userTransact);
                if (userTransact.length === 0)
                    return res.status(400).send({ status: 'failed', message: 'Invalid Account Number. Enter a correct one' });
                res.status(200).json({ status: 'success', debit: userTransact });
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
}
exports.TransferObj = TransferObj;
//# sourceMappingURL=transferController.js.map