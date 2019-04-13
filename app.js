const Router = require('koa-router')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const socket = require('socket.io')

const db = require('./config/keys').mongoURI
const port = process.env.PORT || 5000

// 实例化 Koa, Router 对象
const app = new Koa()
const router = new Router()
// 创建服务器
const server = require('http').createServer(app.callback())
// io
const io = socket(server)

// 配置中间件
app.use(bodyParser())
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

// 配置路由
router.use('/api/user', require('./routes/api/user'))

// 连接数据库
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('连接数据库成功')
  })
  .catch(err => {
    console.log('连接数据库失败')
    throw err
  })

io.on('connection', () => {
  console.log('一个用户已连接')
  io.emit('login', '登录')
})

server.listen(port, () => {
  console.log(`监听${port}中`)
})
