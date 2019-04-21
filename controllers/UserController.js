const User = require('../models/User')
const jwt = require('jsonwebtoken')
const tools = require('../config/tools')
const secretOrKey = require('../config/keys').secretOrKey

class UserController {
  // 注册
  static async register(ctx) {
    const userInfo = ctx.request.body
    // 从数据库中查询 email 是否已存在
    const findResult = await User.find({ email: userInfo.email })
    // 若存在
    if (findResult.length) {
      // ctx.status = 200
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
      // ctx.status = 404
      ctx.body = {
        success: false,
        msg: '该用户未注册'
      }
    } else {
      const user = findResult[0]
      // 验证密码
      const result = await tools.debcrypt(userInfo.password, user.password)
      if (result) {
        // 密码正确, 返回 token
        const payload = { id: user.id, name: user.name, email: user.email }
        const token = jwt.sign(payload, secretOrKey, { expiresIn: 60 * 60 })
        ctx.status = 200
        ctx.body = {
          success: true,
          data: {
            token: `Bearer ${token}`,
            userInfo: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          },
          msg: '登录成功'
        }
      } else {
        // ctx.status = 400
        ctx.body = {
          success: false,
          msg: '密码错误'
        }
      }
    }
  }

  // 根据昵称获取用户
  static async getName(ctx) {
    const findResult = await User.find({name: {$regex: ctx.query.name}})
    if (findResult.length) {
      ctx.body = {
        success: true,
        data: findResult,
        msg: '查询成功'
      }
    } else {
      ctx.body = {
        success: false,
        msg: '未找到该用户'
      }
    }
  }
}

module.exports = UserController
