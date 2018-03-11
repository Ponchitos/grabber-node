'use strict'

const baseDB = require('./base-db')
const { newsModel } = require('../../models/news')

const DEFAULT_LIMIT = 100

const newsDBModel = baseDB.sequelizeInstance.define('news', newsModel)

async function createNewRecord (news) {
  let newRecord = await newsDBModel.create(news)
  return newRecord
}

async function getRecord (recordId) {
  let record = await newsDBModel.findOne({
    where: {
      id: recordId
    }
  })
  return record
}

async function getListOfRecords (offset, limit) {
  let result = await newsDBModel.findAndCountAll({
    offset: offset || 0,
    limit: limit || DEFAULT_LIMIT
  })
  return {
    data: result.rows,
    totalCount: result.count
  }
}

async function removeRecord (recordId) {
  await newsDBModel.destroy({
    where: {
      id: recordId
    }
  })
}

module.exports = {
  createNewRecord,
  getRecord,
  removeRecord,
  getListOfRecords
}
