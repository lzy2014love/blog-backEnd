import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'
import { readFileSync } from 'fs'
import { join } from 'path'

// for config.{env}.ts
export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>

interface NewsConfig {
  pageSize: number
  serverUrl: string
}

// app special config scheme
export interface BizConfig {
  sourceUrl: string
  news: NewsConfig
}

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig> & BizConfig

  // app special config
  config.sourceUrl = `https://github.com/eggjs/examples/tree/master/${appInfo.name}`

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_blog-backEnd'
  config.view = {
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.tpl',
    mapping: {
      '.tpl': 'nunjucks',
    },
  }
  config.alinode = {
    server: 'agentserver.node.aliyun.com:8080',
    appid: '36681',
    secret: 'e2c22dd0a7807acbb794eab34e8ea66650d4ac49',
    logdir: '/home/lzy/egg_log',
    reconnectDelay: 10,
    heartbeatInterval: 60,
    reportInterval: 60,
    error_log: ['/home/lzy/egg_error_log'],
    packages: ['/home/lzy/blog-backEnd/package.json'],
  }
  config.news = {
    pageSize: 30,
    serverUrl: 'https://hacker-news.firebaseio.com/v0/',
  }
  config.siteFile = {
    './favicon': readFileSync(join(appInfo.baseDir, 'app/public/favicon.png')),
  }

  // add your config here
  config.middleware = []

  return config
}
