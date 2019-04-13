const Router = require('koa-router')
const userCtrl = require('../../controllers/UserController')
const router = new Router()

/**
 * @router GET api/user/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get('/test', async ctx => {
  ctx.status = 200
  ctx.body = {msg: '接口正常'}
})

/**
 * @router GET api/user/register
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.post('/register', userCtrl.register)

module.exports = router.routes()
