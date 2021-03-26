const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const router = express.Router()

// Express应用程序本质上是一系列中间件函数调用。
// 中间件功能可以执行以下任务：
// 1. 执行任何代码
// 2. 更改请求和响应对象
// 3. 终止请求和响应
// 4. 调用堆栈中的下一个中间件函数

// 如果当前的中间件函数没有结束请求 - 响应周期， 它必须调用next（） 将控制权传递给下一个中间件函数

// express中间件分类
// 1. 应用程序级中间件
app.use((req, res, next) => {
  console.log('我是处理任何请求的中间件')
  next()
})

app.use('/user', (req, res, next) => {
  console.log(req.url)
  res.send(`我是处理任何请求以/user开头路由的中间件`)
})

// 2. 路由级中间件
router.use((req, res, next) => {
  console.log('处理所有请求路由的中间件')
  next()
})

function loginCheck(req, res, next) {
  console.log('模拟登录')
  next()
}

// 一个路由可以接收多个中间件
router.get('/route', loginCheck, (req, res, next) => {
  res.send('路由级中间件')
})

app.use(router)

// 3. 错误处理中间件
// 错误中间件必须提供4个参数
// 当之前的中间件调用 next(err) 就会直接进入错误处理中间件
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// 4. 内置中间件: express.static、express.json、express.urlencoded
app.use('/public', express.static(path.join(__dirname, 'public')))

// 5. 第三方中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('index page')
})

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})