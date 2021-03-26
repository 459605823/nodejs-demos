const mysql = require("mysql")
const { MYSQL_CONFIG } = require("../config/db")

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONFIG)

// 连接数据库
con.connect()

// 执行sql语句
function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

module.exports = {
  exec,
  escape: mysql.escape,
}
