import { Application, Context } from 'egg'

export default (_option, app: Application) => {
  // 中间件的配置项，框架会将 app.config[${middlewareName}] 传递进来
  return async function(this: Application, ctx: Context, next) {
    try {
      await next()
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      console.log('====================================')
      console.log(12, this, this === app)
      console.log('====================================')
      const { createResponse } = this
      app.emit('error', err, this)
      const status: number = err.status || 500
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const msg = status === 500 && app.config.env === 'prod' ? 'Internal Server Error' : (err.message as string)
      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = createResponse()
      ctx.body.success = false
      if (status === 422) {
        ctx.body.detail = err.errors
      }
      ctx.status = status
    }
  }
}
