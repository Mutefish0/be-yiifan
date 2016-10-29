let postList = require('./postList')

module.exports = (app) => {
  for(var key in postList) {
    app.post(key, (req, resp) => {
      /* debug  start */
      console.log(req.body)
      resp.setHeader('Access-Control-Allow-Origin', '*')
     /* debug end */
      postList[key](req.body).then(data => resp.json(data))
    })
  }
}
