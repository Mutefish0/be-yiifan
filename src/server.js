let express = require('express')
let app = express()

let bodyParser = require('body-parser')
let session = require('express-session')

let poster = require('./poster')



module.exports = port => new Promise((resolve, reject) => {

  //请求体转化为json
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))

  //使用express-session
  app.use(session({
    secret: 'MY_OWN_SECRET_AHA',
    cookie: { maxAge: 600000}, //10分钟
    resave: false,
    saveUninitialized: true
  }))

  //
  poster(app)

  app.listen(port)

  console.log('服务器已启动...')
})
