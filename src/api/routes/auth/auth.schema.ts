import { errorResponse } from '../../infra/swagger/errors'

export const AuthSchema = {
  schema: {
    description: 'Update user schema',
    tags: ['Auth'],
    headers: {
      type: 'object',
      required: ['Content-Type'],
      properties: {
        'Content-Type': { type: 'string', pattern: '^application/x-www-form-urlencoded$' },
      },
    },
    body: {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          tokenType: { type: 'string' },
          accessToken: { type: 'string' },
          expiresIn: { type: 'number' },
        },
      },
      ...errorResponse,
    },
  },
}
