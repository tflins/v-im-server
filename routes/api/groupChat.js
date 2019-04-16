const Router = require('koa-router')
const router = new Router()
const passport = require('koa-passport')
const GroupChatCtrl = require('../../controllers/GroupChatController')

/**
 * @router POST /api/user/savegroupmessage
 * @desc 保存全体聊天信息
 * @access 接口是私密的
 */
router.post(
  '/savegroupmessage',
  passport.authenticate('jwt', { session: false }),
  GroupChatCtrl.saveGroupMessage
)

/**
 * @router GET /api/user/savegroupmessage
 * @desc 获取全体聊天信息
 * @access 接口是私密的
 */
router.get(
  '/getgroupmessage',
  passport.authenticate('jwt', { session: false }),
  GroupChatCtrl.getGroupMessage
)

module.exports = router.routes()
