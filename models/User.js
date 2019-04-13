const mongoose = require('mongoose')
const Scheam = mongoose.Schema

// 实例化数据模板
const UserScheam = new Scheam({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('user', UserScheam)
