let Article = require('./model/Article')

// Test...
setTimeout(_ => {
  Article.insert({
    title: 'test',
    content: 'testing...',
    date: '1223'
  }).then(result => {
    console.log(result.result)
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
