import { Context } from 'egg'

// Middleware 目前返回值必须都是 any，否则使用 route.get/all 等方法的时候因为 Koa 的 IRouteContext 和 Egg 自身的 Context 不兼容导致编译报错。
export default function loginRequired(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    // 登录限制
    if (!ctx.user || ctx.user.userID) {
      ctx.sendError('未登录，请登录', '$_LOGIN_REQUIRED', 403)
      return
    }
    await next()
  }
}
