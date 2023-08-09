import { AddAccessGroupUseCaseInputDTO } from '../modules/authentication/usecases/add-access-group/add-access-group.interface'

export const MockInputInvalidResources = {
  name: 'Access group name',
  description: 'Access group description',
  permissions: {
    system: {
      tenants: '',
    },
  },
  role: 'MASTER_ADMIN',
} as AddAccessGroupUseCaseInputDTO

export const MockInputInvalidResourcesName = {
  name: 'Access group name',
  description: 'Access group description',
  permissions: {
    system: {
      tenants: 'unknown:*:*',
    },
  },
  role: 'MASTER_ADMIN',
} as AddAccessGroupUseCaseInputDTO

export const MockInputInvalidActions = {
  name: 'Access group name',
  description: 'Access group description',
  permissions: {
    system: {
      tenants: 'tenants:unknown:*',
    },
  },
  role: 'MASTER_ADMIN',
} as AddAccessGroupUseCaseInputDTO

export const MockInputInvalidValues = {
  name: 'Access group name',
  description: 'Access group description',
  permissions: {
    system: {
      tenants: 'tenants:*:unknown',
    },
  },
  role: 'MASTER_ADMIN',
} as AddAccessGroupUseCaseInputDTO
