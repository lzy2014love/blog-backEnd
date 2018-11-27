interface ApiResponse {
  code: number
  msg: string
  data: object
}

export default function createResponse(data: object, code = 0, msg = 'ok') {
  return {
    code,
    msg,
    data,
  } as ApiResponse
}
