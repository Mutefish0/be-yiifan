let Mongo = require('mongodb').MongoClient

let env = require('../env')

module.exports = Mongo.connect(env.databaseUri)
