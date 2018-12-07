import { Service } from 'egg'

export default class UserService extends Service {
  /**
   * 新建用户
   * @param userDate 用户数据
   */
  public async createUser(userDate): Promise<number> {
    const result = await this.app.mysql.insert('user', userDate)
    return result.insertId
  }

  /**
   * 获取用户列表
   */
  public async getUserList(): Promise<any> {
    const result = await this.app.mysql.select('user', {
      columns: ['userId', 'name', 'email', 'isAdmin', 'create_time', 'update_time', 'avatar'],
    })
    return result
  }
}
