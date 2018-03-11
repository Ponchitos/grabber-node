'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const { Client } = require('pg')

const config = require('./config/config')
const { textForTest } = require('./mocks/data')
const { deleteTestText } = require('./helpers/data')

const client = new Client({
  user: config.database.username,
  host: config.database.host,
  database: config.database.database,
  password: config.database.password,
  port: config.database.port
})

describe("Testing of 'Add news'", () => {

  before(() => {
    client.connect()
  })

  after((done) => {
    client.query(deleteTestText, [textForTest.text], (err, res) => {
      if (err) console.log(err.stack)
      done()
      client.end()
    })
  })

  it('#sending empty value, should be 400', (done) => {
    chai.use(chaiHttp)
    chai.request('http://localhost:8000')
        .post('/news')
        .send('{}').end((err, res) => {
            expect(res.statusCode).to.equal(400)
            done()
            console.log('Test #1: ', res.statusCode)
        })
  })

  it('#sending news, should be status 201', (done) => {
    chai.use(chaiHttp)
    chai.request('http://localhost:8000')
        .post('/news')
        .send(textForTest).end((err, res) => {
            expect(res.statusCode).to.equal(201)
            done()
            console.log('Test #2: ', res.statusCode)
        })
  })
})
