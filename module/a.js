// node优先加载核心模块和第三方模块
// 当没有以'./' '/' 或 '../' 开头来表示文件时，这个模块必须是一个核心模块或加载自node_modules目录
// 第三方模块查找顺序：当前目录node_modules中找到对应的包，在包中的package.json的main字段，找到入口文件，没有则使用index.js，
// 没有找到时就向上一级的node_modules中查找，不断向上查找直至达到磁盘根目录，如果最终没有找到就报错。

// var fs = require('fs')
// var foo = require('./b').foo
// var add = require('./b').add

// 在执行模块代码之前，Node.js 会使用一个如下的函数封装器将其封装：
// (function (exports, require, module, __filename, __dirname) {
//   // 模块的代码实际上在这里
// });
// 它保持了顶层的变量（用 var、 const 或 let 定义）作用在模块范围内，而不是全局对象。
// 它有助于提供一些看似全局的但实际上是模块特定的变量，
// 例如：实现者可以用于从模块中导出值的 module 和 exports 对象。  
// 包含模块绝对文件名和目录路径的快捷变量 __filename 和 __dirname 。

// 模块加载后会将返回值缓存起来
// 下次加载时直接读取缓存结果， 避免文件 I / O 和解析时间
// 导出对象缓存在 Module._cache 对象上

// ES6解构赋值
var {foo, add} = require('./b')

console.log(foo)

console.log(add(5, 6))