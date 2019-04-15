const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupMessageSchema = new Schema({
  userid: {
    type: String
  },
  username: {
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

module.exports = GroupMessage = mongoose.model('groupMessage', GroupMessageSchema)
