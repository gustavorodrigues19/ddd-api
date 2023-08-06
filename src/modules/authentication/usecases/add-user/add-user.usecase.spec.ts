/* eslint-disable @typescript-eslint/dot-notation */
import AddUserUseCase from './add-user.usecase'
import { mockTenant } from '../../../../__mocks__/system-adm.mock'
import SystemAdminFacade from '../../../system-adm/facade/system-adm.facade'
import { UserInputDto } from './add-user.usecase.dto'
import AccessGroupGateway from '../../gateway/access-group.gateway'

const MockUserRepository = {
  add: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  findByEmail: jest.fn(),
  find: jest.fn(),
}
const MockAccessGroupRepository = {
  add: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(() =>
    Promise.resolve({
      id: '1',
      name: 'Access Group 1',
      description: 'Access Group 1',
      resources: 'tenants:*:*',
    })
  ),
  findByEmail: jest.fn(),
  find: jest.fn(),
}

const MockSystemAdminFacade = {
  findTenant: jest.fn(() => Promise.resolve(mockTenant)),
  addTenant: jest.fn(() => Promise.resolve(mockTenant)),
  updateTenant: jest.fn(() => Promise.resolve(mockTenant)),
  createTenant: jest.fn(() => Promise.resolve(mockTenant)),
}

describe('Add user useCase', () => {
  it('should add a user', async () => {
    //@ts-expect-error - no params in constructor
    const addUseCase = new AddUserUseCase()
    addUseCase['_userRepository'] = MockUserRepository
    addUseCase['_accessGroupRepository'] =
      MockAccessGroupRepository as unknown as AccessGroupGateway
    addUseCase['_systemAdminFacade'] = MockSystemAdminFacade as unknown as SystemAdminFacade

    const input: UserInputDto = {
      name: 'User 1',
      email: 'x@x.com',
      password: '123456',
      document: '693.392.710-50',
      accessGroupId: '1',
      isActive: true,
      tenantId: '1',
    }

    const result = await addUseCase.execute(input)

    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
    expect(result.email).toEqual(input.email)
    expect(result.document).toEqual(input.document)
  })
})
