import { ROLES } from '../modules/@shared/interfaces'
import Id from '../modules/@shared/domain/value-object/id.value-object'
import AccessGroup from '../modules/authentication/domain/access-group.entity'
import User from '../modules/authentication/domain/user.entity'
import { mockTenantEntity } from './system-adm.mock'
import { mockFranchiseEntity, mockFranchiseEntity2 } from './business-admin.mock'

export const mockAccessGroupEntity = new AccessGroup({
  id: new Id('1'),
  name: 'Access group name',
  description: 'Access group description',
  permissions: 'tenants:view,edit',
  createdAt: new Date('2023-07-22T21:31:31.000Z'),
  updatedAt: new Date('2023-07-22T21:31:31.000Z'),
  tenant: mockTenantEntity,
})

export const mockUserEntity = new User({
  id: new Id('1'),
  username: '99999999999',
  email: 'user@example.com',
  password: '$2b$10$eYaS1RW.FJC6ZCFoia33Q.PP5K.YxATpnQriiikKorFuAWLGzpfAK', // 123456
  role: ROLES.MASTER_ADMIN,
  accessGroup: undefined,
  tenant: mockTenantEntity,
  isActive: true,
  createdAt: new Date('2023-07-22T21:31:31.000Z'),
  updatedAt: new Date('2023-07-22T21:31:31.000Z'),
})

export const mockUserOrganizationEntity = new User({
  id: new Id('2'),
  username: '99999999999',
  email: 'user@example.com',
  password: '$2b$10$eYaS1RW.FJC6ZCFoia33Q.PP5K.YxATpnQriiikKorFuAWLGzpfAK', // 123456
  role: ROLES.ORGANIZATION_ADMIN,
  accessGroup: undefined,
  tenant: mockTenantEntity,
  isActive: true,
  franchises: [mockFranchiseEntity, mockFranchiseEntity2],
  createdAt: new Date('2023-07-22T21:31:31.000Z'),
  updatedAt: new Date('2023-07-22T21:31:31.000Z'),
})

export const mockUserFranchiseEntity = new User({
  id: new Id('2'),
  username: '99999999999',
  email: 'user@example.com',
  password: '$2b$10$eYaS1RW.FJC6ZCFoia33Q.PP5K.YxATpnQriiikKorFuAWLGzpfAK', // 123456
  role: ROLES.FRANCHISE_ADMIN,
  accessGroup: undefined,
  tenant: mockTenantEntity,
  isActive: true,
  franchises: [mockFranchiseEntity],
  createdAt: new Date('2023-07-22T21:31:31.000Z'),
  updatedAt: new Date('2023-07-22T21:31:31.000Z'),
})
