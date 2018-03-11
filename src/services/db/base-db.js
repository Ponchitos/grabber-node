'use strict'

const Sequelize = require('sequelize')
const config = require('../../config/config')

const dbConfig = config.database
const sequelizeInstance = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig)

async function initialize () {
  try {
    await sequelizeInstance.authenticate()
    await sequelizeInstance.sync()
    console.log('Connection to database has been established successfully.')
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  sequelizeInstance,
  initialize
}
