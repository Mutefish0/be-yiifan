let databasePromise = require('../database')

databasePromise.then(db => {
  console.log(`连接数据库'${db.databaseName}'成功...`)
}, err => {
  console.log('连接数据库失败')
  console.log(err)
})

function Model(collectionName) {
  this.collectionName = collectionName
  this.completedPromise = new Promise((resolve, reject) => {
    databasePromise.then(db => {
      db.collection(collectionName, (err, col) => {
        if(err) {
          reject()
          console.log(`连接集合'${collectionName}'失败...`)
        }
        else {
          this.collection = col
          resolve(this)
          console.log(`连接集合'${collectionName}'成功...`)
        }
      })
    })
  })

  Model.instances = Model.instances || []
  Model.instances.push(this)

}

// 指明所有集合都已经连接完毕
Model.waitCompleted = function() {
    return Model.instances.reduce((prev, cur) => {
      return new Promise(resolve => {
        prev.then(_ => {
          cur.completedPromise.then(_ => {
            resolve()
          })
        })
      })
    }, new Promise(resolve => resolve()))
}

Model.prototype.findOne = function(condition, fields) {
  return new Promise((resolve, reject) => {
    this.collection.findOne(condition, fields).then(doc => {
      resolve(doc)
    }, err => reject(err))
  })
}

Model.prototype.findAll = function(condition, fields, opt) {
    return new Promise((resolve, reject) => {
      let cursor = this.collection.find(condition, fields)
      opt = opt || {}
      let offset = opt.offset,
          limit = opt.limit,
          sort = opt.hasOwnProperty('sort') && opt.sort || undefined
      if(offset && typeof(offset) == 'number') cursor = cursor.skip(offset)
      if(limit && typeof(limit) == 'number') cursor = cursor.limit(limit)
      if(sort && typeof(sort) == 'object') cursor = cursor.sort(sort)
      cursor.toArray().then(docs => {
        resolve(docs)
      }, err => reject(err))
    })
}

Model.prototype.findLimit = function(condition, fields, limit) {
  return new Promise((resolve, reject) => {
    this.collection.find(condition, fields).limit(limit).toArray().then(docs => {
      resolve(docs)
    }, err => reject(err))
  })
}

Model.prototype.updateOne = function(condition, mutation) {
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
  return new Promise((resolve, reject) => {
    this.collection.insertOne(doc).then(res => {
    //如果result为ok则resolve生效数n
      if(res.result.ok == 1)
        resolve(res.insertedId)
      else
        reject({message: '操作失败'})
    }, err => reject(err))
  })
}

Model.prototype.deleteOne = function(condition) {
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
