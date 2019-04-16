const GroupMessage = require('../models/GroupMessage')

class GroupChatController {
  // 保存全体聊天信息
  static async saveGroupMessage(ctx) {
    const data = ctx.request.body
    // 构造一个新的结构体
    const newGroupMessage = new GroupMessage({
      userid: data.userid,
      username: data.username,
      message: data.message
    })

    // 保存
    await newGroupMessage
      .save()
      .then(groupMessage => {
        ctx.body = groupMessage
      })
      .catch(err => {
        throw err
      })
  }

  // 获取聊天信息
  static async getGroupMessage(ctx) {
    // 从数据库中将全体群聊天信息查询出来
    const findResult = await GroupMessage.find({})
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

module.exports = GroupChatController
