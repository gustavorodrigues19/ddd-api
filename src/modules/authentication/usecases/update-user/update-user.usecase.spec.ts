/* eslint-disable @typescript-eslint/dot-notation */
import { mockTenant } from '../../../../__mocks__/system-adm.mock'
import { UpdateUserInputDto } from './update-user.usecase.dto'
import AccessGroupGateway from '../../gateway/access-group.gateway'
import TenantGatewayShared from '../../../@shared/gateway/tenant-shared.gateway'
import UpdateUserUseCase from './update-user.usecase'
import { mockUserEntity } from '../../../../__mocks__/authentication.mock'

const MockUserRepository = {
  add: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(() => Promise.resolve(mockUserEntity)),
  findByEmailOrUsername: jest.fn(),
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

const input: UpdateUserInputDto = {
  id: '1',
  email: 'user@example.com',
  password: '123456',
  username: '99999999999',
  accessGroupId: '1',
  role: 'MASTER_ADMIN',
  isActive: true,
  tenantId: '1',
}

describe('Update user useCase', () => {
  it('should update a user', async () => {
    //@ts-expect-error - no params in constructor
    const updateUserUseCase = new UpdateUserUseCase()
    updateUserUseCase['_userRepository'] = MockUserRepository
    updateUserUseCase['_accessGroupRepository'] =
      MockAccessGroupRepository as unknown as AccessGroupGateway
    updateUserUseCase['_tenantRepository'] = MockTenantRepository as unknown as TenantGatewayShared

    const result = await updateUserUseCase.execute(input)

    expect(result.id).toBeDefined()
    expect(result.username).toEqual(input.username)
    expect(result.email).toEqual(input.email)
    expect(result.role).toEqual(input.role)
  })

  it('should throw an error of an user with invalid role', async () => {
    //@ts-expect-error - no params in constructor
    const updateUserUseCase = new UpdateUserUseCase()
    updateUserUseCase['_userRepository'] = MockUserRepository
    updateUserUseCase['_accessGroupRepository'] =
      MockAccessGroupRepository as unknown as AccessGroupGateway
    updateUserUseCase['_tenantRepository'] = MockTenantRepository as unknown as TenantGatewayShared

    updateUserUseCase
      .execute({
        ...input,
        role: 'INVALID_ROLE' as any,
      })
      .catch((error) => {
        expect(error.message).toEqual('Invalid role')
      })
  })
})
