import { Application, Context } from 'egg'

const TOKEN = 'token'
export default (app: Application) => {
  /**
   * 校验用户
   */
  app.passport.verify(async (ctx: Context, user) => {
    ctx.logger.debug('passport.verify', user)
    console.log('====================================')
    console.log(11, user.provider, user.payload)
    console.log('====================================')
    const existsUser = await ctx.service.user.getUserById(user.userId)
    if (existsUser) {
      // id存入Cookie, 用于验证过期.
      const token = existsUser[0].userId + '$$$$' // 以后可能会存储更多信息，用 $$$$ 来分隔
      const opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        signed: true,
        httpOnly: true,
      }
      ctx.cookies.set(TOKEN, token, opts) // cookie 有效期30天
    }
    return existsUser
  })
  /**
   * 序列化用户信息后存储进 session
   */
  // app.passport.serializeUser(async (ctx: Context, user) => {})
  /**
   * 反序列化后取出用户信息
   */
  app.passport.deserializeUser(async (ctx: Context, user) => {
    if (user) {
      const token = ctx.cookies.get(TOKEN, {
        signed: true,
      })
      if (!token) {
        return user
      }
      const auth = token.split('$$$$')
      const userId = Number(auth[0])
      user = (await ctx.service.user.getUserById(userId))[0]
      if (!user) {
        return user
      }
    }
    return user
  })
  app.beforeStart(async () => {
    console.time('app启动用时')
    // 应用启动前准备
    // if (app.config.env === 'local' || app.config.env === 'unittest') {
    //   app.beforeStart(async () => {
    //     await app.model.sync({ force: true })
    //   })
    // }
  })
  app.on('server', () => {
    console.timeEnd('app启动用时')
  })
}
