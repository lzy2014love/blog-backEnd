import * as bcrypt from 'bcryptjs'
import * as moment from 'moment'

moment.locale('zh-cn') // 使用中文

/**
 * 获取11位随机字符串
 */
export function getRandomString() {
  return Math.random().toString(36).substr(2)
}
/**
 * 加密
 * @param str 需要加密的字符串
 */
export function bhash(str: string) {
  return bcrypt.hashSync(str, 10)
}

/**
 * 比较哈希字符串
 * @param str 需要对比的字符串
 * @param hash 被加密后的字符串
 */
export function bcompare(str: string, hash: string) {
  return bcrypt.compareSync(str, hash)
}

export function relativeTime(time: number): string {
  return moment(new Date(time * 1000)).fromNow()
}

export function domain(url: string): string {
  return url && url.split('/')[2]
}
