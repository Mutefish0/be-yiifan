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
  if(queryFields)
    for(let key in queryFields)
      _field[fields[key]] = queryFields[key]
  return _field
}

function Model(collectionName, fields) {
  this.collectionName = collectionName

  this.fields = fields || {}
  this.fields.id = '_id'

  if(database) mountCollection.call(this, database, collectionName)
  else getDatabase().then(db => {
    database = db
    mountCollection.call(this, database, collectionName)
  })

}

Model.prototype.findOne = function(condition, fields) {
  let mapedCondition = fieldsMap(condition, this.fields)
  let mapedFields = fieldsMap(fields, this.fields)
  return new Promise((resolve, reject) => {
    this.collection.findOne(mapedCondition, mapedFields).then(doc => {
      resolve(doc)
    }, err => reject(err))
  })
}

Model.prototype.findAll = function(condition, fields) {
  let mapedCondition = fieldsMap(condition, this.fields)
  let mapedFields = fieldsMap(fields, this.fields)
  return new Promise((resolve, reject) => {
    this.collection.find(mapedCondition, mapedFields).toArray().then(doc => {
      resolve(doc)
    }, err => reject(err))
  })
}

Model.prototype.findLimit = function(condition, fields, limit) {
  let mapedCondition = fieldsMap(condition, this.fields)
  let mapedFields = fieldsMap(fields, this.fields)
  return new Promise((resolve, reject) => {
    this.collection.find(mapedCondition, mapedFields).limit(limit).toArray().then(doc => {
      resolve(doc)
    }, err => reject(err))
  })
}

Model.prototype.updateOne = function(condition, mutation) {
  let mapedCondition = fieldsMap(condition, this.fields)
  let mapedMutation = fieldsMap(mutation, this.fields)
  return new Promise((resolve, reject) => {
    this.collection.updateOne(condition, mutation).then(res => {
      if(res.result.ok == 1)
        resolve(res.result.n)
      else
        reject({message: '更新失败...'})
    }, err => reject(err))
  })
}

Model.prototype.updateAll = function(condition, mutation) {
  let mapedCondition = fieldsMap(condition, this.fields)
  let mapedMutation = fieldsMap(mutation, this.fields)
  return new Promise((resolve, reject) => {
    this.collection.updateMany(condition, mutation).then(res => {
      if(res.result.ok == 1)
        resolve(res.result.n)
      else
        reject({message: '更新失败...'})
    }, err => reject(err))
  })
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

Model.prototype.deleteOne = function(condition) {
  let mapedCondition = fieldsMap(condition, this.fields)
  return new Promise((resolve, reject) => {
    this.collection.deleteOne(condition).then(res => {
    //如果result为ok则resolve生效数n
      if(res.result.ok == 1)
        resolve(res.result.n)
      else
        reject({message: '操作失败'})
    }, err => reject(err))
  })
}

Model.prototype.deleteAll = function(condition) {
  let mapedCondition = fieldsMap(condition, this.fields)
  return new Promise((resolve, reject) => {
    this.collection.deleteMany(condition).then(res => {
    //如果result为ok则resolve生效数n
      if(res.result.ok == 1)
        resolve(res.result.n)
      else
        reject({message: '操作失败'})
    }, err => reject(err))
  })
}

module.exports = Model
