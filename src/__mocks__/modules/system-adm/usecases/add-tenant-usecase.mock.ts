export const validationErrorAddTenantUseCase = [
  {
    context: { key: 'name', label: 'name', value: '' },
    message: '"name" is not allowed to be empty',
    path: ['name'],
    type: 'string.empty',
  },
  {
    context: { key: 'domain', label: 'domain', value: '' },
    message: '"domain" is not allowed to be empty',
    path: ['domain'],
    type: 'string.empty',
  },
  {
    context: { key: 'document', label: 'document', value: '' },
    message: '"document" is not allowed to be empty',
    path: ['document'],
    type: 'string.empty',
  },
  {
    context: { key: 'plan', label: 'plan', value: '' },
    message: '"plan" is not allowed to be empty',
    path: ['plan'],
    type: 'string.empty',
  },
]
