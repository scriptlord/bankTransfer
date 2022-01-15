"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// account nr (unique, 10 digits)
// balance (each user should get 5000 when they create an acct)
// createdAt
// updatedAt
// userId
//Build a Balance Schema
const balanceSchema = new mongoose_1.default.Schema({
    accountNumber: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        length: 10
    },
    balance: {
        type: Number,
        trim: true,
        default: 5000,
        required: true,
    },
    userId: {
        type: String,
        required: [true, 'User cannot create account with providing a registered ID']
    }
}, { timestamps: true });
//Build a Balance Model
let Balance = mongoose_1.default.model('Balance', balanceSchema);
exports.default = Balance;
//# sourceMappingURL=balanceModel.js.map