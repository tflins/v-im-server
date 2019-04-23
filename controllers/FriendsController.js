const NewFriendNotification = require('../models/NewFriendNotification')
const Friends = require('../models/Friends')

class FriendsController {
  static async addFriend(ctx) {
    // 将添加好友请求存入数据库中
    const findResult = await NewFriendNotification.find({
      from_uid: ctx.state.user.id,
      to_uid: ctx.request.body.to_uid
    })
    if (findResult.length) {
      // 若已经存在
      ctx.body = {
        success: false,
        msg: '已经向该用户发生好友请求,请勿重复发送'
      }
    } else {
      // 构造一个新结构体
      const newNewFriendNotification = new NewFriendNotification({
        from_uid: ctx.state.user.id,
        to_uid: ctx.request.body.to_uid,
        message: ctx.request.body.message
      })
      // 持久化
      await newNewFriendNotification
        .save()
        .then(newNewFriendNotification => {
          ctx.body = {
            success: true,
            data: newNewFriendNotification,
            msg: '发生好友请求成功,静待答复'
          }
        })
        .catch(err => {
          throw err
        })
    }
  }

  // 获取新好友信息
  static async getnewfriends(ctx) {
    // 从数据库中查出
    const findResult = await NewFriendNotification.find({
      to_uid: ctx.state.user._id
    }).populate('from_uid')
    if (findResult.length) {
      ctx.body = {
        success: true,
        data: findResult,
        msg: '查询成功'
      }
    } else {
      ctx.body = {
        success: false,
        msg: '查询失败'
      }
    }
  }

  // 添加好友
  static async addfriends(ctx) {
    // 查询数据库中是否存在该用户的用户信息
    const findResult1 = await Friends.find({ userid: ctx.state.user.id })
    const findResult2 = await Friends.find({ userid: ctx.request.body.userid })
    if (findResult1.length) {
      // 更新
      const upadteResult = await Friends.updateOne(
        { userid: ctx.state.user.id },
        {
          $addToSet: {
            friends: ctx.request.body
          }
        }
      )
      if (upadteResult.ok && upadteResult.n) {
        ctx.body = {
          success: true,
          msg: '已同意添加好友'
        }
        // 从好友信息中删除
        const removeResult = await NewFriendNotification.deleteOne({
          from_uid: ctx.request.body.userid,
          to_uid: ctx.state.user.id
        })
      }
    } else {
      // 创建
      const item1 = new Friends({
        userid: ctx.state.user.id,
        friends: [ctx.request.body]
      })
      await item1
        .save()
        .then(item => {
          ctx.body = {
            success: true,
            data: item,
            msg: '已同意添加好友'
          }
          // 从好友信息中删除
          NewFriendNotification.remove(
            {
              from_uid: ctx.state.user.id,
              to_uid: ctx.request.body.userid
            },
            err => {
              if (!err) console.log('删除成功')
            }
          )
        })
        .catch(err => {
          throw err
        })
    }
    if (findResult2.length) {
      // 更新
      const upadteResult = await Friends.updateOne(
        { userid: ctx.request.body.userid },
        {
          $addToSet: {
            friends: {
              userid: ctx.state.user.id,
              name: ctx.state.user.name
            }
          }
        }
      )
      if (upadteResult.ok && upadteResult.n) {
        ctx.body = {
          success: true,
          msg: '已同意添加好友'
        }
      }
    } else {
      // 创建
      const item1 = new Friends({
        userid: ctx.request.body.userid,
        friends: [
          {
            userid: ctx.state.user.id,
            name: ctx.state.user.name
          }
        ]
      })
      await item1
        .save()
        .then(item => {
          ctx.body = {
            success: true,
            data: item,
            msg: '已同意添加好友'
          }
        })
        .catch(err => {
          throw err
        })
    }
  }

  // 获取好友列表接口
  static async getfriendslist(ctx) {
    // 从数据库中查询
    const findResult = await Friends.find({ userid: ctx.state.user.id })
    if (findResult.length) {
      ctx.body = {
        success: true,
        data: findResult,
        msg: '查询成功'
      }
    } else {
      ctx.body = {
        success: false,
        msg: '暂无数据'
      }
    }
  }
}

module.exports = FriendsController
