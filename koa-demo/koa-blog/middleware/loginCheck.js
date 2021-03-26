const { ErrModel } = require("../model/resModel")

module.exports = async (ctx, next) => {
  if (ctx.session.username) {
    await next()
  } else {
    ctx.body = new ErrModel('未登录')
  }
}
