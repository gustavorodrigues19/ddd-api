export const PutTenantSchema = {
  schema: {
    description: 'Update tenant schema',
    tags: ['Tenants'],
    summary: 'qwerty',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' },
      },
    },
    body: {
      type: 'object',
      required: ['name', 'document', 'planId'],
      properties: {
        name: { type: 'string' },
        document: { type: 'string' },
        planId: { type: 'string' },
        isActive: { type: 'boolean', default: true },
      },
    },
  },
}
