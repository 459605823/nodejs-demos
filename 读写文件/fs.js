// fs文件模块系统
var fs = require('fs')
var path = require('path')
// __dirname: 当前文件所属目录绝对路径
// __filename: 当前文件的绝对路径

// 读取文件：readFile(文件路径，文件描述符， 回调函数)
// 如果没有指定 encoding，则返回原始的 buffer。
// 如果 options 是字符串，则它指定字符编码

// !!! 文件操作中的相对路径为相当于执行node命令时所处的路径
// 文件操作使用相对路径不可靠，要使用绝对路径
var rPath = path.join(__dirname, 'rfs.txt')
console.log(rPath)
fs.readFile(rPath, 'utf-8', function (error, data) {
  if (error) {
    console.log('读取文件失败')
  } else {
    console.log(data)
  }
})

// 写入文件：writeFile(文件名, 数据, 文件描述符, 回调函数)
// 异步地将数据写入到一个文件，如果文件已存在则覆盖该文件。 data 可以是字符串或 buffer。
// 如果 data 是一个 buffer，则 encoding 选项会被忽略
// 如果 options 是一个字符串，则它指定字符编码
var wPath = path.join(__dirname, 'wfs.txt')
var opt = {
  encoding: 'utf8',
  flag: 'a' // 追加写入， 默认为'w', 覆盖写入
}
fs.writeFile(wPath, 'hello, nmsl!', opt, function (error, data) {
  if (error) {
    console.log('写入文件失败')
  } else {
    console.log('文件写入成功')
  }
})


