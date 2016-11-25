let co = require('co')

let Article = require('../model/Article')
let validators = require('./validators')

let ObjectId = require('mongodb').ObjectId

let propArticleId = {
  name: 'id',
  pattern: /^[a-f0-9]{24}$/
}

let propArticleTitle = {
  name: 'title',
  test: title => title + ''
}

module.exports = {
  '/fetch-all-articles': {
    validators: validators.CheckDomainUser,
    handler: (body, session) => {
      let username = session.user.username
      // 倒序
      return Article.findAll({user: username}, {user: 0}, { sort: {_id: -1}})
    }
  },

  '/create-article': {
    requiredProps: [propArticleTitle, 'content'],
    validators: validators.CheckUserSignIn,
    handler: co.wrap(function* ({title, content}, session) {
      let id = yield Article.insert({title, content, user: session.user.username, date: (new Date()).getTime()})
      return { id }
    })
  },

  '/delete-article': {
    requiredProps: [propArticleId],
    validators: validators.CheckUserSignIn,
    handler: co.wrap(function* ({id}, session) {
      let n = yield Article.deleteOne({_id: ObjectId(id), user: session.user.username})
      if(n == 1) return true
      else return false
    })
  },

  '/edit-article': {
    requiredProps: [propArticleId, propArticleTitle, 'content'],
    validators: validators.CheckUserSignIn,
    handler: co.wrap(function * ({ id, title, content }, session) {
      yield Article.updateOne(
        { _id: ObjectId(id), user: session.user.username },
        { $set: {title, content, date: (new Date()).getTime()} }
      )
      return true
    })
  }
}
