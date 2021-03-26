const mysql = require('mysql')

// 创建连接对象
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'wjn63201697',
  port: '3306',
  database: 'myblog'
})

// 连接数据库
con.connect()

// 执行sql语句
const sql = 'select * from users;'
con.query(sql, (err, res) => {
  if (err) {
    console.error(err)
  } else {
    console.log(res)
  }
})

// 断开连接
con.end()