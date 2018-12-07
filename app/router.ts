import { Application } from 'egg'

export default (app: Application) => {
  const { router, controller, middleware, config } = app
  // '/api' 命名空间路由管理
  const apiRouter = router.namespace('/api')
  const loginRequired = middleware.loginRequired()
  const pagination = middleware.pagination(config.pagination)
  // 接口路由
  apiRouter.get('/token', loginRequired, controller.auth.getToken)

  // 用户模块
  apiRouter.resources('user', '/user', pagination, controller.user)

}
