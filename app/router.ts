import { Application } from 'egg'

export default (app: Application) => {
  const { router, controller, middleware, config, passport } = app
  const jwt = passport.authenticate('jwt', { session: false, successReturnToOrRedirect: null })
  // '/api' 命名空间路由管理
  const apiRouter = router.namespace('/api')
  // const loginRequired = middleware.loginRequired()
  const pagination = middleware.pagination(config.pagination)
  // 接口路由

  // 登录，登出模块
  apiRouter.get('/token', jwt, controller.token.show)
  apiRouter.del('/token', jwt, controller.token.destroy)

  // 用户模块
  /**
   * 获取所有用户信息
   */
  apiRouter.get('/user', pagination, controller.user.index)
  /**
   * 新建、注册用户
   */
  apiRouter.post('/user', controller.user.create)
  /**
   * 获取某id用户信息
   */
  apiRouter.get('/user/:userId', pagination, controller.user.show)
  /**
   * 根据id删除用户
   */
  apiRouter.del('/user/:userId', controller.user.destroy)
  /**
   * 根据id修改用户信息
   */
  apiRouter.put('/user/:userId', controller.user.update)
  /**
   * 接口404
   */
  // router.all('*', ctx => {
  //   ctx.sendError({msg: '', code: 404})
  // })
}
