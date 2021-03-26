const router = require('koa-router')()
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require("../controler/blog")
const { SuccessModel, ErrModel } = require("../model/resModel")
const loginCheck = require('../middleware/loginCheck')

// 设置路由前缀
router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
  let author = ctx.query.author || ""
  const keyword = ctx.query.keyword || ""
  // 如果有isadmin，则表示为admin页面的请求，此时需要进行登录验证
  if (ctx.query.isadmin) {
    // 未登录
    if (!ctx.session.username) {
      return ctx.body = new ErrModel('未登录')
    }
    // 只能操作自己的博客
    author = ctx.session.username
  }
  const listData = await getList(author, keyword)
  ctx.body = new SuccessModel(listData)
})

router.get('/detail', async (ctx, next) => {
  const data = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(data)
})

router.post('/new', loginCheck, async (ctx, next) => {
  const body = ctx.request.body
  body.author = ctx.session.username
  const data = await newBlog(body)
  ctx.body = new SuccessModel(data)
})

router.post('/update', loginCheck, async (ctx, next) => {
  const result = await updateBlog(ctx.query.id, ctx.request.body)
  if (result) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrModel('更新博客失败')
  }
})

router.post('/del', loginCheck, async (ctx, next) => {
  const result = await delBlog(ctx.query.id, ctx.session.username)
  if (result) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrModel("删除博客失败")
  }
})

module.exports = router
