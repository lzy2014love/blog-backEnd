import { Application } from 'egg'

export default (app: Application) => {
  const { query } = app.mysql
  const user = {
    create(userData) {
      return query('insert into user set ?', userData)
    },
    update(userData) {

    },
  }
  return user
}
