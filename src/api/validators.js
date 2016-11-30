let validators = {}
let Acclog = require('../model/Acclog')
let mapOriginToUser = require('../../env').mapOriginToUser

validators.CheckDomainUser  = session => {
  if(session.username) return true
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

validators.Access = (session, req) => {
  // 获取网站作者
  let username = mapOriginToUser[req.headers.origin]
  if(username) session.username = username
  else return '对应域名没有指定用户...'
  //记录ip,域
  Acclog.insert({
    ip: getClientIp(req),
    origin: req.headers.origin,
    date: (new Date()).getTime()
  })
  return true
}

module.exports = validators
