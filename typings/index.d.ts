import { IncomingHttpHeaders } from 'http'

interface Mysql {
  literals: any
  insert(tableName: string, options?: PlainObjet): Promise<PlainObjet>
  get(tableName: string, options?: PlainObjet): Promise<PlainObjet[]>
  select(tableName: string, options?: PlainObjet): Promise<PlainObjet[]>
  update(tableName: string, options?: PlainObjet): Promise<PlainObjet>
  update(
    tableName: string,
    row: PlainObject,
    options?: PlainObjet,
  ): Promise<PlainObjet>
  delete(tableName: string, options?: PlainObjet): Promise<PlainObjet>
  query(sql: string, values?: any): Promise<any>
  beginTansaction(): any
  beginTransactionScope(
    fn: (conn: any) => Promise<any>,
    ctx: Context,
  ): Promise<any>
}
declare module 'egg' {
  // export interface curlResponse {
  //   status: number;
  //   headers: object;
  //   data: object | string;
  // }
  // export interface Context{
  //   curl(url: string, opt?: RequestOptions): Promise<curlResponse>;
  // }

  export interface ErrorBody {
    msg: string
    code: string
    detail?: any[]
  }

  interface Application {
    mysql: Mysql
  }
}
