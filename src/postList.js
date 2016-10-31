let Article = require('./model/Article')

// Test...
setTimeout(_ => {
  Article.deleteAll({item: 'box'}).then(result =>{
    console.log('updated !')
    console.log(result)
  }, err => {
    console.log(err)
  })
}, 2000)

module.exports = {
  '/fetch-all-articles': body => {
    return new Promise((resolve, reject) => {
      resolve({
        data: 'hello world' + body.name
      })
    })
  }


}
