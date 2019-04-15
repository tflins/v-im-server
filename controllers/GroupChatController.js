const GroupMessage = require('../models/GroupMessage')

class GroupChatController {
  // 保存全体聊天信息
  static async saveGroupMessage(ctx) {
    const data = ctx.request.body

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
}

module.exports = GroupChatController
