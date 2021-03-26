// 数据库配置文件

const env = process.env.NODE_ENV // 环境变量

let MYSQL_CONFIG
let REDIS_CONFIG

// 根据不同环境要有不同配置

if (env === "development") {
  // mysql
  MYSQL_CONFIG = {
    host: "localhost",
    user: "root",
    password: "wjn63201697",
    port: "3306",
    database: "myblog",
  }

  // redis
  REDIS_CONFIG = {
    port: 6379,
    host: "127.0.0.1",
  }
}

// 真正上线时要使用线上配置
if (env === "production") {
  // mysql
  MYSQL_CONFIG = {
    host: "localhost",
    user: "root",
    password: "wjn63201697",
    port: "3306",
    database: "myblog",
  }

  // redis
  REDIS_CONFIG = {
    port: 6379,
    host: "127.0.0.1",
  }
}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG,
}
