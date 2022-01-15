import mongoose, { Schema, model, Document, Types } from 'mongoose'
import joi from 'joi'
import jwt from 'jsonwebtoken'
require('dotenv').config()
import Balance from './balanceModel'

export interface UserType {
  firstName: string
  lastName: string
  dateOfBirth: string
  email: string
  phoneNumber: string
  password: string
}

//Build a User Schema
const UserSchema = new mongoose.Schema({
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
})



//user model
export function validateSignUp(user: UserType) {
  const schema = joi.object({
    firstName: joi.string().min(3).max(20).required(),
    lastName: joi.string().min(3).max(20).required(),
    dateOfBirth: joi.string().required(),
    email: joi.string().email().required(),
    phoneNumber: joi.string().min(11).max(11).required(),
    password: joi.string().min(5).max(200).required(),
  })
  return schema.validate(user)
}
export function validateLogin(user: UserType) {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).max(200).required(),
  })
  return schema.validate(user)
}

export function validateCreateAccount(user: UserType) {
  const schema = joi.object({
    email: joi.string().email().required(),
  })
  return schema.validate(user)
}

// UserSchema.methods.generateAuthToken = () => {
//   const token = jwt.sign({ _id: this._id}, process.env.PRIVATE_KEY as string, {
//     expiresIn: '24h',
//   })
//   return token
// }

//Build a User Model
export let User = mongoose.model('User', UserSchema)
