import Id from '../@shared/domain/value-object/id.value-object'
import Plan from '../system-adm/domain/plan.entity'
import Tenant from '../system-adm/domain/tenant.entity'

export const mockPlanEntity = new Plan({
  id: new Id('1'),
  name: 'basic',
  description: 'Basic plan',
  price: 100,
  createdAt: new Date(),
  updatedAt: new Date(),
})

export const mockTenantEntity = new Tenant({
  id: new Id('1'),
  name: 'Tesla Inc.',
  document: '21.159.326/0001-36',
  domain: 'www.test.com',
  plan: mockPlanEntity,
  isActive: true,
})
