import * as moment from 'moment'

moment.locale('zh-cn') // 使用中文
export function relativeTime(time: number): string {
  return moment(new Date(time * 1000)).fromNow()
}

export function domain(url: string): string {
  return url && url.split('/')[2]
}
