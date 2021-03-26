const redis = require('redis')

// 创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1')

redisClient.on('error', err => {
  console.error(err)
})

redisClient.set('myname', 'zhangsan', redis.print)
redisClient.get('myname', (err, val) => {
  if (err) {
    console.error(err)
  } else {
    console.log(val)
  }
  // 退出
  redisClient.quit()
})