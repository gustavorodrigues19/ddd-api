import { mockPlan } from '../../../../api/__mocks__/system-adm.mock'
import AddTenantUseCase from './add-tenant.usecase'
import { AddTenantInputDto } from './add-tenant.usecase.dto'

const MockTenantRepository = () => ({
  add: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  find: jest.fn(),
})

const MockPlanRepository = () => ({
  findById: jest.fn((): any => mockPlan),
})

describe('Add tenant use case', () => {
  it('should add a tenant', async () => {
    const tenantRepository = MockTenantRepository()
    const planRepository = MockPlanRepository()
    const addUseCase = new AddTenantUseCase(tenantRepository, planRepository)

    const input: AddTenantInputDto = {
      name: 'Tesla Inc.',
      document: '21.159.326/0001-36',
      domain: 'www.test.com',
      planId: '1',
      isActive: true,
    }

    const result = await addUseCase.execute(input)

    expect(planRepository.findById).toHaveBeenCalled()
    expect(tenantRepository.add).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
  })

  it('should not add a tenant', async () => {
    const tenantRepository = MockTenantRepository()
    const planRepository = MockPlanRepository()
    planRepository.findById = jest.fn((): any => null)
    const addUseCase = new AddTenantUseCase(tenantRepository, planRepository)

    const input: AddTenantInputDto = {
      name: 'Tesla Inc.',
      document: '21.159.326/0001-36',
      domain: 'www.test.com',
      planId: '1',
      isActive: true,
    }

    try {
      await addUseCase.execute(input)
    } catch (error: any) {
      expect(error.message).toEqual('Plan not found')
      expect(planRepository.findById).toHaveBeenCalled()
      expect(tenantRepository.add).not.toHaveBeenCalled()
    }
  })
})
