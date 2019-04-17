const NewFriendNotification = require('../models/NewFriendNotification')

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
          msg: '已经向该用户发生好友请求'
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
  }

module.exports = FriendsController
