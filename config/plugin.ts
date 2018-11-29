import { EggPlugin } from 'egg'

const plugin: EggPlugin = {
  static: true,
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  passport: {
    enable: true,
    package: 'egg-passport',
  },
  passportLocal: {
    enable: true,
    package: 'egg-passport-local',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
}

export default plugin
