"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.validateTransferBody = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const joi_1 = __importDefault(require("joi"));
//
//Build a Transaction Schema
const transactSchema = new mongoose_1.default.Schema({
    reference: {
        type: String,
        required: true,
        default: (0, uuid_1.v4)(),
    },
    senderAccount: {
        type: String,
        trim: true,
        required: true,
        min: 5,
        max: 20,
    },
    amount: {
        type: Number,
        trim: true,
        required: true,
        min: 3,
        max: 10000000,
    },
    receiverAccount: {
        type: String,
        trim: true,
        required: true,
        min: 3,
        max: 20,
    },
    transferDescription: {
        type: String,
        required: true,
        min: 3,
        default: 'no descritption',
        max: 100,
    },
}, { timestamps: true });
function validateTransferBody(user) {
    const schema = joi_1.default.object({
        senderAccount: joi_1.default.string().length(10).required(),
        receiverAccount: joi_1.default.string().length(10).required(),
        amount: joi_1.default.number().min(100).max(10000000).required(),
        transferDescription: joi_1.default.string().length(100)
    });
    return schema.validate(user);
}
exports.validateTransferBody = validateTransferBody;
//Build a Transaction Model
exports.Transaction = mongoose_1.default.model('Transaction', transactSchema);
//# sourceMappingURL=transactionModel.js.map