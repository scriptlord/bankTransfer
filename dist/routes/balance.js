"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import UserObj from '../controller'
const router = express_1.default.Router();
const balanceController_1 = require("../controllers/balanceController");
router.get('/acc/:accountNumber', new balanceController_1.BalanceObj().getBalanceForUniqueAccNo);
router.get('/id/:userId', new balanceController_1.BalanceObj().getBalanceForUser);
router.get('/', new balanceController_1.BalanceObj().getAllAccountsAndBalance);
exports.default = router;
//# sourceMappingURL=balance.js.map