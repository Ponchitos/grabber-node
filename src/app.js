'use strict'

const express = require('express')
const http = require('http')
const config = require('./config/config')
const bodyParser = require('body-parser')
const yaml = require('js-yaml')
const path = require('path')
const swaggerize = require('swaggerize-express')
const swaggerUI = require('swaggerize-ui')

const db = require('./services/db/base-db')
const errorHandler = require('./middleware/error-handler')

const app = express()
const spec = yaml.safeLoad(path.resolve(path.join(__dirname, 'api/routing.yaml')))

app.use(bodyParser.json())
app.use(swaggerize({
  api: spec,
  handlers: path.resolve(path.join(__dirname, './controllers')),
  docspath: '/swagger-docs/spec'
}))
app.use('/swagger-docs', swaggerUI({
  docs: 'spec'
}))
app.use(errorHandler.handle)

async function initialize () {
  await Promise.all([
    db.initialize()
  ])
}

initialize().then(() => {
  const server = http.createServer(app)
  const port = config.port
  server.listen(port, () => {
    console.log('Server started successfully on port: ', port)
  })
}).catch((err) => {
  console.log(err)
})
