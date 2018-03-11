'use strict'

const Sequelize = require('sequelize')

const newsModel = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  text: Sequelize.TEXT('long'),
  sentiment: Sequelize.TEXT('long')
}

function jsonToModel (data) {
  return {
    id: data.id,
    text: data.text
  }
}

function modelToJson (data) {
  return {
    id: data.id,
    text: data.text,
    sentiment: data.sentiment
  }
}

module.exports = {
  newsModel,
  jsonToModel,
  modelToJson
}
