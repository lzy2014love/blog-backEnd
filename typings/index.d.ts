import { IncomingHttpHeaders } from 'http';

declare module 'egg' {
  // export interface curlResponse {
  //   status: number;
  //   headers: object;
  //   data: object | string;
  // }
  // export interface Context{
  //   curl(url: string, opt?: RequestOptions): Promise<curlResponse>;
  // }

  interface mysql {
    get(tableName: string, find: {}): Promise<any>
    query(sql: string, values?: any[]): Promise<any>
  }
  interface Application {
    mysql: mysql;
  }
}

