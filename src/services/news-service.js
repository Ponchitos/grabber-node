'use strict'

const newsDB = require('./db/news-db')

async function createRecord (record) {
  let createRecord = await newsDB.createNewRecord(record)
  return createRecord
}

async function getRecord (recordId) {
  let record = await newsDB.getRecord(recordId)
  return record
}

async function removeRecord (recordId) {
  await newsDB.removeRecord(recordId)
}

async function getList (offset, limit) {
  let list = await newsDB.getListOfRecords(offset, limit)
  return list
}

module.exports = {
  createRecord,
  getRecord,
  removeRecord,
  getList
}
