const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const serve = require('koa-static')
const path = require('path')

// koa本身没有捆绑任何中间件，需要自行编写后app.use来使用中间件或直接使用第三方包
// express采用“尾递归”方式，中间件一个接一个的顺序执行, 习惯于将response响应写在最后一个中间件中
// 而koa的中间件支持 generator, 执行顺序是“洋葱圈”模型。遇到await next()时，会暂停该中间件并将控制权传递给下一个中间件
// 当下游没有更多的中间件时，恢复执行其上游的中间件
// express也可以形成“洋葱圈”模型，但一般不这么写，因为 express的response一般在最后一个中间件，
// 所以其它中间件 next() 后的代码影响不到最终结果

// 原生路由
// app.use(async (ctx, next) => {
//   await next()
//   if (ctx.path != '/') {
//     ctx.type = 'text/html'
//     ctx.body = `
//       <h1>another page</h1>
//       <h1><a href="/">jump to / page</a></h1>   
//     `
//   } else {
//     ctx.response.type = 'text/html'
//     ctx.response.body = '<h1>/ page</h1>'
//   }
// })

// 第三方中间件 开放静态目录
app.use(serve(path.join(__dirname)))

// 全局中间件
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.method} ${ctx.url}`)
  await next()
})

router.get('/', async (ctx, next) => {
  ctx.type = 'text/html'
  ctx.body = `
    <h1>index page</h1>
    <h1><a href="/other">jump to other page</a></h1>
  `
})

router.get('/other', async (ctx, next) => {
  ctx.type = 'text/html'
  ctx.body = `
    <h1>another page</h1>
    <h1><a href="/">jump to index page</a></h1>   
  `
})

router.get('/redirect', async (ctx, next) => {
  ctx.redirect('/')
})

router.get('/cookie', async (ctx, next) => {
  let n = parseInt(ctx.cookies.get('views') || 0) + 1
  ctx.cookies.set('views', n)
  ctx.type = 'text/html'
  ctx.body = `<h1>${n} views</h1>`
})

app.on('error', (err, ctx) => {
  console.error('Server error', err)
})

app.use(router.routes())

app.listen(3000)
console.log('Server is running at http://localhost:3000')