import { Application } from 'egg'

export default (app: Application) => {
  const { router, controller } = app
  router.post('/auth', controller.auth.getToken)
  
  
}
