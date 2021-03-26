const http = require('http')
const queryString = require('querystring')
const url = require('url')

const server = http.createServer((req,res) => {
  console.log(req.method)
  // const url = req.url
  // 第二个参数为true时，会调用queryString模块的parse来解析生成查询字符串对象
  const urlObj = url.parse(req.url, true)
  console.log(urlObj)
  // req.query = queryString.parse(url.split('?')[1])
  res.end(JSON.stringify(urlObj.query))
})

server.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})