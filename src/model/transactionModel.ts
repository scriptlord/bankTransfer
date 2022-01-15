import mongoose, { Schema, model, Document, Types } from 'mongoose'
import {v4 as uuidv4} from 'uuid'
import joi from 'joi'

export interface TransferBodyType {
  senderAccount: string
  receiverAccount: string
  amount: number
  transferDescription: string
}
//
//Build a Transaction Schema
const transactSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      required: true,
      default: uuidv4(),
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
      default:'no descritption',
      max: 100,
    },
  },
  { timestamps: true }
)


export function validateTransferBody(user: TransferBodyType) {
  const schema = joi.object({
    senderAccount: joi.string().length(10).required(),
    receiverAccount: joi.string().length(10).required(),
    amount: joi.number().min(100).max(10000000).required(),
    transferDescription: joi.string().length(100)
  })
  return schema.validate(user)
}

//Build a Transaction Model
export let Transaction = mongoose.model('Transaction', transactSchema)


