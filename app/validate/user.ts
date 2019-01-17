export const userIdRule = {
  userId: { type: 'int', required: true, min: 1 },
}

export const updateUserRule = {
  password: 'string',
  userType: [0, 1],
  avatar: 'url',
  email: { type: 'email', required: false, allowEmpty: false },
}

type CreateUserRule = typeof updateUserRule | { name: string }
export const createUserRule: CreateUserRule = Object.create(updateUserRule, {
  name: { value: 'string' },
})
