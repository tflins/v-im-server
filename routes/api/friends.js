const Router = require('koa-router')
const router = new Router()
const passport = require('koa-passport')

/**
 * @router POST /api/friends/add
 * @desc 添加好友
 * @access 接口是私密的
 */
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  async ctx => {
    console.log(ctx.state)
  }
)

module.exports = router.routes()
