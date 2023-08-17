import Id from '../modules/@shared/domain/value-object/id.value-object'
import Tenant from '../modules/@shared/domain/entity/tenant.entity'
import Plan from '../modules/@shared/domain/entity/plan.entity'

export const mockPlan = {
  id: '1',
  name: 'basic',
  description: 'Basic plan',
  price: 100,
  createdAt: '2023-07-22T21:31:31.000Z',
  updatedAt: '2023-07-22T21:31:31.000Z',
}

export const mockTenant = {
  id: '1',
  name: 'tenant',
  domain: 'tenant.com',
  document: '123456789',
  isActive: true,
  plan: mockPlan,
  createdAt: '2023-07-22T21:31:31.000Z',
  updatedAt: '2023-07-22T21:31:31.000Z',
}

export const mockPlanEntity = new Plan({
  id: new Id('1'),
  name: 'basic',
  description: 'Basic plan',
  price: 100,
  createdAt: new Date('2023-07-22T21:31:31.000Z'),
  updatedAt: new Date('2023-07-22T21:31:31.000Z'),
})

export const mockTenantEntity = new Tenant({
  id: new Id('1'),
  name: 'Tesla Inc.',
  document: '21.159.326/0001-36',
  domain: 'www.test.com',
  plan: mockPlanEntity,
  isActive: true,
  createdAt: new Date('2023-07-22T21:31:31.000Z'),
  updatedAt: new Date('2023-07-22T21:31:31.000Z'),
})
