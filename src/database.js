let Mongo = require('mongodb').MongoClient

module.exports = _ => new Promise((resolve, reject) => {
  Mongo.connect('mongodb://riddleoo:cheng1314520@115.159.188.161:27017/yiifan')
  .then(db => {
    console.log('已连接到数据库...')
    resolve(db)
  }, _ => {
    console.log('连接数据库失败...')
  })
})
