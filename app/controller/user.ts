import { Controller } from 'egg'

export default class userController extends Controller {
  /**
   * 用户列表
   */
  public async index() {}
  /**
   * 新建用户
   */
  public async create() {
    const { ctx } = this
    const userData = ctx.query
    await ctx.model.user.create(userData)
    ctx.body = userData
  }
}
