const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PrivateChatMsgSchema = new Schema({
  from_uid: {
    type: String
  },
  to_uid: {
    type: String
  },
  message: {
    type: String
  }
})

module.exports = PrivateChatMsg = mongoose.model(
  'privateChatMsg',
  PrivateChatMsgSchema
)
