import { Application } from 'egg'

export default {
  // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
  return(this: Application) {
    console.log('====================================')
    console.log('test')
    console.log('====================================')
  },
}
