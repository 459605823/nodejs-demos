const http = require("http")
const queryString = require("querystring")
const url = require("url")

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    console.log('req content-type:', req.headers['content-type'])
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      console.log('postData:', postData)
      res.end('hello')
    })
  } else {
    res.end('hello')
  }
})

server.listen(3000, () => {
  console.log("server is running at http://localhost:3000")
})
