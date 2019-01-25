declare module 'egg' {
  interface Mysql {
    literals: any
    insert(tableName: string, options?: PlainObject): Promise<PlainObject>
    get(tableName: string, options?: PlainObject): Promise<PlainObject[]>
    select(tableName: string, options?: PlainObject): Promise<PlainObject[]>
    update(tableName: string, options?: PlainObject): Promise<PlainObject>
    update(
      tableName: string,
      row: PlainObject,
      options?: PlainObject,
    ): Promise<PlainObject>
    delete(tableName: string, options?: PlainObject): Promise<PlainObject>
    query(sql: string, values?: any): Promise<any>
    count(tableName: string, options?: PlainObject): Promise<number>
    beginTansaction(): any
    beginTransactionScope(
      fn: (conn: any) => Promise<any>,
      ctx: Context,
    ): Promise<any>
  }

  interface Passport {
    verify: any
    authenticate: any
    serializeUser: any
    deserializeUser: any
  }

  interface Application {
    mysql: Mysql
    passport: Passport
  }

  /**
   * 简单对象（值都是基本类型）
   */
  export type SimpleObject = Record<string, string | number | boolean | symbol | null | undefined>

  /**
   * 接口错误返回的类型
   */
  export interface ErrorBody {
    msg: string
    code: string
    detail?: PlainObject[]
  }



}
