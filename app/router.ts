import { Application, Context } from 'egg'

export default (app: Application) => {
  const { router, controller, middleware, config, jwt } = app
  // '/api' 命名空间路由管理
  const apiRouter = router.namespace('/api')
  // const loginRequired = middleware.loginRequired()
  const pagination = middleware.pagination(config.pagination)

  // 用户模块
  // 登录，登出
  apiRouter.post('/login', controller.user.login)
  apiRouter.post('/logout', jwt, controller.user.logout)
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
  router.all('*', ((ctx: Context) => {
    ctx.sendError('接口找不到', '$_api_not_found', 404)
  }) as any)
}
