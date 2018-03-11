'use strict'

const httpStatusCodes = require('http-status-codes')

function handle (error, req, res, next) {
  let statusCode = httpStatusCodes.BAD_REQUEST

  res.status(statusCode).json({
    message: error.message
  })
}

module.exports = {
  handle
}
