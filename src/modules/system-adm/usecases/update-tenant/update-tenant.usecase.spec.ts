import Tenant from '../../domain/tenant.entity'
import UpdateTenantUseCase from './update-tenant.usecase'
import Id from '../../../@shared/domain/value-object/id.value-object'
import Plan from '../../domain/plan.entity'

const tenantRepository = {
  add: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  find: jest.fn(),
}

const planRepository = {
  findById: jest.fn(),
}

const updateInput = {
  id: '1',
  name: 'Tesla Inc.',
  document: '21.159.326/0001-36',
  domain: 'www.test.com',
  planId: '1',
  isActive: true,
}

const plan = new Plan({
  id: new Id('1'),
  name: 'basic',
  description: 'Basic plan',
  price: 100,
  createdAt: new Date(),
  updatedAt: new Date(),
})

const tenant = new Tenant({
  id: new Id('1'),
  name: 'Tesla Inc.',
  document: '21.159.326/0001-36',
  domain: 'www.test.com',
  plan,
  isActive: true,
})

describe('Update tenant use case', () => {
  it('should update a tenant', async () => {
    tenantRepository.findById.mockResolvedValue(tenant)
    planRepository.findById.mockResolvedValue(plan)
    const updateUseCase = new UpdateTenantUseCase(tenantRepository, planRepository)

    const result = await updateUseCase.execute(updateInput)

    expect(tenantRepository.update).toHaveBeenCalled()
    expect(result.id).toBeDefined()
  })

  it('should not find a tenant and throw an error', async () => {
    tenantRepository.findById.mockResolvedValue(undefined)
    planRepository.findById.mockResolvedValue(undefined)

    const updateUseCase = new UpdateTenantUseCase(tenantRepository, planRepository)
    try {
      await updateUseCase.execute(updateInput)
    } catch (e: any) {
      expect(e.message).toEqual('Tenant not found')
    }
  })

  it('should not find a plan and throw an error', async () => {
    tenantRepository.findById.mockResolvedValue(tenant)
    planRepository.findById.mockResolvedValue(undefined)

    const updateUseCase = new UpdateTenantUseCase(tenantRepository, planRepository)
    try {
      await updateUseCase.execute(updateInput)
    } catch (e: any) {
      expect(e.message).toEqual('Plan not found')
    }
  })
})
