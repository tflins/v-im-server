const Router = require('koa-router')
const router = new Router()
const passport = require('koa-passport')
const GroupChatCtrl = require('../../controllers/GroupChatController')

/**
 * @router GET /api/user/test
 * @desc 保存全体聊天信息
 * @access 接口是私密的
 */
router.post(
  '/saveGroupMessage',
  passport.authenticate('jwt', { session: false }),
  GroupChatCtrl.saveGroupMessage
)

module.exports = router.routes()
