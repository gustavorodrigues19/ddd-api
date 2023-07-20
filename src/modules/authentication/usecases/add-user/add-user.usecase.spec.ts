import { validationErrorAddUserUseCase } from '../../../../__mocks__/modules/authentication/usecases/add-user-usecase.mock'
import AddUserUseCase from './add-user.usecase'
import { UserInputDto } from './add-user.usecase.dto'

const MockRepository = () => {
  return {
    add: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    find: jest.fn(),
  }
}

describe('Add user useCase', () => {
  it('should add a user', async () => {
    const repository = MockRepository()
    const addUseCase = new AddUserUseCase(repository)

    const input: UserInputDto = {
      name: 'User 1',
      email: 'x@x.com',
      password: '123456',
      document: '693.392.710-50',
      role: 'admin',
      franchisesIds: ['1', '2'],
      accessGroupId: '1',
      isActive: true,
      tenantId: '1',
    }

    const result = await addUseCase.execute(input)

    expect(repository.add).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
    expect(result.email).toEqual(input.email)
  })

  it('should return a validation error', async () => {
    const repository = MockRepository()
    const addUseCase = new AddUserUseCase(repository)

    const input: UserInputDto = {
      name: '',
      email: '',
      password: '',
      document: '',
      role: '',
      franchisesIds: ['1', '2'],
      accessGroupId: '1',
      isActive: true,
      tenantId: '1',
    }
    try {
      await addUseCase.execute(input)
    } catch (error: any) {
      expect(error?.error).toEqual(validationErrorAddUserUseCase)
    }
  })
})
