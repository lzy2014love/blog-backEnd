import { IncomingHttpHeaders } from 'http';

interface mysql {
  insert(tableName: string, find?: PlainObject): Promise<any>
  get(tableName: string, find?: PlainObject): Promise<any>
  select(tableName: string, find?: PlainObject): Promise<any>
  update(tableName: string, find?: PlainObject): Promise<any>
  delete (tableName: string, find?: PlainObject): Promise<any>
  query(sql: string, values?: any[]): Promise<any>
  beginTransaction(): any
  beginTransactionScope(fn: (conn: any) => Promise<any>, ctx: Context): Promise<any>
  literals: any
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
    mysql: mysql;
  }
}

