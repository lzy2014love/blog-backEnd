import { Controller } from 'egg'

import { userValidate } from '../validate/user'

export default class UserController extends Controller {
  /**
   * 用户列表
   */
  public async index() {
    const { ctx } = this
    const userList = await ctx.service.user.getUserList()
    ctx.send(userList)
  }
  /**
   * 新建用户
   */
  public async create() {
    const { ctx } = this
    const userData = ctx.request.body
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(userValidate, userData)
    const now = this.app.mysql.literals.now
    userData.create_time = now
    userData.update_time = now
    const userId = await ctx.service.user.createUser(userData)
    ctx.send({ userId }, 201)
  }
}
