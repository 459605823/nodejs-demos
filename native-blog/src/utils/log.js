const fs = require('fs')
const path = require('path')

// 生成 writeStream
function createWriteStream(filename) {
  const fullFileName = path.join(__dirname, '../', '../', 'logs', filename)
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a' // 追加写入
  })
  return writeStream
}

// 通用写日志函数
function writeLog(writeStream, log) {
  // writeable.write()写入数据到流
  writeStream.write(log + '\n')
}

// 生成访问日志写入流
const accessWriteStream = createWriteStream('access.log')
// 写访问日志函数
function access(log) {
  writeLog(accessWriteStream, log)
}

module.exports = {
  access
}