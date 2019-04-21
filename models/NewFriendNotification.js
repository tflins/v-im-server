const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 实例化数据模板
const NewFriendNotificationSchema = new Schema({
  from_uid: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  to_uid: {
    type: String
  },
  message: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = NewFriendNotification = mongoose.model('newFriendNotification', NewFriendNotificationSchema)
