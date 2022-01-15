import mongoose, { Types } from 'mongoose'
import { User } from './userModel'
// account nr (unique, 10 digits)
// balance (each user should get 5000 when they create an acct)
// createdAt
// updatedAt
// userId
//Build a Balance Schema
const balanceSchema = new mongoose.Schema(
  {
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
 },
 
  { timestamps: true }
)



//Build a Balance Model
let Balance = mongoose.model('Balance', balanceSchema)

export default Balance
