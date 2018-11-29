import { Controller } from 'egg'

export default class AuthController extends Controller {
  public async getToken() {
    const { ctx, app } = this
    try {
      const user = await app.mysql.query('select * from db1 where id = 1')
      // throw new Error('sfsfsfsfas')
      console.log('====================================')
      console.log(user)
      console.log('====================================')
      ctx.body = user

    } catch (error) {
      console.log('====================================')
      console.log(error)
      console.log('====================================')
    }
  }

  /**
   * async user
   */
  public async user() {
    const { ctx } = this
    const id = ctx.params.id
    const userInfo = await ctx.service.news.getUser(id)
    await ctx.render('news/user', {
      user: userInfo,
    })
  }
}
