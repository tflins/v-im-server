const bcrypt = require('bcryptjs')
const tools = {}

// 加密
tools.enbcrypt = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

module.exports = tools
