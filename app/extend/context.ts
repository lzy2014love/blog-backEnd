import { Context } from 'egg'

interface ApiResponse {
  code: number
  msg: string
  data: object
}

// 可被json序列化的对象
type JSONObject = Record<string, string | number | boolean>

export default {
  /**
   *
   * @param data 返回的数据
   * @param code 状态码
   * @param msg 提示消息
   */
  createResponse(data: JSONObject, code = 0, msg = 'ok'): ApiResponse {
    return {
      code,
      msg,
      data,
    }
  },
  /**
   * 返回数据的便捷函数
   * @param body 返回的数据
   * @param status 返回的状态码，默认200
   */
  send(this: Context, body, status = 200) {
    // this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
    this.body = body
    this.status = status
  },
}
