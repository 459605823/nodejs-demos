const express = require('express')
const app = express()
const template = require('art-template')
const fs = require('fs')
const bodyParser = require('body-parser')

// 配置使用art-template模板引擎
// 当渲染以对应后缀结尾的文件时，使用art-template模板引擎
app.engine('html', require('express-art-template'))

// 配置body-parser: 解析POST请求，可以通过req.body获取POST请求数据
// parse application/x-www-form-urlencoded 解析表单数据
app.use(bodyParser.urlencoded({
  extended: false
}))
// parse application/json 解析json数据
app.use(bodyParser.json())

const comments = [{
    name: '孙笑川',
    message: 'nmsl',
    dateTime: '2019-5-6'
  },
  {
    name: '孙笑川',
    message: 'nmsl',
    dateTime: '2019-5-6'
  },
  {
    name: '孙笑川',
    message: 'nmsl',
    dateTime: '2019-5-6'
  }
]

// 公开静态目录
app.use('/public/', express.static('./public/'))
// 省略第一个参数，路径就不用加/public/，http://localhost:3000/css/main.css
// app.use('/public/', express.static('./public/'))

app.get('/', (req, res) => {
  // res.render(模板文件名, 模板数据, 回调函数)
  // 第一个参数为文件名，默认去项目中的views目录中查找，可通过app.set('views', 路径)来修改
  res.render('index.html', { comments: comments }, (err, html) => {
    if (err) {
      console.log(err)
    } else {
      res.send(html)
    }
  })
})

app.get('/post', (req, res) => {
  res.render('post.html')
})

app.post('/post', (req, res) => {
  var comment = req.body
  comment.dateTime = new Date()
  comments.push(comment)
  res.redirect('/')
})

app.listen(3000, () => {
  console.log('server is listening at http://localhost:3000')
})