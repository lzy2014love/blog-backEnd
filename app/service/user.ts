import { PlainObject, Service } from 'egg'
import { checkPasswordResult } from '../const/enum'
import { Pagination } from '../dto/common'

export default class UserService extends Service {
  /**
   * 新建用户
   * @param userDate 用户数据
   */
  public async createUser(userDate: PlainObject): Promise<number> {
    const result = await this.app.mysql.insert('user', userDate)
    return result.insertId
  }
  /**
   * 获取用户列表
   * @param Pagination 分页对象
   */
  public async getUserList(pagination: Pagination) {
    const result = await this.app.mysql.select('user', {
      columns: ['userId', 'name', 'email', 'userType', 'create_time', 'update_time', 'avatar'],
      limit: pagination.pageSize,
      offset: pagination.pageIndex,
    })
    return result
  }
  /**
   * 根据`userId`获取用户信息
   * @param userId 用户id
   * @param returnPassword 是否返回`password`，默认不返回
   * @returns 用户信息,不存在则返回`null`
   */
  public async getUserById(userId: number, returnPassword = false) {
    const result = await this.getUser('userId', userId, returnPassword)
    return result
  }
  /**
   * 根据用户名称获取用户信息
   * @param name 用户名称
   * @param returnPassword 是否返回`password`，默认不返回
   * @returns 用户信息,不存在则返回`null`
   */
  public async getUserByname(name: string, returnPassword = false) {
    const result = await this.getUser('name', name, returnPassword)
    return result
  }
  /**
   * 根据id删除用户
   * @param userId 用户id
   */
  public async destroyUserById(userId: number) {
    const result = await this.app.mysql.delete('user', {
      userId,
    })
    return result
  }
  /**
   * 根据id修改用户信息
   * @param userId 用户id
   * @param row 个人用户信息
   */
  public async updateUserById(userId: number, row: PlainObject) {
    const result = await this.app.mysql.update('user', row, {
      where: { userId },
    })
    return result
  }
  /**
   * 校验用户密码
   * @param name 用户名
   * @param password 用户密码
   * @returns 校验成功返回用户信息， 否则返回 `checkPasswordResult`
   */
  public async checkPassword(name: string, password: string) {
    const user = await this.getUserByname(name, true)
    if (user) {
      const { compareHash } = this.app
      const checkResult = await compareHash(password, user.password)
      if (checkResult) {
        return user
      }
      return checkPasswordResult.CHECK_FAIL
    }
    return checkPasswordResult.USER_NOT_FOUND
  }
  /**
   * 根据传入字段获取用户信息
   * @param field 字段名
   * @param fieldValue 字段值
   * @param returnPassword 是否返回`password`，默认不返回
   */
  private async getUser(
    field: string,
    fieldValue: number | string,
    returnPassword: boolean,
  ): Promise<PlainObject<any> | null> {
    const columns = ['userId', 'name', 'email', 'userType', 'create_time', 'update_time', 'avatar']
    if (returnPassword) {
      columns.push('password')
    }
    const result = await this.app.mysql.select('user', {
      columns,
      where: {
        [field]: fieldValue,
      },
    })
    return result[0] || null
  }
}
