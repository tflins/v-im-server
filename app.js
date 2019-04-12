const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')

const port = process.env.PORT || 5000

// 实例化 koa,Router 对象
const app = new Koa()
const router = new Router()

// 配置中间件
app.use(bodyParser())
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

// 配置路由
router.get('/', async ctx => {
  ctx.body = {msg: 'hello'}
})

app.listen(port, () => {
  console.log(`监听${port}中`)
})
