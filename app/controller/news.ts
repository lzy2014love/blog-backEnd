import { Controller } from 'egg'

export default class NewsController extends Controller {
  public async list() {
    const { ctx, config } = this
    const pageSize = config.news.pageSize
    const page = parseInt(ctx.query.page, 10) || 1
    const idList = await ctx.service.news.getTopStories(page, pageSize)

    /**
     * git itemInfo parallel
     */
    const newList = await Promise.all(idList.map((id) => ctx.service.news.getItem(id)))
    await ctx.render('news/list.tpl', {
      list: newList,
      page,
      pageSize,
    })
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
