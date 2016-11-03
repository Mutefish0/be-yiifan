let Model =require('../model/Model')
let apis = {}

let article = require('./article')

Object.assign(apis, article)



module.exports = new Promise((resolve, reject) => {
  Model.waitCompleted().then(_ => {
    console.log('api配置完成')
    resolve(apis)
  })
})
