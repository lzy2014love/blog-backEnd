import { Application } from 'egg'

export default (app: Application) => {
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
  // app.ready
}
