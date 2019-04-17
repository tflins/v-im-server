const Router = require('koa-router')
const router = new Router()
const passport = require('koa-passport')
const NewFriendNotification = require('../../models/NewFriendNotification')

/**
 * @router POST /api/friends/add
 * @desc 添加好友请求
 * @access 接口是私密的
 */
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  async ctx => {
    // 将添加好友请求存入数据库中
    const findResult = await NewFriendNotification.find({
      from_uid: ctx.state.user.id,
      to_uid: ctx.request.body.to_uid
    })
    if (findResult.length) {
      // 若已经存在
      ctx.body = {
        success: false,
        msg: '已经向该用户发生好友请求'
      }
    } else {
      // 构造一个新结构体
      const newNewFriendNotification = new NewFriendNotification({
        from_uid: ctx.state.user.id,
        to_uid: ctx.request.body.to_uid,
        message: ctx.request.body.message
      })
      // 持久化
      await newNewFriendNotification
        .save()
        .then(newNewFriendNotification => {
          ctx.body = {
            success: true,
            data: newNewFriendNotification,
            msg: '发生好友请求成功,静待答复'
          }
        })
        .catch(err => {
          throw err
        })
    }
  }
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
