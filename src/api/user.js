let User = require('../model/User')
let co = require('co')
let validators = require('./validators')

module.exports = {

  '/visit-website-user': {
      validators: validators.Access,
      handler: co.wrap(function* (body, session) {
        let user = yield User.findOne({ username: session.username}, {_id: 0, password: 0, join_time: 0})
        if(user) return user
        else return '对应域名没有指定的用户'
      })
   },

  '/sign-in': {
    requiredProps: ['password'],
    validators: validators.CheckDomainUser,
    handler: co.wrap(function* ({ password }, session) {
      let user = yield User.findOne({username: session.username, password})
      if(user) {
        session.signin = true
        return true
      }
      else return '密码错误...'
    })
  },

  '/sign-out': (body, session) => {
    session.signin = false
    return true
  },

  '/check-sign-in': {
    validators: validators.CheckDomainUser,
    handler: (body, session) => session.signin? true: false
  },

  '/set-user-info': {
    validators: validators.CheckUserSignIn,
    handler: co.wrap(function* ({nickname, sex, intro}, session) {
      yield User.updateOne({username: session.username}, {$set: {nickname, sex, intro}})
      return true
    })
  },

  '/reset-user-password': {
    validators: validators.CheckUserSignIn,
    handler: co.wrap(function* ({password}, session) {
      yield User.updateOne({username: session.username}, {$set: {password}})
      return true
    })
  }

}
