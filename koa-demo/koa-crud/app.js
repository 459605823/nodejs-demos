const Koa = require('koa')
const app = new Koa()
const router = require('./router')
const serve = require('koa-static')
const path = require('path')
const render = require('koa-art-template')
const koaBody = require('koa-body')

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
})

// 第三方中间件 开放静态目录
app.use(serve(path.join(__dirname)))

app.use(koaBody())


app.on('error', (err, ctx) => {
  console.error('Server error', err)
})

app.use(router.routes())

app.listen(3000)
console.log('Server is running at http://localhost:3000')