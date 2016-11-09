let Model =require('../model/Model')
let apis = {}

let article = require('./article')
let user = require('./user')

Object.assign(apis, article)
Object.assign(apis, user)



module.exports = new Promise((resolve, reject) => {
  Model.waitCompleted().then(_ => {
    console.log('api配置完成')
    resolve(apis)
  })
})
