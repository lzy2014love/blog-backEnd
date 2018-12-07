export const userValidate = {
  name: 'string',
  password: 'string',
  isAdmin: [0, 1],
  avatar: 'url',
  email: { type: 'email', required: false, allowEmpty: false },
}
