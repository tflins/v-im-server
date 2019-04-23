const PrivateChatMsg = require('../models/PrivateChatMsg')

class PrivateChatController {
  // 保存私聊信息
  static async savemsg(ctx) {
    // console.log(ctx.request.body)
    // const findResult = await PrivateChatMsg.find({
    //   userid: ctx.request.body.from_uid
    // })
    // if (findResult.length) {
    //   // 更新
    //   const updateResult = await PrivateChatMsg.updateOne(
    //     {
    //       userid: ctx.request.body.from_uid,
    //       'message.uid': ctx.request.body.to_uid
    //     },
    //     {
    //       '$set': {
    //         'message': {
    //           uid: ctx.request.body.to_uid,
    //           msg: ctx.request.body.message
    //         }
    //       }
    //     }
    //   )
    // } else {
    //   // 创建
    //   const newPrivateChatMsg = new PrivateChatMsg({
    //     userid: ctx.request.body.from_uid,
    //     message: [
    //       {
    //         uid: ctx.request.body.to_uid,
    //         msg: ctx.request.body.message
    //       }
    //     ]
    //   })
    //   // 保存
    //   newPrivateChatMsg
    //     .save()
    //     .then(newPrivateChatMsg => {
    //       ctx.body = newPrivateChatMsg
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // }

    // 保存到数据库
    const data = ctx.request.body
    const newPrivateChatMsg = new PrivateChatMsg({
      from_uid: data.from_uid,
      to_uid: data.to_uid,
      message: data.message
    })
    await newPrivateChatMsg
      .save()
      .then(item => {
        ctx.status = 200
        ctx.body = {
          success: true,
          data: item
        }
      })
      .catch(err => {
        throw err
      })
  }

  // 获取私聊信息
  static async getMsg(ctx) {
    // 参数 我的 id, 他的 id
    // 条件: from_uid = 我的 id or from_uid = 他的 id
    const findResult = await PrivateChatMsg.find({
      '$or': [
        {
          'from_uid': ctx.query.from_uid,
          'to_uid': ctx.query.to_uid
        },
        {
          'from_uid': ctx.query.to_uid,
          'to_uid': ctx.query.from_uid
        }
      ]
    })
    if (findResult.length) {
      ctx.body = {
        success: true,
        data: findResult,
        msg: '存在聊天记录'
      }
    } else {
      ctx.body = {
        success: false,
        msg: '暂无聊天记录'
      }
    }
  }
}

module.exports = PrivateChatController
