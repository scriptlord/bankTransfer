import createError, { HttpError } from 'http-errors'
import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import mongoose from 'mongoose'
import { memoryTestDB, connect } from './connection/mongoConnect'


import indexRouter from './routes/index'
import usersRouter from './routes/users'
import balanceRouter from './routes/balance'
import transactRouter from './routes/transaction'


var app = express()

// connect();
console.log('env', process.env.NODE_ENV)

if (process.env.NODE_ENV === 'test') {
  memoryTestDB()
} else {
  connect()
}


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/balance', balanceRouter)
app.use('/transfer', transactRouter)

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404))
})

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
