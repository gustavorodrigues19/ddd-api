/* eslint-disable @typescript-eslint/dot-notation */
import { mockUserEntity } from '../../../../__mocks__/authentication.mock'
import DeleteUseCase from './delete-user.usecase'

const MockUserRepository = {
  delete: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(() => Promise.resolve(mockUserEntity)),
  findByEmailOrUsername: jest.fn(),
  find: jest.fn(),
  add: jest.fn(),
}

const MockUserRepositoryWithoutUser = {
  delete: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  findByEmailOrUsername: jest.fn(),
  find: jest.fn(),
  add: jest.fn(),
}

describe('Delete user useCase', () => {
  it('should delete a user', async () => {
    //@ts-expect-error - no params in constructor
    const deleteUseCase = new DeleteUseCase()
    deleteUseCase['_userRepository'] = MockUserRepository

    const result = await deleteUseCase.execute('1')

    expect(result.id).toBeDefined()
    expect(result.username).toEqual(mockUserEntity.username)
    expect(result.email).toEqual(mockUserEntity.email)
    expect(result.role).toEqual(mockUserEntity.role)
  })
  it('should not found a user', async () => {
    //@ts-expect-error - no params in constructor
    const deleteUseCase = new DeleteUseCase()
    deleteUseCase['_userRepository'] = MockUserRepositoryWithoutUser

    await deleteUseCase.execute('1').catch((e) => {
      expect(e.message).toBe('User not found')
    })
  })
})
