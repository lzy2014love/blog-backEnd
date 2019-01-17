import { Application, PlainObject } from 'egg'

export default {
  /**
   * 获取目标表符合查询条件的总行数
   * @param this app 对象，在其中可以调用 app 上的其他方法，或访问属性
   * @param tableName 表名
   * @param options 查询条件
   */
  async getCount(this: Application, tableName: string, options?: PlainObject): Promise<number> {
    const result = await this.mysql.count(tableName, options)
    return result
  },
}
