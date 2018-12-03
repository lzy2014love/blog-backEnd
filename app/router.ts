import { Application } from 'egg'

export default (app: Application) => {
  const { router, controller } = app
  // '/api' 命名空间路由管理
  const apiRouter = router.namespace('/api')
  // 接口路由
  apiRouter.get('/token', controller.auth.getToken)

  // 用户模块
  apiRouter.resources('user', '/user', controller.user)

  // apiRouter.all(async function(ctx) {

  // })
}
