const fs = require('fs')
const path = require('path')

// 绑定可写流到可读流，将可读流自动切换到流动模式，并将可读流的所有数据推送到绑定的可写流。 
// 数据流会被自动管理，所以即使可读流更快，目标可写流也不会超负荷。
// stream.pipe(stream)

// 标准输入输出
// process.stdin.pipe(process.stdout)

const http = require('http')

const filename1 = path.resolve(__dirname, 'data.txt')

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    req.pipe(res)
  }
  if (req.method === 'GET') {
    const readStream = fs.createReadStream(filename1)
    readStream.pipe(res)
  }
})

server.listen(8000)

// 复制文件

const filename2 = path.resolve(__dirname, 'data-bak.txt')

const readStream = fs.createReadStream(filename1)
const writeStream = fs.createWriteStream(filename2)

readStream.pipe(writeStream)

readStream.on('data', chunk => {
  console.log(chunk.toString())
})

readStream.on('end', () => {
  console.log('copy done')
})