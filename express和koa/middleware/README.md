## 中间件（middleware）

中间件（Middleware） 是一个函数，它可以访问请求对象（request object (`req`)）, 响应对象（response object (`res`)）, 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 `next `的变量。

如果当前中间件没有终结请求-响应循环，则必须调用 next() 方法将控制权交给下一个中间件，否则请求就会挂起。

## Express 的中间件

Express 应用程序本质上是一系列中间件函数调用。

中间件功能可以执行以下任务：

1. 执行任何代码
2. 更改请求和响应对象
3. 终止请求和响应
4. 调用堆栈中的下一个中间件函数

如果当前的中间件函数没有结束请求 - 响应周期， 它必须调用 next（） 将控制权传递给下一个中间件函数

express 中间件分类

1. 应用程序级中间件

```js
app.use((req, res, next) => {
  console.log('我是处理任何请求的中间件');
  next();
});

app.use('/user', (req, res, next) => {
  console.log(req.url);
  res.send(`我是处理任何请求以/user开头路由的中间件`);
});
```

2. 路由级中间件

```js
const router = express.Router();

router.use((req, res, next) => {
  console.log('处理所有请求路由的中间件');
  next();
});

router.get('/route', (req, res, next) => {
  res.send('路由级中间件');
});

app.use(router);
```

3. 错误处理中间件
   错误处理中间件必须提供 4 个参数,当之前的中间价调用 next(err) 就会直接进入错误处理中间件

```js
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

4. 内置中间件: `express.static`、`express.json`、`express.urlencoded`

```js
app.use('/public', express.static(path.join(__dirname, 'public')));
```

5. 第三方中间件

```js
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
```

## Koa 的中间件

koa 本身没有捆绑任何中间件，需要自行编写后 app.use 来使用中间件或直接使用第三方包
基本上，Koa 所有的功能都是通过中间件实现的，每个中间件默认接受两个参数，第一个参数是 Context 对象，第二个参数是 next 函数。只要调用 next 函数，就可以把执行权转交给下一个中间件。

```js
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const serve = require('koa-static');
const path = require('path');

// 第三方中间件
app.use(serve(path.join(__dirname)));

// 全局中间件
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.method} ${ctx.url}`);
  await next();
});

// 路由中间件
router.get('/', async (ctx, next) => {
  ctx.type = 'text/html';
  ctx.body = `
    <h1>index page</h1>
    <h1><a href="/other">jump to other page</a></h1>
  `;
});

router.get('/other', async (ctx, next) => {
  ctx.type = 'text/html';
  ctx.body = `
    <h1>another page</h1>
    <h1><a href="/">jump to index page</a></h1>   
  `;
});

app.use(router.routes());

app.listen(3000);
console.log('Server is running at http://localhost:3000');
```

## 区别及执行顺序

express 采用“尾递归”方式，中间件一个接一个的顺序执行, 习惯于将 response 响应写在最后一个中间件中

而 koa 的中间件支持 generator, 执行顺序是“洋葱圈”模型。

![洋葱圈模型](https://segmentfault.com/img/remote/1460000016386743?w=478&h=435)

不过实际上，express 的中间件也可以形成“洋葱圈”模型，在 next 调用后写的代码同样会执行到，不过 express 中一般不会这么做，因为 express 的 response 一般在最后一个中间件，那么其它中间件 next() 后的代码已经影响不到最终响应结果了

当一个中间件调用 next() 该函数的时候会暂停并将控制传递给定义的下一个中间件。
当在下游没有更多的中间件执行后，将会恢复执行其上游的中间件

#### 中间件栈

多个中间件会形成一个栈结构（middle stack），以"先进后出"（first-in-last-out）的顺序执行。

1. 最外层的中间件首先执行。
2. 调用 next 函数，把执行权交给下一个中间件。
3. 最内层的中间件最后执行。
4. 执行结束后，把执行权交回上一层的中间件。
5. 最外层的中间件收回执行权之后，执行 next 函数后面的代码。

```js
// express
const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log('111'); // 1
  next();
  console.log('222'); // 5
});

app.use((req, res, next) => {
  console.log('333'); // 2
  next();
  console.log('444'); // 4
});

app.use((req, res, next) => {
  next(); // 没有下一个中间件，调用后控制权返回本身
  console.log('555'); // 3
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
```

```js
// koa
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  console.log('111'); // 1
  await next();
  console.log('222'); // 5
});

app.use(async (ctx, next) => {
  console.log('333'); // 2
  await next();
  console.log('444'); // 4
});

app.use(async (ctx, next) => {
  await next(); // 没有下一个中间件，调用后控制权返回本身
  console.log('555'); // 3
});

app.listen(3001);
console.log('Server is running at http://localhost:3001');
```
