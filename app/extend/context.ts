import { Context, ErrorBody, PlainObject } from 'egg'

export default {
  /**
   * 接口成功返回数据的便捷函数
   * @param this ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
   * @param body 返回的数据
   * @param status 返回的状态码，默认200
   */
  send(this: Context, body: PlainObject, status = 200) {
    this.body = body
    this.status = status
  },
  /**
   * 接口失败返回数据的便捷函数
   * @param this ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
   * @param msg 返回的错误描述
   * @param code 返回的错误码, `$_`开头代表项目自定义错误
   * @param status 返回的状态码，默认500
   * @param detail 依赖库提供的详细错误描述
   */
  sendError(this: Context, msg: string, code: string, status = 500, detail?: PlainObject[]) {
    const body: ErrorBody = { msg, code, detail }
    this.body = body
    this.status = status
  },
}
