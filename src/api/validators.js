let validators = {}

validators.CheckDomainUser  = session => {
  if(session.user) return true
  else return '对应域名没有指定用户...'
}

validators.CheckUserSignIn = [validators.CheckDomainUser, session => {
  if(session.user.signin) return true
  else return '用户未登录...'
}]

module.exports = validators
