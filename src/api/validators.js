let validators = {}
let Acclog = require('../model/Acclog')

validators.CheckDomainUser  = session => {
  if(session.user) return true
  else return '对应域名没有指定用户...'
}

validators.CheckUserSignIn = [validators.CheckDomainUser, session => {
  if(session.signin) return true
  else return '用户未登录...'
}]

function getClientIp(req) {
     return req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
 }

validators.AccessLog = (session, req) => {
  Acclog.insert({
    ip: getClientIp(req),
    date: (new Date()).getTime()
  })
  return true
}

module.exports = validators
