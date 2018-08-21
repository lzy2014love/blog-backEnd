import { EggPlugin } from 'egg'

const plugin: EggPlugin = {
  static: false,
  alinode: {
    enable: true,
    package: 'egg-alinode',
  },
}

export default plugin
