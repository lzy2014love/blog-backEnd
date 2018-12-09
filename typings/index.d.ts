import { IncomingHttpHeaders } from 'http'

interface mysql {
  literals: any
  insert(tableName: string, options?: PlainObjet): Promise<any>
  get(tableName: string, options?: PlainObjet): Promise<any>
  select(tableName: string, options?: PlainObjet): Promise<any>
  update(tableName: string, options?: PlainObjet): Promise<any>
  update(
    tableName: string,
    row: PlainObject,
    options?: PlainObjet,
  ): Promise<any>
  delete(tableName: string, options?: PlainObjet): Promise<any>
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
    mysql: mysql
  }
}
