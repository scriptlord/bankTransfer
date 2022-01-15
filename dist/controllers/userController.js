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
const userModel_1 = require("../model/userModel");
const balanceModel_1 = __importDefault(require("../model/balanceModel"));
require('dotenv').config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const AccountGenerator_1 = require("../utils/AccountGenerator");
const balanceController_1 = require("./balanceController");
class UserObj extends balanceController_1.BalanceObj {
    constructor() {
        super();
    }
    //CreateUsers
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = (0, userModel_1.validateSignUp)(req.body);
            if (error)
                return res.status(400).send(error.details[0].message);
            const { firstName, lastName, dateOfBirth, email, phoneNumber, password } = req.body;
            try {
                let user = yield userModel_1.User.findOne({ $or: [{ email }, { phoneNumber }] });
                if (user)
                    return res.status(400).send({ status: 'failed', message: 'User can only register once with a given credential', errorMessage: 'User already registered' });
                const newUser = yield userModel_1.User.create({
                    firstName,
                    lastName,
                    dateOfBirth,
                    email,
                    phoneNumber,
                    password: yield bcrypt_1.default.hash(password, 10),
                });
                let userId = yield userModel_1.User.findOne({ email }).select('_id');
                let accountNumber = '';
                let accBalance = yield balanceModel_1.default.findOne().sort({ createdAt: -1 });
                accountNumber = !accBalance ? '2000000000' : (0, AccountGenerator_1.generateAccountNumber)(accBalance.accountNumber);
                const accountDetails = yield balanceModel_1.default.create({ accountNumber, userId: userId['_id'] });
                res.status(200).json(newUser);
            }
            catch (err) {
                return res.status(500).json(err.message);
            }
        });
    }
    //LoginUsers
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = (0, userModel_1.validateLogin)(req.body);
            if (error)
                return res.status(400).send(error.details[0].message);
            const { email, password } = req.body;
            let user = yield userModel_1.User.findOne({ email });
            if (!user)
                return res.status(400).send('Invalid email or password');
            const validPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!validPassword)
                return res.status(400).send('Invalid email or password');
            try {
                const user = yield userModel_1.User.findOne({ email: req.body.email });
                if (!user)
                    return res.status(400).json('Invalid email or password');
                const validPassword = yield bcrypt_1.default.compare(req.body.password, user.password);
                if (!validPassword)
                    return res.status(400).json('Invalid email or password');
                const token = user.generateAuthToken();
                const { firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, } = user;
                res
                    .cookie('token', token)
                    .json({ firstName, lastName, email, phoneNumber });
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
}
// async makeTransferToAnotherAccount(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {}
// async getAllTransactionOfAUser(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {}
// async getAllCreditTransactionOfAUser(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {}
// async getAllDebitTransactionOfAUser(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {}
exports.default = UserObj;
//# sourceMappingURL=userController.js.map