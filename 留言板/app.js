var http = require('http')
var fs = require('fs')
var template = require('art-template')
var url = require('url')

var comments = [
  {
    name: '孙笑川',
    message: 'nmsl',
    dateTime: '2019-5-6'
  },
  {
    name: '孙笑川',
    message: 'nmsl',
    dateTime: '2019-5-6'
  },
  {
    name: '孙笑川',
    message: 'nmsl',
    dateTime: '2019-5-6'
  }
]

var app = http.createServer((req, res) => {
  var urlObj = url.parse(req.url, true)
  var pathname = urlObj.pathname
  if (pathname === '/') {
    fs.readFile('./views/index.html', (error, data) => {
      if (error) {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.end('404 NOT FOUND')
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'})
        var htmlStr = template.render(data.toString(), {
          comments: comments
        })
        res.end(htmlStr)
      }
    })
  } else if (pathname.indexOf('/public/') === 0) { // 处理静态资源
    fs.readFile('.' + pathname, (error, data) => {
      if (error) {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.end('404 NOT FOUND')
      } else {
        res.writeHead(200, {'Content-Type': 'text/css'})
        res.end(data)
      }
    })
  } else if (pathname === '/post') {
    fs.readFile('./views/post.html', (error, data) => {
      if (error) {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.end('404 NOT FOUND')
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(data)
      }
    })
  } else if (pathname === '/pinglun') {
    var comment = urlObj.query
    comment.dateTime = new Date()
    comments.push(comment)
    res.writeHead(302, {'Location': '/'})
    res.end()
  } else {
    fs.readFile('./views/404.html', (error, data) => {
      if (error) {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.end('404 NOT FOUND')
      } else {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end(data)
      }
    })
  }
})

app.listen(3000, function() {
  console.log('server is running at http://localhost:3000/')
})