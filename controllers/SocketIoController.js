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
      // console.log('持久化 socketid 成功')
    }
  }

  // 私聊
  static async privateMsg(data, socket) {
    // 根据 uid 从数据库中查出 socket.id
    // console.log(data)
  }
}

module.exports = SocketIoController
