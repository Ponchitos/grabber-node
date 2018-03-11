'use strict'

const sentiment = require('sentiment')

const { typeOfSentiment } = require('../models/typesOfSentiment')

async function definitionOfSentiment (record) {
  let score = await sentiment(record.text)

  console.log('Text: ', record.text)
  console.log('Score: ', score)

  if (score.score > 0) {
    record.sentiment = typeOfSentiment.POSITIVE
    return record
  }

  if (score.score < 0) {
    record.sentiment = typeOfSentiment.NEGATIVE
    return record
  }
  record.sentiment = typeOfSentiment.NEUTRALLY
  return record
}

module.exports = {
  definitionOfSentiment
}
