const mongoose = require('mongoose')
const User = require('../models/User')

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
        password: userInfo.password
      })
      // 保持
      await newUser.save().then(user => {
        ctx.status = 200
        ctx.body = user
      }).catch(err => {
        throw err
      })
    }
    console.log(findResult)
  }
}

module.exports = new UserController()
