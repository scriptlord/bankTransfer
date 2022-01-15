import { Request, Response, NextFunction } from 'express'
import { User,  validateSignUp, validateLogin, validateCreateAccount } from '../model/userModel'
import Balance from '../model/balanceModel'
require('dotenv').config()
import bcrypt from 'bcrypt'
import { UserType } from '../model/userModel'
import { generateAccountNumber } from '../utils/AccountGenerator'
import { BalanceObj } from './balanceController'


class UserObj extends BalanceObj {
  constructor() {
    super()
  }
  //CreateUsers
  async signUp(req: Request, res: Response, next: NextFunction) {
    const { error } = validateSignUp(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { firstName, lastName, dateOfBirth, email, phoneNumber, password } = req.body
  try {
   let user: UserType = await User.findOne({ $or: [{ email }, { phoneNumber }] })
   
   if (user) return res.status(400).send({status: 'failed', message: 'User can only register once with a given credential', errorMessage: 'User already registered'})

   const newUser = await User.create({
     firstName,
     lastName,
     dateOfBirth,
     email,
     phoneNumber,
     password: await bcrypt.hash(password, 10),
   })

   let userId = await User.findOne({email}).select('_id')
   let accountNumber = ''
   let accBalance = await Balance.findOne().sort({ createdAt: -1 })

   accountNumber = !accBalance ? '2000000000': generateAccountNumber(accBalance.accountNumber)
   
  const accountDetails = await Balance.create({accountNumber, userId: userId['_id'] })

   res.status(200).json(newUser)
 } catch (err:any) {
   return res.status(500).json(err.message)
 }
}

  //LoginUsers
  async login(req: Request, res: Response, next: NextFunction) {
    const { error } = validateLogin(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { email, password } = req.body
    let user = await User.findOne({ email })
    if (!user) return res.status(400).send('Invalid email or password')

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password')

    try {
      const user = await User.findOne({ email: req.body.email })
      if (!user) return res.status(400).json('Invalid email or password')
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      )
      if (!validPassword)
        return res.status(400).json('Invalid email or password')

      const token = user.generateAuthToken()
      const {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
      } = user
     
      res
        .cookie('token', token)
        .json({ firstName, lastName, email, phoneNumber })
    } catch (err) {
      return res.status(500).json(err)
    }
  }
}

  // async makeTransferToAnotherAccount(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {}

  // async getAllTransactionOfAUser(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {}

  // async getAllCreditTransactionOfAUser(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {}

  // async getAllDebitTransactionOfAUser(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {}


export default UserObj

