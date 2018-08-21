import { Application } from 'egg'

export default (app: Application) => {
  app.beforeStart(async () => {
    // 应用启动前准备
    console.time('app启动用时')
  })

  app.on('server', () => {
    console.timeEnd('app启动用时')
  })
}
