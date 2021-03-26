const { exec, escape } = require("../db/mysql")
const { genPassword } = require('../utils/cryp')

exports.login = (username, password) => {
  // 防止 sql注入
  username = escape(username)
  // 生成加密密码
  password = escape(genPassword(password))
  const sql = `select username, realname from users where username=${username} and password=${password};`
  return exec(sql).then(arr => {
    return arr[0]
  })
}