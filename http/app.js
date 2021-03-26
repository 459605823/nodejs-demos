const http = require("http")
const queryString = require("querystring")
const url = require("url")

const server = http.createServer((req, res) => {
  const method = req.method
  const urlObj = url.parse(req.url, true)
  const path = urlObj.pathname
  const query = urlObj.query
  // 设置返回格式为JSON
  res.setHeader('Content-type', 'application/json')
  // 返回的数据
  const resData = {
    method,
    url: req.url,
    path,
    query
  }
  if (method === 'GET') {
    res.end(JSON.stringify(resData))
  }

  if (method === 'POST') {
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      resData.postData = postData
      res.end(JSON.stringify(resData))
    })
  }
})

server.listen(3000, () => {
  console.log("server is running at http://localhost:3000")
})
