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
exports.memoryTestDB = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const mongodb_memory_server_1 = require("mongodb-memory-server");
console.log(process.env.MONGO_USERNAME, process.env.MONGO_PASSWORD, process.env.PRIVATE_KEY);
let urlLink = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mycluster.v9grq.mongodb.net/transferServices?retryWrites=true&w=majority`;
// const url = `mongodb+srv://folek:wigglesworth@mycluster.v9grq.mongodb.net/test`
// const url = `mongodb+srv://folek:wigglesworth@mycluster.v9grq.mongodb.net/transferServices?retryWrites=true&w=majority`
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(urlLink);
        console.log('Connection to MongoDB database successful');
    }
    catch (err) {
        console.error('Could not connect to MongoDB database', err.message);
    }
});
exports.connect = connect;
const memoryTestDB = () => {
    try {
        mongodb_memory_server_1.MongoMemoryServer.create().then((mongo) => {
            const uri = mongo.getUri();
            mongoose_1.default.connect(uri).then(() => {
                console.log("connected to testDB");
            });
        });
    }
    catch (err) {
        console.error('Could not connect to MongoDB database', err.message);
    }
};
exports.memoryTestDB = memoryTestDB;
//# sourceMappingURL=mongoConnect.js.map