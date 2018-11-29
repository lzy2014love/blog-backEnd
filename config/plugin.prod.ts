import { EggPlugin } from 'egg'

const plugin: EggPlugin = {
  // 生产环境静态资源服务器关闭
  static: false,
  // 启用alinode
  alinode: {
    enable: true,
    package: 'egg-alinode',
  },
}

export default plugin
