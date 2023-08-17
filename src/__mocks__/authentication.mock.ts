import { ROLES } from '../modules/@shared/interfaces'
import Id from '../modules/@shared/domain/value-object/id.value-object'
import AccessGroup from '../modules/authentication/domain/access-group.entity'
import User from '../modules/authentication/domain/user.entity'
import { AddAccessGroupUseCaseInputDTO } from '../modules/authentication/usecases/add-access-group/add-access-group.interface'
import { mockTenantEntity } from './system-adm.mock'

export const MockInputInvalidResources = {
  userId: '1',
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
  userId: '1',
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
  userId: '1',
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
  userId: '1',
  name: 'Access group name',
  description: 'Access group description',
  permissions: {
    system: {
      tenants: 'tenants:*:unknown',
    },
  },
  role: 'MASTER_ADMIN',
} as AddAccessGroupUseCaseInputDTO

export const mockAccessGroupEntity = new AccessGroup({
  id: new Id('1'),
  name: 'Access group name',
  description: 'Access group description',
  permissions: 'tenants:view,edit',
  createdAt: new Date('2023-07-22T21:31:31.000Z'),
  updatedAt: new Date('2023-07-22T21:31:31.000Z'),
})

export const mockUserEntity = new User({
  id: new Id('1'),
  username: '99999999999',
  email: 'user@example.com',
  password: '123456',
  role: ROLES.MASTER_ADMIN,
  accessGroup: mockAccessGroupEntity,
  tenant: mockTenantEntity,
  isActive: true,
  createdAt: new Date('2023-07-22T21:31:31.000Z'),
  updatedAt: new Date('2023-07-22T21:31:31.000Z'),
})
