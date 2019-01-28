import { Controller } from 'egg'
import { checkPasswordResult } from '../const/enum'
import { PaginationData } from '../dto/common'
import { createUserRule, userIdRule } from '../validate/user'

export default class UserController extends Controller {
  /**
   * 用户列表
   */
  public async index() {
    const { ctx, app } = this
    const { pagination } = ctx
    const [total, userList] = await Promise.all([
      app.getCount('user'),
      ctx.service.user.getUserList(pagination),
    ])
    const { pageSize, pageIndex } = pagination
    const paginationData: PaginationData = {
      pageSize,
      pageIndex,
      total,
      list: userList,
    }
    ctx.send(paginationData)
  }
  /**
   * 新建用户
   */
  public async create() {
    const { ctx, app } = this
    const userData = ctx.request.body
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(createUserRule, userData)
    const now = app.mysql.literals.now
    userData.create_time = userData.update_time = now
    userData.password = await app.createHash(userData.password)
    const userId = await ctx.service.user.createUser(userData)
    ctx.send({ userId }, 201)
  }
  public async show() {
    const { ctx } = this
    // string 装换成 number
    const userId = Number(ctx.params.userId)
    ctx.validate(userIdRule, { userId })
    const userInfo = await ctx.service.user.getUserById(userId)
    if (userInfo) {
      ctx.send(userInfo)
      return
    }
    ctx.sendError('没有该用户', '$_row_not_found', 400)
  }
  public async destroy() {
    const { ctx } = this
    // string 装换成 number
    const userId = Number(ctx.params.userId)
    ctx.validate(userIdRule, { userId })
    const userInfo = await ctx.service.user.destroyUserById(userId)
    ctx.send(userInfo)
  }
  public async update() {
    const { ctx } = this
    // string 装换成 number
    const userId = Number(ctx.params.userId)
    ctx.validate(userIdRule, { userId })
    const newUserInfo = ctx.request.body
    ctx.validate(createUserRule, newUserInfo)
    const userInfo = await ctx.service.user.updateUserById(userId, newUserInfo)
    ctx.send(userInfo)
  }
  public async login() {
    const { ctx, app } = this
    const { name, password } = ctx.req.body
    const checkResult = await ctx.service.user.checkPassword(name, password)
    if (checkResult === checkPasswordResult.USER_NOT_FOUND) {
      ctx.sendError('找不到该用户', '$_user_not_found')
      return
    }
    if (checkResult === checkPasswordResult.CHECK_FAIL) {
      ctx.sendError('密码不正确', '$_password_check_fail')
      return
    }
    ctx.login(checkResult)
    const { userId, email, userType } = checkResult
    const token = app.jwt.sign(
      {
        userId,
        email,
        userType,
      },
      app.config.jwt.secret,
      {
        expiresIn: '30d',
      },
    )
    console.log('====================================')
    console.log(111, token, JSON.stringify(ctx.user))
    console.log('====================================')

    ctx.cookies.set('token', token, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 30, // cookie 有效期30天
      httpOnly: false,
      overwrite: true,
      signed: false,
    })
    ctx.send({
      token,
    })
  }

  /**
   * async user
   */
  public async logout() {
    const { ctx } = this
    console.log('====================================')
    console.log(ctx.isAuthenticated())
    console.log('====================================')
    ctx.logout()
    ctx.send({ msg: 'ok' })
  }
}
