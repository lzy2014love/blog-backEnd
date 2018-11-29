import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'
import { readFileSync } from 'fs'
import { join } from 'path'

// 提供给 config.{env}.ts 使用
export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>

interface NewsConfig {
  pageSize: number
  serverUrl: string
}

// 应用本身的配置 Scheme
export interface BizConfig {
  sourceUrl: string
  news: NewsConfig
}

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig> & BizConfig

  // 数据库配置
  config.mysql = {
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'blog',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  }
  // alinode配置
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
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_blog-backEnd'
  // 模版引擎配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.tpl',
    mapping: {
      '.tpl': 'nunjucks',
    },
  }
  config.siteFile = {
    './favicon': readFileSync(join(appInfo.baseDir, 'app/public/favicon.png')),
  }
  // 全局中间件
  // config.middleware = ['errorHandler']

  // 以下是业务相关配置
  // app special config
  config.sourceUrl = `https://github.com/eggjs/examples/tree/master/${appInfo.name}`

  config.news = {
    pageSize: 30,
    serverUrl: 'https://hacker-news.firebaseio.com/v0/',
  }

  return config
}
