const Router = require('koa-router')
const router = new Router()
const passport = require('koa-passport')
const PrivateChatController = require('../../controllers/PrivateChatController')

/**
 * @router POST /api/privatechat/savemsg
 * @desc 保存私聊信息
 * @access 接口是私密的
 */
router.post(
  '/savemsg',
  passport.authenticate('jwt', { session: false }),
  PrivateChatController.savemsg
)

/**
 * @router POST /api/privatechat/savemsg
 * @desc 获取私聊信息
 * @access 接口是私密的
 */
router.get(
  '/getmsg',
  passport.authenticate('jwt', { session: false }),
  PrivateChatController.getMsg
)

module.exports = router.routes()
