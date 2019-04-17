const Router = require('koa-router')
const router = new Router()
const passport = require('koa-passport')
const FriendsCtrl = require('../../controllers/FriendsController')

/**
 * @router POST /api/friends/add
 * @desc 添加好友请求
 * @access 接口是私密的
 */
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  FriendsCtrl.addFriend
)

/**
 * @router GET /api/friends/getnewfriends
 * @desc 获取添加好友通知
 * @access 接口是私密的
 */
router.get(
  '/getnewfriends',
  passport.authenticate('jwt', { session: false }),
  async ctx => {}
)

module.exports = router.routes()
