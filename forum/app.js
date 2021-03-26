const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const router = require('./routes')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const dbUrl = 'mongodb://localhost/forum'

mongoose.connect(dbUrl, {useNewUrlParser: true})

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
  secret: 'forum', // 配置加密字符串，在原加密字符串基础上拼接这个字符串
  resave: false,
  saveUninitialized: true, // 默认添加session
  store: new MongoStore({ // 默认session数据存储在内存中，服务器一旦重启就会丢失，将session存储在mongodb中进行持久化处理
    url: dbUrl,
    collection: 'sessions'
  })
}))

app.engine('html', require('express-art-template'))

app.use(router)

// 配置处理404的中间件
app.use((req, res) => {
  res.render('404.html')
})

// 全局错误处理中间件 
app.use((err, req, res, next) => {
  res.status(500).json({
    err_code: 500,
    msg: err.message
  })
})

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000')
})