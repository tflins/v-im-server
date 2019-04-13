const User = require('../models/User')
const tools = require('../config/tools')

class UserController {
  async register(ctx) {
    const userInfo = ctx.request.body
    // 从数据库中查询 email 是否已存在
    const findResult = await User.find({ email: userInfo.email })
    // 若存在
    if (findResult.length) {
      ctx.status = 500
      ctx.body = {
        success: false,
        msg: '该邮箱已被注册'
      }
    } else {
      // 构造一个用户结构体
      const newUser = new User({
        email: userInfo.email,
        name: userInfo.name,
        password: tools.enbcrypt(userInfo.password)
      })
      // 保持
      await newUser.save().then(user => {
        ctx.status = 200
        ctx.body = {
          success: true,
          data: {
            email: user.email,
            name: user.name,
            date: user.date
          },
          msg: '注册成功'
        }
      }).catch(err => {
        ctx.status = 500
        throw err
      })
    }
  }
}

module.exports = new UserController()
