const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: '/public/img/avatar-max-img.png'
  },
  bio: {
    type: String,
    default: ''
  },
  gender: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1
  },
  birth: {
    type: Date
  },
  meta: {
    //创建时间
    createAt: {
      type: Date,
      default: Date.now()
    },
    //更新时间
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

module.exports = mongoose.model('User', userSchema)