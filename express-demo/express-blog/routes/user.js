const express = require("express")
const router = express.Router()
const { login } = require("../controler/user")
const { SuccessModel, ErrModel } = require("../model/resModel")

router.post("/login", (req, res, next) => {
  const { username, password } = req.body
  const result = login(username, password)
  result.then(data => {
    if (data) {
      // 设置session
      req.session.username = data.username
      req.session.realname = data.realname
      res.json(new SuccessModel()) 
    } else {
      res.json(new ErrModel("登陆失败"))
    }
  })
})

module.exports = router
