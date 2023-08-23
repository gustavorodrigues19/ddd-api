import { errorResponse } from '../../infra/swagger/errors'

const body = {
  type: 'object',
  required: ['username', 'email', 'role', 'password'],
  properties: {
    username: { type: 'string' },
    email: {
      type: 'string',
    },
    role: {
      type: 'string',
      pattern: '^MASTER_ADMIN|ORGANIZATION_ADMIN|FRANCHISE_ADMIN|CUSTOM_ADMIN$',
    },
    password: { type: 'string' },
    accessGroupId: { type: 'string' },
    tenantId: { type: 'string' },
    isActive: { type: 'boolean', default: true },
  },
}

const userProperties = {
  id: { type: 'string' },
  username: { type: 'string' },
  email: { type: 'string' },
  role: { type: 'string' },
  isActive: { type: 'boolean' },
  createdAt: { type: 'string' },
  updatedAt: { type: 'string' },
  accessGroup: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
    },
  },
}

export const CreateUserSchema = {
  schema: {
    description: 'Update user schema',
    tags: ['Users'],
    body,
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: userProperties,
      },
      ...errorResponse,
    },
  },
}

export const UpdateUserSchema = {
  schema: {
    description: 'Update user schema',
    tags: ['Users'],
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
        properties: userProperties,
      },
      ...errorResponse,
    },
  },
}

export const GetUsersSchema = {
  schema: {
    description: 'Get users schema',
    tags: ['Users'],
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
          data: { type: 'array', items: { type: 'object', properties: userProperties } },
          total: { type: 'number' },
          skip: { type: 'number' },
          take: { type: 'number' },
        },
      },
      ...errorResponse,
    },
  },
}

export const GetUserSchema = {
  schema: {
    description: 'Get user schema',
    tags: ['Users'],
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: userProperties,
      },
      ...errorResponse,
    },
  },
}
