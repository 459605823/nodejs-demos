const { ErrModel } = require("../model/resModel")

module.exports = (req, res, next) => {
  if (req.session.username) {
    next()
  } else {
    res.json(new ErrModel('未登录'))
  }
}
