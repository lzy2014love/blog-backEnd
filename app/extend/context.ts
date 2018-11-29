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
  createResponse(data: JSONObject, code = 0, msg = 'ok') {
    return {
      code,
      msg,
      data,
    } as ApiResponse
  },

}
