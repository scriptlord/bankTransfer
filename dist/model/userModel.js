"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.validateCreateAccount = exports.validateLogin = exports.validateSignUp = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
require('dotenv').config();
//Build a User Schema
const UserSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'Enter your first name'],
        min: 3,
        max: 20,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Enter your last name'],
        min: 3,
        max: 20,
    },
    dateOfBirth: {
        type: Date,
        trim: true,
        required: [true, 'Enter a your date of birth'],
    },
    email: {
        type: String,
        trim: true,
        required: true,
        max: 50,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
        unique: true,
    },
    phoneNumber: {
        type: String,
        match: [
            /((^090)([23589]))|((^070)([1-9]))|((^080)([2-9]))|((^081)([0-9]))(\d{7})/,
            'Please enter 11 digits valid Nigeria mobile number',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Enter your password'],
        min: 6,
        max: 200,
    }
});
//user model
function validateSignUp(user) {
    const schema = joi_1.default.object({
        firstName: joi_1.default.string().min(3).max(20).required(),
        lastName: joi_1.default.string().min(3).max(20).required(),
        dateOfBirth: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        phoneNumber: joi_1.default.string().min(11).max(11).required(),
        password: joi_1.default.string().min(5).max(200).required(),
    });
    return schema.validate(user);
}
exports.validateSignUp = validateSignUp;
function validateLogin(user) {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(5).max(200).required(),
    });
    return schema.validate(user);
}
exports.validateLogin = validateLogin;
function validateCreateAccount(user) {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
    });
    return schema.validate(user);
}
exports.validateCreateAccount = validateCreateAccount;
// UserSchema.methods.generateAuthToken = () => {
//   const token = jwt.sign({ _id: this._id}, process.env.PRIVATE_KEY as string, {
//     expiresIn: '24h',
//   })
//   return token
// }
//Build a User Model
exports.User = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=userModel.js.map