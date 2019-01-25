import { Controller } from 'egg'
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
    const { ctx } = this
    const userData = ctx.request.body
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(createUserRule, userData)
    const now = this.app.mysql.literals.now
    userData.create_time = now
    userData.update_time = now
    const userId = await ctx.service.user.createUser(userData)
    ctx.send({ userId }, 201)
  }
  public async show() {
    const { ctx } = this
    // string 装换成 number
    const userId = Number(ctx.params.userId)
    ctx.validate(userIdRule, { userId })
    const userInfo = await ctx.service.user.getUserById(userId)
    if (userInfo.length === 0) {
      ctx.sendError('没有该用户', '$_row_not_found', 400)
      return
    }
    ctx.send(userInfo[0])
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
}
