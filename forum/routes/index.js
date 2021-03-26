const express = require('express')
const router = express.Router()
const User = require('../schemas/user')
const md5 = require('blueimp-md5')
const fm = require('formidable')
const path = require('path')

router.get('/', (req, res) => {
  res.render('index.html', {
    user: req.session.user
  })
})

router.get('/login', (req, res) => {
  res.render('login.html')
})

router.post('/login', (req, res, next) => {
  var body = req.body
  User.findOne({
    email: body.email,
    password: md5(md5(body.password))
  }).then((user) => {
    if (user) {
      // 登录成功，将登录信息保存到session，记录登录状态
      req.session.user = user
      res.status(200).json({
        err_code: 0,
        msg: 'OK'
      })
    } else {
      res.status(200).json({
        err_code: 1,
        msg: '邮箱或密码错误'
      })
    }
  }).catch((err) => {
    next(err)
  })
})

router.get('/register', (req, res) => {
  res.render('register.html')
})

router.post('/register', (req, res, next) => {
  var body = req.body
  User.findOne({email: body.email}).then((data) => {
    if (data) {
      res.status(200).json({
        err_code: 1,
        msg: '邮箱已存在'
      })
    } else {
      User.findOne({nickname: body.nickname}).then((data) => {
        if (data) {
          res.status(200).json({
            err_code: 2,
            msg: '昵称已存在'
          })
        } else {
          body.password = md5(md5(body.password))
          new User(body).save().then((data) => {
            // 注册成功，将注册信息保存到session，记录登录状态
            req.session.user = data
            res.status(200).json({
              err_code: 0,
              msg: 'OK'
            })
          })
        }
      })
    }
  }).catch((err) => {
    next(err)
  })
})

router.get('/logout', (req, res) => {
  delete req.session.user
  res.redirect('/login')
})

router.get('/settings/profile', (req, res) => {
  console.log(req.session.user)
  res.render('settings/profile.html', {
    user: req.session.user
  })
})

router.post('/settings/profile', (req, res, next) => {
  var body = req.body
  for (var key in body) {
    req.session.user[key] = body[key]
  }
  User.findOneAndUpdate({email: body.email}, body, (err) => {
    if (err) {
      next(err)
    } else {
      res.json({
        err_code: 0
      })
    }
  })
})

router.get('/settings/admin', (req, res) => {
  res.render('settings/admin.html', {
    user: req.session.user
  })
})

router.get('/topics/123', (req, res) => {
  res.render('topic/show.html', {
    user: req.session.user
  })
})

router.get('/topics/new', (req, res) => {
  res.render('topic/new.html', {
    user: req.session.user
  })
})

router.post('/uploadAvatar', (req, res, next) => {
  var form = new fm.IncomingForm()
  form.keepExtensions = true
  form.type = true
  form.uploadDir = path.resolve('/code/nodejs/forum/public/uploadAvatar')
  form.parse(req)
  form.on('file', (field, file) => {
    var pathObj = path.parse(file.path)
    var newAvatar = path.join('/public/uploadAvatar', pathObj.base)
    req.session.user.avatar = newAvatar
    User.findOneAndUpdate({nickname: req.session.user.nickname}, {avatar: newAvatar}, (err) => {
      if (err) {
        next(err)
      } else {
        res.json({
          err_code: 0,
          avatar: newAvatar
        })
      }
    })
  })
})

module.exports = router