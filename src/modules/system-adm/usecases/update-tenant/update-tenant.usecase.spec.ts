import Tenant from '../../domain/tenant.entity'
import UpdateTenantUseCase from './update-tenant.usecase'
import Id from '../../../@shared/domain/value-object/id.value-object'

const MockRepository = () => {
  return {
    add: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    find: jest.fn(),
  }
}

describe('Update tenant use case', () => {
  it('should update a tenant', async () => {
    const repository = MockRepository()
    const input = {
      name: 'Tesla Inc.',
      document: '21.159.326/0001-36',
      domain: 'www.test.com',
      plan: 'basic',
      isActive: true,
    }

    const tenant = new Tenant({ id: new Id('1'), ...input })
    repository.findById.mockResolvedValue(tenant)
    const updateUseCase = new UpdateTenantUseCase(repository)

    const result = await updateUseCase.execute({ id: '1', ...input })

    expect(repository.update).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
  })

  it('should not find tenant and throw an error', async () => {
    const repository = MockRepository()
    const input = {
      id: '1',
      name: 'Tesla Inc.',
      document: '21.159.326/0001-36',
      domain: 'www.test.com',
      plan: 'basic',
      isActive: true,
    }

    repository.findById.mockResolvedValue(undefined)
    const updateUseCase = new UpdateTenantUseCase(repository)
    try {
      await updateUseCase.execute(input)
    } catch (e: any) {
      expect(e.message).toEqual('Tenant not found')
    }
  })
})
