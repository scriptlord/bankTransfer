# week-9-node

## 1. Implement this task using MongoDB

### Setup

1. Your are required to use `TypeScript` for the task and build the APIs (endpoints) with `express`
2. Use and setup the project with `Yarn`

## Problem Description:

Imagine you are asked to develop a transfer service with APIs to transfer money between two accounts
You application is expected to have the following database structure

- COLLECTION 1 - transactions
  - reference (unique)
  - senderAccount nr
  - amount
  - receiverAccount nr
  - transferDescription
  - createdAt
  - updatedAt
- COLLECTION 2 - balances

  - account nr (unique, 10 digits)
  - balance (each user should get 5000 when they create an acct)
  - createdAt
  - updatedAt
  - userId

- COLLECTION 3 - users
  - firstName
  - lastname
  - DOB
  - email (unique)
  - phone number (unique)

The transaction Collection registers any transaction in an account (ie. today I paid N2000 for a movie with my card), the balances table represents the account balance of customers (ie. I have N50k in my bank account). If a sender is trying to make a transaction of an amount of money more than his current balance, an error should be returned indicating insufficient funds
The API you are to develop should be able to handle a transfer request of the form below and updates the transactions/balances table accordingly.

```
{
    senderAccount: account,
    receiverAccount: account,
    amount: money,
    transferDescription: transfer description
}
```

### Endpoints to test

| Method | Endpoint                           | Enable a user to:                                            |
| :----- | :--------------------------------- | :----------------------------------------------------------- |
| POST   | /signup                            | Enable user signup |
| POST   | /login                             | Enable user to login |
| POST   | /create-account                    | Enable user to create an account stored in the balance collection |
| GET    | /balance/:accountNumber            | Getting balance for a particular account number              |
|        | /balance/:userId                   | Getting balance for a particular user                        |
| GET    | /balance                           | Getting all accounts and their balance                       |
| POST   | /transfer                          | To make a transaction to another account                     |
| GET.   | /transaction/:accountNumber        | gets all transactions of a particular user                   |
| GET.   | /transaction/credit/:accountNumber | gets all credit transactions of a particular user            |
| GET.   | /transaction/debit/:accountNumber  | gets all debit transactions of a particular user             |

## Clarification
- implement pagination, with limit of 5 values for each page
- Create Authentication and Authorization for users using a middleware function
- Implement Validation for incoming request using Joi
- Only registered users can access all endpoints
- Use mongoDB-compass for local development

## Test coverage (Test is mandatory - no test equals 0 (zero) marks):

- Make sure you write test to cover your application using supertest
- Test your database using mongodb-memory-server
- Test all endpoints (GET, POST, PUT, DELETE)

## Documentation
- document your API with postman

## Hosting
- Host your application on Heroku


## 2. Mongo Aggregation Exercise.
- Go through the readme file in the Folder `MongoAggregation`

## 3. To generate crypto random value
require('crypto').randomBytes(64).toString("hex")

## 4. To do test
yarn add supertest
yarn add ts-jest
yarn add jest
yarn add mongodb-memory-server

yarn add -D @babel/preset-typescript
yarn add -D @types/jest  

//mongodb-memory-server
