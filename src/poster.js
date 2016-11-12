let apisPromise = require('./api')

function sendBodyWraper(sendBody) {
  if(typeof(sendBody) == 'string') return {
    ok: 0,
    message: sendBody
  }
  else if(typeof(sendBody) == 'boolean')
    return sendBody? {ok: 1}: {ok: 0}
  else if(sendBody.ok == 0)
    return {
      ok: 0,
      message: sendBody.message
    }
  else return {
    ok: 1,
    data: sendBody
  }
}

function checkRequirdProps(requiredProps, body) {
  if(requiredProps == undefined) return true
  for(let i = 0; i < requiredProps.length; i++) {
    let checkObject = requiredProps[i]
    if(typeof(checkObject) == 'string') checkObject = {name: checkObject}
    let value = body[checkObject.name]
    if(value == undefined || value == null) return false
    if(checkObject.test && !checkObject.test(value)) return false
    if(checkObject.pattern && !checkObject.pattern.test(value)) return false
  }
  return true
}

module.exports = new Promise(resolve => {
  apisPromise.then(postList => {
    resolve(
      app => {
        for(let key in postList) {
          app.post(key, (req, resp) => {
            /* debug  start */
            resp.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
            resp.setHeader('Access-Control-Allow-Credentials', true)
           /* debug end */
            let handlerObject = postList[key]
            if(typeof(handlerObject)!='object')
              handlerObject = {handler: handlerObject}
            //参数必要性检查
            if(checkRequirdProps(handlerObject.requiredProps, req.body)) {
              let validators = handlerObject.validators || []
              if(typeof(validators) == 'function') validators = [validators]
              // 拦截验证器
              for(let i = 0; i < validators.length; i++) {
                 let next = validators[i](req.session, req)
                 if(next != true) {
                   resp.json({ok: 0, message: next})
                   return
                 }
              }

              let resultPromise = handlerObject.handler(req.body, req.session)

              if(!resultPromise instanceof Promise)
                resultPromise = Promise.resolve(resultPromise)
              resultPromise.then(data => resp.json(sendBodyWraper(data)), err => {
                console.log(err) // debug
                resp.json({ok: 0, message: '操作失败...'})
              })
            }
            //请求参数错误
            else{
              resp.json({ok: 0, message: '参数错误...'})
            }

          })
        }
      }
    )
  })
})
