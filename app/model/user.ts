import { Application } from 'egg'

export default (app: Application) => {
  const { Sequelize, model } = app
  const { STRING, INTEGER } = Sequelize
  const user = model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true }, // 主键
    loginName: STRING(30),
    password: STRING(30),
  })
  return user
}
