/*
* 数据操作模块
* 只负责操作数据库文件中的数据
*/

const fs = require('fs')

const dbPath = './db.json'

// 异步函数获取结果方法：回调函数、Promise、async/await、Generator
// exports.find = function (callback) { 回调函数
//   fs.readFile(dbPath, 'utf-8', (err, data) => {
//     if (err) {
//       callback(err)
//     } else {
//       callback(null, JSON.parse(data).students)
//     }
//   })
// }
// 获取所有数据列表
exports.findAll = function () { // 封装为Promise
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(data).students)
      }
    })
  })
}

// 根据ID查找相应学生信息
exports.findById = function (id) {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        var students = JSON.parse(data).students
        var res = students.find((item) => {
          return item.id == id
        })
        resolve(res)
      }
    })
  })
}

// 添加保存数据
exports.save = function (student) {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        var students = JSON.parse(data).students
        students.push(student)
        var newData = JSON.stringify({
          students: students
        })
        fs.writeFile(dbPath, newData, (err) => {
          if (err) {
            reject(err)
          } else {
            resolve(null)
          }
        })
      }
    })
  })
}

// 更新数据
exports.update = function (student) {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf-8', function (err, data) {
      if (err) {
        reject(err)
      } else {
        var students = JSON.parse(data).students
        var updateItem = students.find((item) => {
          return item.id == student.id
        })
        for (var key in student) {
          updateItem[key] = student[key]
        }
        var newData = JSON.stringify({
          students: students
        })
        fs.writeFile(dbPath, newData, (err) => {
          if (err) {
            reject(err)
          } else {
            resolve(null)
          }
        })
      }
    })
  })
} 

// 删除数据
exports.delete = function (id) {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf-8', function (err, data) {
      if (err) {
        reject(err)
      } else {
        var students = JSON.parse(data).students
        var delIndex = students.findIndex((item) => {
          return item.id == id
        })
        students.splice(delIndex, 1)
        var newData = JSON.stringify({
          students: students
        })
        fs.writeFile(dbPath, newData, (err) => {
          if (err) {
            reject(err)
          } else {
            resolve(null)
          }
        })
      }
    })
  })
}