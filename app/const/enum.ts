export const enum userType {
  /**
   * 管理员
   */
  ADMIN,
  /**
   * 一般用户
   */
  USER,
}

export const enum checkPasswordResult {
  /**
   * 用户找不到
   */
  USER_NOT_FOUND,
  /**
   * 密码不正确
   */
  CHECK_FAIL,
  /**
   * 密码正确
   */
  CHECK_SUCCESS,
}
