import { Application } from 'egg'

export default (app: Application) => {
  const { router, controller } = app
  router.get('/', controller.auth.getToken)
  router.post('/auth', controller.auth.getToken)

}
