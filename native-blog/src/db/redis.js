const redis = require('redis')
const { REDIS_CONFIG } = require("../config/db")

// 创建客户端
const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)

redisClient.on('error', err => {
  console.error(err)
})

exports.set = (key, val) => {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val, redis.print)
}

exports.get = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return 
      }
      if (val) {
        try {
          resolve(JSON.parse(val))
        } catch (e) {
          resolve(val)
        }
      } else {
        resolve(null)
      }
    })
  })
}