import { validationErrorAddTenantUseCase } from '../../../../__mocks__/modules/system-adm/usecases/add-tenant-usecase.mock'
import AddTenantUseCase from './add-tenant.usecase'
import { AddTenantInputDto } from './add-tenant.usecase.dto'

const MockRepository = () => {
  return {
    add: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    find: jest.fn(),
  }
}

describe('Add tenant use case', () => {
  it('should add a tenant', async () => {
    const repository = MockRepository()
    const addUseCase = new AddTenantUseCase(repository)

    const input: AddTenantInputDto = {
      name: 'Tesla Inc.',
      document: '21.159.326/0001-36',
      domain: 'www.test.com',
      plan: 'basic',
      isActive: true,
    }

    const result = await addUseCase.execute(input)

    expect(repository.add).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
  })

  it('should return a validation error', async () => {
    const repository = MockRepository()
    const addUseCase = new AddTenantUseCase(repository)

    const input: AddTenantInputDto = {
      name: '',
      document: '',
      domain: '',
      plan: '',
      isActive: true,
    }
    try {
      await addUseCase.execute(input)
    } catch (error: any) {
      expect(error?.error).toEqual(validationErrorAddTenantUseCase)
    }
  })
})