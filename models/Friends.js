const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FriendsSchema = new Schema({
  userid: {
    type: String
  },
  friendids: {
    type: Array
  }
})

module.exports = Friends = mongoose.model('friends', FriendsSchema)
