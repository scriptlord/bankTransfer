"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
function authorize(req, res, next) {
    let token = req.cookies['token'];
    if (!token)
        res.status(401).json('Access denied. No token provided');
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.PRIVATE_KEY);
        next();
    }
    catch (e) {
        res.status(400).send('Invalid token');
    }
}
exports.authorize = authorize;
//# sourceMappingURL=authorize.js.map