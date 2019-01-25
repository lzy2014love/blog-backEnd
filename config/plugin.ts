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
  passportJwt: {
    enable: true,
    package: 'egg-passport-jwt',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },
}

export default plugin
