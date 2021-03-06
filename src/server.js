let express = require('express')
let app = express()

let bodyParser = require('body-parser')
let session = require('express-session')

let posterPromise = require('./poster')

module.exports = port => new Promise((resolve, reject) => {

  //请求体转化为json
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))


  //使用express-session
  app.use(session({
    secret: 'MY_OWN_SECRET_AHA',
    cookie: { maxAge: 2*3600*1000}, //2个小时
    resave: false,
    saveUninitialized: false
  }))

  posterPromise.then(poster => {
    poster(app)
    app.listen(port)
    console.log('服务器已完成启动...')
  })

})
