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
exports.BalanceObj = void 0;
const balanceModel_1 = __importDefault(require("../model/balanceModel"));
const lodash_1 = __importDefault(require("lodash"));
require('dotenv').config();
const transferController_1 = require("./transferController");
class BalanceObj extends transferController_1.TransferObj {
    constructor() {
        super();
    }
    getBalanceForUniqueAccNo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userAccount = yield balanceModel_1.default.findOne({ accountNumber: req.params.accountNumber });
                if (!userAccount)
                    return res.status(400).send({ status: 'failed', message: 'Invalid Account Number. Enter a correct one' });
                const filteredResult = lodash_1.default.pick(userAccount, ['userId', 'accountNumber', 'balance']);
                res.status(200).json({ status: 'success', type: 'particular account number', result: filteredResult });
                res.status(200).json(userAccount);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    getBalanceForUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userBalance = yield balanceModel_1.default.findOne({ userId: req.params.userId });
                if (!userBalance)
                    return res.status(400).send({ status: 'failed', message: 'Invalid user ID. Enter a correct ID' });
                console.log(userBalance);
                const filteredResult = lodash_1.default.pick(userBalance, ['userId', 'accountNumber', 'balance', '_id']);
                res.status(200).json({ status: 'success', type: 'particular user', result: filteredResult });
                res.send(userBalance);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    getAllAccountsAndBalance(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const AllAccounts = yield balanceModel_1.default.find().sort('-balance');
                res.status(200).json({ status: 'success', result: AllAccounts });
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
}
exports.BalanceObj = BalanceObj;
//# sourceMappingURL=balanceController.js.map