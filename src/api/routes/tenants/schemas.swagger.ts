export const PutTenantSchema = {
  schema: {
    description: 'Update tenant schema',
    tags: ['Tenants'],
    summary: 'qwerty',
    body: {
      type: 'object',
      properties: {
        hello: { type: 'string' },
        obj: {
          type: 'object',
          properties: {
            some: { type: 'string' },
          },
        },
      },
    },
  },
}
