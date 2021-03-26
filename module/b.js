// module.exports和exports指向同一个变量，初始时都默认为空对象
// 可以将module.exports赋予一个新对象
// module.exports = {
//   foo: foo,
//   add: add
// }

// 不可以将exports赋予一个新对象, 这样就改变了exports变量的指向, 并没有导出任何东西
// 如果我们要输出的是一个函数或数组，那么，只能给module.exports赋值：
// module.exports = function (x, y) {
//   return x + y
// }
// exports = function(){} 不行，因为赋值后，module.exports仍然是空对象{}

var add = function(x, y) {
  return x + y
}

var foo = 'foo'

// commonJS导出的是值的拷贝，并会缓存，不存在实时更新
module.exports = {
  foo: foo,
  add: add
}
// exports.foo = 'foo'
// exports.add = add

foo = 'bar'
