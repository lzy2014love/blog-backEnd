import { PlainObject, Service } from 'egg'
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
   * 获取用户总数
   */
  public async getUserCount(): Promise<number> {
    // const result = await this.app.mysql.query(`select sql_calc_found_rows \`userId\`, \`name\` from \`user\` limit 0,1;
    // select found_rows() as total;`)
    // return result[0].total
    const result = await this.app.mysql.query(`select \`name\` from user;select \`userId\` from user;`)
    console.log('====================================')
    console.log(111, result)
    console.log('====================================')
    return result
  }
  /**
   * 获取用户列表
   */
  public async getUserList(pagination: Pagination): Promise<any> {
    const result = await this.app.mysql.select('user', {
      columns: [
        'userId',
        'name',
        'email',
        'userType',
        'create_time',
        'update_time',
        'avatar',
      ],
      limit: pagination.pageSize,
      offset: pagination.pageIndex,
    })
    return result
  }
  /**
   * 获取某id用户信息
   */
  public async getUserById(userId: number): Promise<any> {
    const result = await this.app.mysql.select('user', {
      columns: [
        'userId',
        'name',
        'email',
        'userType',
        'create_time',
        'update_time',
        'avatar',
      ],
      where: { userId },
    })
    return result
  }
  /**
   * 根据id删除用户
   */
  public async destroyUserById(userId: number): Promise<any> {
    const result = await this.app.mysql.delete('user', {
      userId,
    })
    return result
  }
  /**
   * 根据id修改用户信息
   */
  public async updateUserById(userId: number, row: PlainObject): Promise<any> {
    const result = await this.app.mysql.update('user', row, {
      where: { userId },
    })
    return result
  }
}
