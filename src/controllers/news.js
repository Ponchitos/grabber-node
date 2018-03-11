'use strict'

const _ = require('lodash')
const httpStatusCodes = require('http-status-codes')

const newsService = require('../services/news-service')
const newsModel = require('../models/news')
const sentimentService = require('../services/sentiment-service')

async function post (req, res, next) {
  let body = req.body || {}
  try {
    let resultOfSentiment = await sentimentService.definitionOfSentiment(newsModel.jsonToModel(body))
    let newRecord = await newsService.createRecord(resultOfSentiment)
    res.status(httpStatusCodes.CREATED).json(newsModel.modelToJson(newRecord))
  } catch (err) {
    next(err)
  }
}

async function get (req, res, next) {
  let offset = req.query.offset
  let limit = req.query.limit
  try {
    let list = await newsService.getList(offset, limit)
    res.json({
      totalCount: list.totalCount,
      data: _.map(list.data, p => {
        return newsModel.modelToJson(p)
      })
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  post,
  get
}
