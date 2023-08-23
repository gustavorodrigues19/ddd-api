export const errorResponse = {
  400: {
    description: 'Bad request',
    type: 'object',
    properties: {
      statusCode: { type: 'number' },
      error: { type: 'string' },
      message: { type: 'string' },
      validation: {
        type: 'object',
        properties: {
          source: { type: 'string' },
          keys: { type: 'array', items: { type: 'string' } },
        },
      },
    },
  },
  500: {
    description: 'Internal server error',
    type: 'object',
    properties: {
      error: { type: 'string' },
      message: { type: 'string' },
    },
  },
}
