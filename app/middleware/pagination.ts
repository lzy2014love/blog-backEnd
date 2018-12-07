import { Context, EggAppConfig } from 'egg'

// Middleware 目前返回值必须都是 any，否则使用 route.get/all 等方法的时候因为 Koa 的 IRouteContext 和 Egg 自身的 Context 不兼容导致编译报错。
export default function pagination(config: EggAppConfig['pagination']): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    // 分页限制
    if (!ctx.pagination) {
      const { query } = ctx
      const { defaultPageSize, defaultPageIndex } = config
      const { pageSize, pageIndex } = query
      // 分页标记
      ctx.pagination = {
        // 装换成数字，取整
        pageSize: (pageSize | 0) || defaultPageSize,
        pageIndex: (pageIndex | 0) || defaultPageIndex,
      }
    }
    await next()
  }
}
