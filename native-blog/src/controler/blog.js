const { exec, escape } = require('../db/mysql')
const xss = require('xss')

exports.getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    author = escape(author)
    sql += `and author=${author} `
  }
  if (keyword) {
    keyword = escape(keyword)
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`
  // 查询操作返回一个数组
  return exec(sql)
}

exports.getDetail = (id) => {
  let sql = `select * from blogs where id=${id};`
  // 查询出的数据无论有多少条，结果均为一个数组
  return exec(sql).then(arr => {
    return arr[0]
  })
}

exports.newBlog = (blogData = {}) => {
  // 防止 xss 攻击
  const title = xss(blogData.title)
  const content = xss(blogData.content)
  const author = blogData.author
  const createtime = Date.now()
  const sql = `insert into blogs (title, content, createtime, author) values('${title}', '${content}', ${createtime}, '${author}');`
  // 插入操作返回一个对象，其insertId表示当前插入数据在数据库中的id
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

exports.updateBlog = (id, blogData = {}) => {
  const title = xss(blogData.title)
  const content = xss(blogData.content)
  const sql = `update blogs set title='${title}', content='${content}' where id=${id};`
  // 更新操作返回一个对象，affectedRows属性表示当前更新操作改变的行数
  return exec(sql).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true
    } else {
      return false
    }
  })
}

exports.delBlog = (id, author) => {
  const sql = `delete from blogs where id=${id} and author='${author}';`
  // 删除操作返回一个对象，affectedRows属性表示当前删除操作改变的行数
  return exec(sql).then(delData => {
    if (delData.affectedRows > 0) {
      return true
    } else {
      return false
    }
  })
}