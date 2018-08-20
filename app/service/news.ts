import { Service } from 'egg'
import { RequestOptions } from 'urllib'

export interface NewItem {
  id: number
  score: number
  time: number
  title: string
  type: string
  url: string
  descendants: number
  kids: number[]
  bu: string
}

export default class NewsService extends Service {
  /**
   * request hacker-news api
   * @param api Api name
   * @param opts urllib options
   */
  public async request(api: string, opts?: RequestOptions) {
    const options = Object.assign(
      {
        dataType: 'json',
        timeout: ['30s', '30s'],
      },
      opts,
    )
    const { ctx, config } = this
    const result = await ctx.curl(`${config.news.serverUrl}${api}`, options)
    return result.data
  }

  /**
   * get top stroy ids
   * @param page - page number , 1-ase
   * @param pageSize - page count
   */
  public async getTopStories(page = 1, pageSize: number): Promise<number[]> {
    try {
      const result = await this.request('topstories.json', {
        data: {
          orderBy: `"$key"`,
          startAt: `"${pageSize * (page - 1)}"`,
          endAt: `"${pageSize * page - 1}"`,
        },
      })
      this.ctx.logger.debug(1111, result)
      return Object.keys(result).map((key) => result[key])
    } catch (e) {
      this.ctx.logger.error(2222, e)
      return []
    }
  }

  /**
   * query item
   * @param id - itemId
   */
  public async getItem(id: number): Promise<NewItem> {
    return await this.request(`item/${id}.json`)
  }

  /**
   * get user info
   * @param id - userId
   */
  public async getUser(id: number): Promise<object> {
    return await this.request(`user/${id}.json`)
  }
}
