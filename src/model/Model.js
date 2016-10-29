let getDatabase = require('../database')
let database

// 挂载集合
function mountCollection(db, collectionName) {
   //strict:true 检查集合是否存在
    db.collection(collectionName, {strict: true}, (err, col) => {
      if(err) {
        console.log(`连接集合'${collectionName}'失败...`)
        console.log(err.message)
      }
      else {
        this.collection = col
        console.log(`连接集合'${collectionName}'成功...`)
      }
    })
}

//字段映射
function fieldsMap(queryFields, fields) {
  let _field = {}
  for(let key in queryFields)
    _field[fields[key]] = queryFields[key]
  return _field
}

function Model(collectionName, fields) {
  this.collectionName = collectionName

  this.fields = fields || {}
  this.fields.id = '_id'

  console.log(this.fields)

  if(database) mountCollection.call(this, database, collectionName)
  else getDatabase().then(db => {
    database = db
    mountCollection.call(this, database, collectionName)
  })
}

Model.prototype.findOne = (condition, fields) => {

}

Model.prototype.findAll = (condition, fields) => {

}

Model.prototype.findLimit = (condition, fields, limit) => {

}

Model.prototype.updateOne = (condition, mutation) => {

}

Model.prototype.updateAll = (condition, mutation) => {

}

Model.prototype.insert = function(doc) {
  let mapedDoc = fieldsMap(doc, this.fields)
  return new Promise((resolve, reject) => {
    this.collection.insertOne(mapedDoc).then(res => {
    //如果result为ok则resolve生效数n
      if(res.result.ok == 1)
        resolve(res.result.n)
      else
        reject({message: '操作失败'})
    }, err => reject(err))
  })
}

module.exports = Model
