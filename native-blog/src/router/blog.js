const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require("../controler/blog")
const { SuccessModel, ErrModel } = require('../model/resModel')

// 登录验证
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(
        new ErrModel("尚未登录")
    )
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // 如果有isadmin，则表示为admin页面的请求，此时需要进行登录验证
    if (req.query.isadmin) {
      const loginCheckRes = loginCheck(req)
      // 未登录
      if (loginCheckRes) {
        return loginCheckRes
      }
      // 只能操作自己的博客
      author = req.session.username
    }
    const result = getList(author, keyword)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const result = getDetail(id)
    return result.then(data => {
      if (data) {
        return new SuccessModel(data)
      } else {
        return new ErrModel('您查找的文章不见了。。。')
      }
    })
  }

  // 新建博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    const loginCheckRes = loginCheck(req)
    // 未登录
    if (loginCheckRes) {
      return loginCheckRes
    }
    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const loginCheckRes = loginCheck(req)
    // 未登录
    if (loginCheckRes) {
      return loginCheckRes
    }
    const result = updateBlog(id, req.body)
    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrModel('更新博客失败')
      }
    })
  }

  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    const loginCheckRes = loginCheck(req)
    // 未登录
    if (loginCheckRes) {
      return loginCheckRes
    }
    const result = delBlog(id, req.session.username)
    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrModel("删除博客失败")
      }
    })
  }
}

module.exports = handleBlogRouter