const body = {
  type: 'object',
  required: ['name', 'document', 'planId'],
  properties: {
    name: { type: 'string' },
    document: {
      type: 'string',
    },
    planId: { type: 'string' },
    isActive: { type: 'boolean', default: true },
  },
}

const tenantProperties = {
  id: { type: 'string' },
  name: { type: 'string' },
  document: { type: 'string' },
  domain: { type: 'string' },
  isActive: { type: 'boolean' },
  createdAt: { type: 'string' },
  updatedAt: { type: 'string' },
  plan: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      description: { type: 'string' },
      isActive: { type: 'boolean' },
      createdAt: { type: 'string' },
      price: { type: 'number' },
      updatedAt: { type: 'string' },
    },
  },
}

const errorResponse = {
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

export const CreateTenantSchema = {
  schema: {
    description: 'Update tenant schema',
    tags: ['Tenants'],
    body,
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: tenantProperties,
      },
      ...errorResponse,
    },
  },
}

export const UpdateTenantSchema = {
  schema: {
    description: 'Update tenant schema',
    tags: ['Tenants'],
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' },
      },
    },
    body,
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: tenantProperties,
      },
      ...errorResponse,
    },
  },
}

export const GetTenantsSchema = {
  schema: {
    description: 'Get tenants schema',
    tags: ['Tenants'],
    query: {
      type: 'object',
      required: ['skip'],
      properties: {
        skip: { type: 'number' },
      },
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          data: { type: 'array', items: { type: 'object', properties: tenantProperties } },
          total: { type: 'number' },
          skip: { type: 'number' },
          take: { type: 'number' },
        },
      },
      ...errorResponse,
    },
  },
}

export const GetTenantSchema = {
  schema: {
    description: 'Get tenant schema',
    tags: ['Tenants'],
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: tenantProperties,
      },
      ...errorResponse,
    },
  },
}
