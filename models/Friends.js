const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FriendsSchema = new Schema({
  userid: {
    type: String
  },
  friends: {
    type: Array
  }
})

module.exports = Friends = mongoose.model('friends', FriendsSchema)
