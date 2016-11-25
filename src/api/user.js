let User = require('../model/User')
let co = require('co')
let validators = require('./validators')

module.exports = {

  '/visit-website-user': {
      requiredProps: ['href'],
      validators: validators.AccessLog,
      handler: co.wrap(function* ({ href }, session) {
        let users = yield User.findAll({}, {_id: 0, password: 0, join_time: 0})
        let filteredUsers  = users.filter(user => href && href.indexOf(user.own_domain) > -1)
        session.user = filteredUsers[0]
        if(session.user) return session.user
        else return '对应域名没有指定的用户'
      })
   },

  '/sign-in': {
    requiredProps: ['password'],
    validators: validators.CheckDomainUser,
    handler: co.wrap(function* ({ password }, session) {
      let user = yield User.findOne({username: 'cheng', password})
      if(user) {
        session.signin = true
        return true
      }
      else return '密码错误...'
    })
  },

  '/sign-out': {
    validators: validators.CheckDomainUser,
    handler: (body, session) => {
      session.signin = false
      return true
    }
  },

  '/check-sign-in': {
    validators: validators.CheckDomainUser,
    handler: (body, session) => session.signin? true: false
  },

  '/set-user-info': {
    validators: validators.CheckUserSignIn,
    handler: co.wrap(function* ({nickname, sex, intro}, session) {
      yield User.updateOne({username: session.user.username}, {$set: {nickname, sex, intro}})
      return true
    })
  },

  '/reset-user-password': {
    validators: validators.CheckUserSignIn,
    handler: co.wrap(function* ({password}, session) {
      yield User.updateOne({username: session.user.username}, {$set: {password}})
      return true
    })
  }

}
