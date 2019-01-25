import { Controller } from 'egg'

export default class TokenController extends Controller {
  public async show() {
    const { ctx } = this
    ctx.login()
    console.log('====================================')
    console.log(111, ctx.user)
    console.log('====================================')
    const user = ctx.user
    ctx.send(user)
  }

  /**
   * async user
   */
  public async destroy() {
    const { ctx } = this
    ctx.logout()
    ctx.send({msg: 'ok'})
  }
}
