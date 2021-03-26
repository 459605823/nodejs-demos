const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const queryString = require("querystring")
const { get, set } = require("./src/db/redis")
const { access } = require('./src/utils/log')

// session 数据
// const SESSION_DATA = {}

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on("end", () => {
      if (!postData) {
        resolve({})
        return 
      }
      resolve(JSON.parse(postData))
    })
  })
}

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

const serverHandler = (req, res) => {
  // 记录 access log
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

  res.setHeader('Content-type', 'application/json')
  
  // 获取 path
  const url = req.url
  req.path = url.split("?")[0]
  
  // 解析 query
  req.query = queryString.parse(url.split("?")[1])

  // 解析 cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1]
    req.cookie[key] = val
  })

  // 解析 Session
  let needSetCookie = false
  let userId = req.cookie.userId
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    set(userId, {})
  }
  req.sessionId = userId
  // 根据sessionId获取对应redis中存储的信息
  get(req.sessionId)
    .then(sessionData => {
      if (sessionData) {
        req.session = sessionData
      } else {
        set(req.sessionId, {})
        req.session = {}
      }
      return getPostData(req)
    })
    .then(postData => {
      // 将数据设置在req.body 类似body-parser
      req.body = postData

      // 处理 blog 路由
      const blogRes = handleBlogRouter(req, res)
      if (blogRes) {
        blogRes.then(data => {
          if (needSetCookie) {
            // 设置cookie
            res.setHeader(
              "Set-Cookie",
              `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
            )
          }
          res.end(JSON.stringify(data))
        })
        return
      }

      // 处理 user 路由
      const userRes = handleUserRouter(req, res)
      if (userRes) {
        userRes.then(data => {
          if (needSetCookie) {
            // 设置cookie
            res.setHeader(
              "Set-Cookie",
              `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
            )
          }
          res.end(JSON.stringify(data))
        })
        return
      }

      // 未命中路由，返回 404
      res.writeHeader(404, { "Content-type": "text/plain" })
      res.end("404 NOT FOUND")
    })
}

module.exports = serverHandler