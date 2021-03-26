const router = require("koa-router")()
const { login } = require("../controler/user")
const { SuccessModel, ErrModel } = require("../model/resModel")

// 设置路由前缀
router.prefix('/api/user')

router.post("/login", async (ctx, next) => {
  const { username, password } = ctx.request.body
  const data = await login(username, password)
  if (data) {
    // 设置session
    ctx.session.username = data.username
    ctx.session.realname = data.realname
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrModel('登录失败')
  }
})

module.exports = router
