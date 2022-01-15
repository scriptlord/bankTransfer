import mongoose from 'mongoose'
require("dotenv").config()
import {MongoMemoryServer} from "mongodb-memory-server"

console.log(process.env.MONGO_USERNAME, process.env.MONGO_PASSWORD, process.env.PRIVATE_KEY)

let urlLink = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mycluster.v9grq.mongodb.net/transferServices?retryWrites=true&w=majority`

// const url = `mongodb+srv://folek:wigglesworth@mycluster.v9grq.mongodb.net/test`

// const url = `mongodb+srv://folek:wigglesworth@mycluster.v9grq.mongodb.net/transferServices?retryWrites=true&w=majority`


export const connect = async () => {
 try {
 await mongoose.connect(urlLink);
  console.log('Connection to MongoDB database successful')
 } catch (err:any) {
  console.error('Could not connect to MongoDB database', err.message)
 }
}


export const memoryTestDB = () => {
 try {
    MongoMemoryServer.create().then((mongo) => {
      const uri = mongo.getUri();
      mongoose.connect(uri).then(() => {
        console.log("connected to testDB");
      });
    });
 } catch (err:any) {
  console.error('Could not connect to MongoDB database', err.message)
 }
} 


  