class SocketIoConjtroller {
  // 登录
  static async login(userInfo, socket) {
    console.log('用户登录')
    console.log(socket.id)
    console.log(userInfo)
  }
}

module.exports = SocketIoConjtroller
