const mongoose = require('mongoose')

const Schema = mongoose.Schema

// 连接数据库
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true}, { useFindAndModify: false })

// 设计集合结构
// 限制输入的字段及类型：String Number Date Buffer Boolean Mixed ObjectId Array
var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

// 将集合结构转化为模型
// mongoose.model第一个参数为集合名称，会被转化为小写的复数(users)，要与返回的模型构造函数相同
var User = mongoose.model('User', userSchema)

// 增加数据
// var admin = new User({
//   username: 'wjn',
//   password: '123'
// })

// admin.save(function(err, res) {
//   if (err) {
//     console.log('保存失败')
//   } else {
//     console.log('保存成功')
//     console.log(res)
//   }
// })

// 查找当前集合中的全部数据
// User.find(function(err, res) {
//   if (err) {
//     console.log('查询失败')
//   } else {
//     console.log(res)
//   }
// })

// 根据条件查询
User.findOne({username: 'wjn'}, (err, res) => {
  if (err) {
    console.log('查询失败')
  } else {
    console.log(res)
  }
})

// 删除数据 deleteOne 和 deleteMany
// User.deleteOne({username: 'wjn'}, (err) => {
//   if (err) {
//     console.log('删除失败')
//   } else {
//     console.log('删除成功')
//   }
// })

// 更新数据
// User.findOneAndUpdate({username: 'wjn'}, {password: '1234'}, function(err, res) {
//   if (err) {
//     console.log('更新失败')
//   } else {
//     console.log('更新成功')
//   }
// })