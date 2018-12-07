import { Application, Context, EggAppConfig, ErrorBody } from 'egg'

// Middleware 目前返回值必须都是 any，否则使用 route.get/all 等方法的时候因为 Koa 的 IRouteContext 和 Egg 自身的 Context 不兼容导致编译报错。
export default function errorHandler(_config: EggAppConfig['errorHandler'], app: Application): any {
  // 中间件的配置项，框架会将 app.config[${middlewareName}] 传递进来
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      await next()
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      app.emit('error', err, ctx)
      // 数据库错误
      if (err.errno) {
        let status = 500
        if (err.errno === 1062) {
          status = 400
        }
        const message = app.config.env === 'prod' ? 'Database Error' : err.message
        const body: ErrorBody = { msg: message, code: err.code }
        ctx.send(body, status)
      } else {
        // 通用错误
        // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
        const status = err.status || 500
        const message = status === 500 && app.config.env === 'prod' ? 'Internal Server Error' : err.message
        const body: ErrorBody = { msg: message, code: err.code }
        // 422 参数校验错误
        if (status === 422) {
          body.detail = err.errors
        }
        ctx.send(body, status)
      }
    }
  }
}
