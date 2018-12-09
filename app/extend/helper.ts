import bcrypt from 'bcryptjs'

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
