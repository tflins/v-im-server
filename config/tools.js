const bcrypt = require('bcryptjs')
const tools = {}

// 加密
tools.enbcrypt = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
// 验证密码
tools.debcrypt = (password, Ciphertext) => bcrypt.compareSync(password, Ciphertext)

module.exports = tools
