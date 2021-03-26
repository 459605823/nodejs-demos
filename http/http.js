var http = require('http')
var fs = require('fs')

// 返回新建的http.server实例
const server = http.createServer()

// 每次有请求时都会触发request事件
server.on('request', function(req, res) {
  console.log('收到新的请求')
  // res.write('hello,')
  // res.write(' nodejs!')
  // 此方法向服务器发出信号，表明已发送所有响应头和主体，该服务器应该视为此消息已完成。 必须在每个响应上调用此 response.end() 方法。
  // res.end()

  // 如果指定了 data，则相当于调用 response.write(data, encoding) 之后再调用 response.end(callback)。
  // 数据格式必须为字符串或二进制buffer, 服务器默认编码格式为utf-8
  // res.end('hello world')

  var url = req.url
  var pros = [
    {
      name: 'coldzera',
      club: 'mibr'
    },
    {
      name: 'bntet',
      club: 'tyloo'
    },
    {
      name: 's1mple',
      club: 'navi'
    }
  ]
  switch (url) {
    case '/' :
    fs.readFile('./index.html', 'utf-8', function (error, data) {
      if (error) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('读取文件失败')
      } else {
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(data)
      }
    })
    break;
    case '/login' :
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('login登录页')
    break;
    case '/pros' :
    res.end(JSON.stringify(pros))
    break;
    case '/img':
    fs.readFile('./ss.png', function (error, data) {
      if (error) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('读取文件失败')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
    break;
    default :
    res.end('404 NOT FOUND')
    break;
  }
})

server.listen(3000, function() {
  console.log('server is listening at http://localhost:3000')
})