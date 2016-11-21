let Mongo = require('mongodb').MongoClient
let co = require('co')
let priv = require('./private')

let insertedCount = 0

co(function* () {
  let prod = yield Mongo.connect(priv.productionDatabaseUri)
  console.log(`连接数据库${prod.databaseName}成功...`)
  let dev =  yield Mongo.connect(priv.developmentDatabaseUri)
  console.log(`连接数据库${dev.databaseName}成功...`)

  let prodCols = yield prod.collections()

  for(let i = 0, len = prodCols.length; i < len; i++) {
    insertedCount = 0

    //获取集合名称 - 生产
    let colName = prodCols[i].collectionName

    let devCol = dev.collection(colName)
    devCol.insert({})
    yield devCol.drop()

    let prodDocs = yield prodCols[i].find().toArray()

    for(let j = 0, len = prodDocs.length; j < len; j++) {
      insertedCount ++
      console.log(`${colName}...${insertedCount}/${len}`)
      yield devCol.insert(prodDocs[j])
    }

  }

  yield prod.close()
  yield dev.close()

  console.log('完成')
})
