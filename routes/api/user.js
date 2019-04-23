const Router = require('koa-router')
const userCtrl = require('../../controllers/UserController')
const router = new Router()
const passport = require('koa-passport')

/**
 * @router GET /api/user/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get('/test', async ctx => {
  ctx.status = 200
  ctx.body = {
    success: true,
    msg: '接口正常'
  }
})

/**
 * @router POST /api/user/register
 * @desc 用户注册接口地址
 * @access 接口是公开的
 */
router.post('/register', userCtrl.register)

/**
 * @router POST /api/user/register
 * @desc 用户登录接口地址
 * @access 接口是公开的
 */
router.post('/login', userCtrl.login)

/**
 * @router GET /api/user/getname
 * @desc 根据用户名获取用户信息
 * @access 接口是私密的
 */
router.get(
  '/getname',
  passport.authenticate('jwt', { session: false }),
  userCtrl.getName
)

/**
 * @router GET /api/user/getuserbyid
 * @desc 根据 id 获取用户信息
 * @access 接口是私密的
 */
router.get(
  '/getuserbyid',
  passport.authenticate('jwt', { session: false }),
  userCtrl.getUserById
)

module.exports = router.routes()
