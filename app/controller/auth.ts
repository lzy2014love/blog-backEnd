import { Controller } from 'egg'

export default class AuthController extends Controller {
  public async getToken() {
    const { ctx, config } = this

    ctx.body = 
  }

  public async detail() {
    const { ctx } = this
    const id = ctx.params.id
    const newsInfo = await ctx.service.news.getItem(id)

    /**
     * get comment parallel
     */
    const commentList = await Promise.all(newsInfo.kids.map((_id) => ctx.service.news.getItem(_id)))
    await ctx.render('news/datail', {
      item: newsInfo,
      comments: commentList,
    })
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
