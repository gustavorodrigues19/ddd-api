import UpdateTenantUseCase from './update-tenant.usecase'
import { mockPlanEntity, mockTenantEntity } from '../../../__mocks__/system-adm.mock'

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

describe('Update tenant use case', () => {
  it('should update a tenant', async () => {
    tenantRepository.findById.mockResolvedValue(mockTenantEntity)
    planRepository.findById.mockResolvedValue(mockPlanEntity)
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
    tenantRepository.findById.mockResolvedValue(mockTenantEntity)
    planRepository.findById.mockResolvedValue(undefined)

    const updateUseCase = new UpdateTenantUseCase(tenantRepository, planRepository)
    try {
      await updateUseCase.execute(updateInput)
    } catch (e: any) {
      expect(e.message).toEqual('Plan not found')
    }
  })
})
