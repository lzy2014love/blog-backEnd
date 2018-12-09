import { Context, EggAppConfig } from 'egg'

// Middleware 目前返回值必须都是 any，否则使用 route.get/all 等方法的时候因为 Koa 的 IRouteContext 和 Egg 自身的 Context 不兼容导致编译报错。
export default function pagination(config: EggAppConfig['pagination']): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    if (!ctx.pagination) {
      const { query } = ctx
      const { defaultPageSize, defaultPageIndex, maxPageSize } = config
      const { pageSize, pageIndex } = query
      // 装换成数字，取整
      // tslint:disable-next-line:no-bitwise
      let pageSizeInt = pageSize | 0
      // tslint:disable-next-line:no-bitwise
      let pageIndexInt = pageIndex | 0
      // 每页数量小于0或者大于最大限制，赋值为默认值
      if (pageSizeInt < 0 || pageSizeInt > maxPageSize) {
        pageSizeInt = defaultPageSize
      }
      // 分页从第0页开始，第几页必须大于等于0
      if (pageIndexInt < 0) {
        pageIndexInt = defaultPageIndex
      }
      // 分页标记
      ctx.pagination = {
        pageSize,
        pageIndex,
      }
    }
    await next()
  }
}
