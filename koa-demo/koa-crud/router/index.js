const router = require('koa-router')()
const controler = require('../util/dataControl')

router.get('/', async (ctx, next) => {
  await controler.findAll().then((students) => {
    ctx.render('index', {
      students: students
    })
  }).catch(err => {
    ctx.status = 500
    ctx.body = '服务器忙，请稍后重试'
  })
})

router.get('/students/new', async (ctx, next) => {
  await ctx.render('add')
})

router.post('/students/new', async (ctx, next) => {
  await controler.save(ctx.request.body).then(() => {
    ctx.redirect('/')
  }).catch(err => {
    ctx.status = 500
    ctx.body = '服务器忙，请稍后重试'
  })
})

router.get('/students/edit', async (ctx, next) => {
  await controler.findById(ctx.query.id).then((student) => {
    ctx.render('edit', {
      student: student
    })
  }).catch(err => {
    ctx.status = 500
    ctx.body = '服务器忙，请稍后重试'
  })
})

router.post('/students/edit', async (ctx, next) => {
  await controler.update(ctx.request.body).then(() => {
    ctx.redirect('/')
  }).catch(err => {
    ctx.status = 500
    ctx.body = '服务器忙，请稍后重试'
  })
})

router.get('/students/delete', async (ctx, next) => {
  await controler.delete(ctx.query.id).then(() => {
    ctx.redirect('/')
  }).catch(err => {
    ctx.status = 500
    ctx.body = '服务器忙，请稍后重试'
  })
})

module.exports = router