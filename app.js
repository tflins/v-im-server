const Router = require('koa-router')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const socket = require('socket.io')
const cors = require('koa2-cors')
const SocketIoController = require('./controllers/SocketIoController')
const passport = require('koa-passport')

const db = require('./config/keys').mongoURI
const port = process.env.PORT || 5000

// 实例化 Koa, Router 对象
const app = new Koa()
const router = new Router()
// 创建服务器
const server = require('http').createServer(app.callback())
// io
const io = socket(server)

// 配置解析post请求中间件
app.use(bodyParser())
app.use(cors())
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

// 配置路由
router.use('/api/user', require('./routes/api/user'))
router.use('/api/groupchart', require('./routes/api/groupChat'))
router.use('/api/friends', require('./routes/api/friends'))
router.use('/api/privatechat', require('./routes/api/privatechat'))

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

// 验证 token
app.use(passport.initialize())
app.use(passport.session())
// 回调到 config/passport.js 
require('./config/passport')(passport)

io.on('connection', socket => {
  // 登录
  socket.on('login', userInfo => {
    SocketIoController.login(userInfo, socket)
  })
  // 群聊
  socket.on('sendGroupMsg', async data => {
    io.sockets.emit('receiveGroupMsg', data)
  })

  // 私聊
  socket.on('sendPrivateMsg', data => {
    SocketIoController.privateMsg(data, socket)
  })
})

server.listen(port, () => {
  console.log(`监听${port}中`)
})
