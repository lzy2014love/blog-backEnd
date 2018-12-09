import { userType } from './enum'

const { ADMIN, USER } = userType

export const userTypeMap = {
  [ADMIN]: '管理员',
  [USER]: '一般用户',
}
