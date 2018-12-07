import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'
import { readFileSync } from 'fs'
import { join } from 'path'

interface NewsConfig {
  pageSize: number
  serverUrl: string
}

interface Pagination {
  defaultPageSize: number
  defaultPageIndex: number
  maxPageSize: number
}

// 应用本身的配置 Scheme
export interface BizConfig {
  sourceUrl: string
  session_secret: string
  news: NewsConfig
  pagination: Pagination
}

// 提供给 config.{env}.ts 使用
export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>

export default (appInfo: EggAppInfo) => {
  // tslint:disable-next-line:no-object-literal-type-assertion
  const config = {} as PowerPartial<EggAppConfig> & BizConfig
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_blog-backEnd'
  config.security = {
    csrf: {
      // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
      useSession: true,
      // 忽略/api路径下所有请求
      ignore: '/api',
    },
  }
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
  config.middleware = ['errorHandler']

  // 以下是业务相关配置
  // app special config
  config.sourceUrl = `https://github.com/eggjs/examples/tree/master/${appInfo.name}`
  config.session_secret = 'blog-backEnd'
  config.news = {
    pageSize: 30,
    serverUrl: 'https://hacker-news.firebaseio.com/v0/',
  }
  config.pagination = {
    defaultPageIndex: 1,
    defaultPageSize: 10,
    maxPageSize: 50,
  }

  return config
}
