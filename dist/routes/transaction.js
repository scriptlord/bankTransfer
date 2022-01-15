"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transferController_1 = require("../controllers/transferController");
const router = express_1.default.Router();
router.get('/transaction/:accountNumber', new transferController_1.TransferObj().getAllTransactionOfAUser);
router.get('/transaction/credit/:accountNumber', new transferController_1.TransferObj().getAllCreditTransactionOfAUser);
router.get('/tansaction/debit/:accountNumber', new transferController_1.TransferObj().getAllDebitTransactionOfAUser);
router.post('/', new transferController_1.TransferObj().makeTransferToAnotherAccount);
exports.default = router;
//# sourceMappingURL=transaction.js.map