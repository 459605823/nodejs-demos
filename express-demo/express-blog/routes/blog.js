const express = require('express')
const router = express.Router()
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require("../controler/blog")
const { SuccessModel, ErrModel } = require("../model/resModel")
const loginCheck = require('../middleware/loginCheck')

router.get('/list', (req, res, next) => {
  let author = req.query.author || ""
  const keyword = req.query.keyword || ""
  // 如果有isadmin，则表示为admin页面的请求，此时需要进行登录验证
  if (req.query.isadmin) {
    // 未登录
    if (!req.session.username) {
      return res.json(new ErrModel('未登录'))
    }
    // 只能操作自己的博客
    author = req.session.username
  }
  const result = getList(author, keyword)
  result.then(data => {
    res.json(new SuccessModel(data)) 
  })
})

router.get('/detail', (req, res, next) => {
  const result = getDetail(req.query.id)
  result.then(data => {
    if (data) {
      res.json(new SuccessModel(data))
    } else {
      res.json(new ErrModel("您查找的文章不见了。。。"))
    }
  })
})

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  const result = newBlog(req.body)
  result.then(data => {
    res.json(new SuccessModel(data))
  })
})

router.post('/update', loginCheck, (req, res, next) => {
  const result = updateBlog(req.query.id, req.body)
  result.then(val => {
    if (val) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrModel("更新博客失败")) 
    }
  })
})

router.post('/del', loginCheck, (req, res, next) => {
  const result = delBlog(req.query.id, req.session.username)
  result.then(val => {
    if (val) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrModel("删除博客失败"))
    }
  })
})

module.exports = router
