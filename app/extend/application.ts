import * as bcrypt from 'bcryptjs'
import { Application, PlainObject } from 'egg'
import * as moment from 'moment'

moment.locale('zh-cn') // 使用中文

export default {
  /**
   * 获取目标表符合查询条件的总行数
   * @param this app 对象，在其中可以调用 app 上的其他方法，或访问属性
   * @param tableName 表名
   * @param options 查询条件
   */
  async getCount(
    this: Application,
    tableName: string,
    options?: PlainObject,
  ): Promise<number> {
    const result = await this.mysql.count(tableName, options)
    return result
  },
  /**
   * 获取11位随机字符串
   */
  getRandomString(): string {
    return Math.random()
      .toString(36)
      .substr(2)
  },
  /**
   * 加密
   * @param str 需要加密的字符串
   */
  async createHash(str: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(str, salt)
  },

  /**
   * 比较哈希字符串
   * @param str 需要对比的字符串
   * @param hash 被加密后的字符串
   */
  async compareHash(str: string, hash: string): Promise<boolean> {
    return bcrypt.compare(str, hash)
  },
/**
 * 获取相对现在的时间描述
 * @param time 秒数
 */
  relativeTime(time: number): string {
    return moment(new Date(time * 1000)).fromNow()
  },
  /**
   * 获取域名
   * @param url 网址
   */
  domain(url: string): string {
    return url && url.split('/')[2]
  },
}
