/* eslint-disable @typescript-eslint/dot-notation */
import AddUserUseCase from './add-user.usecase'
import { mockTenant } from '../../../../__mocks__/system-adm.mock'
import { UserInputDto } from './add-user.usecase.dto'
import AccessGroupGateway from '../../gateway/access-group.gateway'
import TenantGatewayShared from '../../../@shared/gateway/tenant-shared.gateway'

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

const MockTenantRepository = {
  findById: jest.fn(() => Promise.resolve(mockTenant)),
}

const input: UserInputDto = {
  email: 'x@x.com',
  password: '123456',
  username: '693.392.710-50',
  accessGroupId: '1',
  role: 'MASTER_ADMIN',
  isActive: true,
  tenantId: '1',
}

describe('Add user useCase', () => {
  it('should add a user', async () => {
    //@ts-expect-error - no params in constructor
    const addUseCase = new AddUserUseCase()
    addUseCase['_userRepository'] = MockUserRepository
    addUseCase['_accessGroupRepository'] =
      MockAccessGroupRepository as unknown as AccessGroupGateway
    addUseCase['_tenantRepository'] = MockTenantRepository as unknown as TenantGatewayShared

    const result = await addUseCase.execute(input)

    expect(result.id).toBeDefined()
    expect(result.username).toEqual(input.username)
    expect(result.email).toEqual(input.email)
    expect(result.role).toEqual(input.role)
  })

  it('should throw an error of an user with invalid role', async () => {
    //@ts-expect-error - no params in constructor
    const addUseCase = new AddUserUseCase()
    addUseCase['_userRepository'] = MockUserRepository
    addUseCase['_accessGroupRepository'] =
      MockAccessGroupRepository as unknown as AccessGroupGateway
    addUseCase['_tenantRepository'] = MockTenantRepository as unknown as TenantGatewayShared

    addUseCase
      .execute({
        ...input,
        role: 'INVALID_ROLE' as any,
      })
      .catch((error) => {
        expect(error.message).toEqual('Invalid role')
      })
  })
})
