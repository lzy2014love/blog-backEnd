import { checkPasswordResult, userType } from './enum'

export const userTypeMap = {
  [userType.ADMIN]: '管理员',
  [userType.USER]: '一般用户',
}

export const checkPasswordResultMap = {
  [checkPasswordResult.USER_NOT_FOUND]: '用户找不到',
  [checkPasswordResult.CHECK_FAIL]: '密码不正确',
  [checkPasswordResult.CHECK_SUCCESS]: '密码正确',
}
