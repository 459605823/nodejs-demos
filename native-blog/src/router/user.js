const { login } = require("../controler/user")
const { SuccessModel, ErrModel } = require('../model/resModel')
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
  const method = req.method

  // 登录
  if (method === "POST" && req.path === "/api/user/login") {
    const { username, password } = req.body
    const result = login(username, password)
    return result.then(data => {
      if (data) {
        // 设置session
        req.session.username = data.username
        req.session.realname = data.realname
        // 数据存入redis
        set(req.sessionId, req.session)
        return new SuccessModel()
      } else {
        return new ErrModel('登陆失败')
      }
    })
  }
}

module.exports = handleUserRouter
