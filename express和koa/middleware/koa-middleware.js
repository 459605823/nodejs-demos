const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  console.log('111') // 1
  await next()
  console.log('222') // 5
});

app.use(async (ctx, next) => {
  console.log('333') // 2
  await next()
  console.log('444') // 4
});

app.use(async (ctx, next) => {
  await next()
  console.log('555') // 3
})


app.listen(3001)
console.log('Server is running at http://localhost:3001')