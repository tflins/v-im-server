const User = require('../models/User')
const tools = require('../config/tools')

class UserController {
  // 注册
  static async register(ctx) {
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
      // 保存进数据库
      await newUser
        .save()
        .then(user => {
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
        })
        .catch(err => {
          ctx.status = 500
          throw err
        })
    }
  }
  // 登录
  static async login(ctx) {
    const userInfo = ctx.request.body
    // 查询登录邮箱是否存在
    const findResult = await User.find({ email: userInfo.email })
    // 若不存在
    if (!findResult.length) {
      ctx.status = 404
      ctx.body = {
        success: false,
        msg: '该用户未注册'
      }
    } else {
      const user = findResult[0]
      // 验证密码
      const result = await tools.debcrypt(userInfo.password, user.password)
      if (result) {
        ctx.body = {
          msg: '密码正确'
        }
      } else {
        ctx.body = {
          msg: '密码错误'
        }
      }
    }
  }
}

module.exports = UserController
