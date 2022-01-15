import app from '../../app' // Link to your server file
import * as request from 'supertest'

// This passes because 1 === 1
it('Testing to see if Jest works', () => {
  expect(1).toBe(1)
})


describe('GET / - a simple api endpoint', () => {
  it('Hello API Request', async () => {
    const result = await request(app).get('/')
    expect(result.text).toEqual('hello')
    expect(result.statusCode).toEqual(200)
  })
})
