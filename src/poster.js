let apisPromise = require('./api')

module.exports = new Promise(resolve => {
  apisPromise.then(postList => {
    resolve(
      app => {
        for(let key in postList) {
          app.post(key, (req, resp) => {
            /* debug  start */
            console.log(req.body)
            resp.setHeader('Access-Control-Allow-Origin', '*')
           /* debug end */
            let promiseOrNot = postList[key](req.body, req.session)
            if(promiseOrNot instanceof Promise)
              promiseOrNot.then(data => resp.json(data))
            else resp.json(promiseOrNot)
          })
        }
      }
    )
  })
})
