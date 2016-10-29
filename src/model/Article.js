let Model = require('./Model')

let Article = new Model('article', {
  title: 'title',
  content: 'content',
  date: 'date'
})

module.exports = Article
