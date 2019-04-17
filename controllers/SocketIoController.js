const User = require('../models/User')

class SocketIoController {
  // 登录 --- 持久化用户 socet.io
  static async login(userInfo, socket) {
    // 将 socket.io 存入数据库
    const upadteResult = await User.updateOne(
      { _id: userInfo.id },
      { socketid: socket.id }
    )
    if (upadteResult.ok && upadteResult.n) {
      console.log('持久化 socketid 成功')
    }
  }
}

module.exports = SocketIoController
