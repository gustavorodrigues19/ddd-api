export const validationErrorAddUserUseCase = [
  {
    context: { key: 'name', label: 'name', value: '' },
    message: '"name" is not allowed to be empty',
    path: ['name'],
    type: 'string.empty',
  },
  {
    context: { key: 'email', label: 'email', value: '' },
    message: '"email" is not allowed to be empty',
    path: ['email'],
    type: 'string.empty',
  },
  {
    context: { key: 'password', label: 'password', value: '' },
    message: '"password" is not allowed to be empty',
    path: ['password'],
    type: 'string.empty',
  },
  {
    context: { key: 'document', label: 'document', value: '' },
    message: '"document" is not allowed to be empty',
    path: ['document'],
    type: 'string.empty',
  },
  {
    context: { key: 'role', label: 'role', value: '' },
    message: '"role" is not allowed to be empty',
    path: ['role'],
    type: 'string.empty',
  },
]
