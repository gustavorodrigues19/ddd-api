import {
  MockInputInvalidActions,
  MockInputInvalidResources,
  MockInputInvalidResourcesName,
  MockInputInvalidValues,
  mockUserEntity,
} from '../../../../__mocks__/authentication.mock'
import { AddAccessGroupUseCase } from './add-access-group.usecase'

const MockAccessGroupRepository = {
  add: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  find: jest.fn(),
}

const MockUserRepository = {
  add: jest.fn(),
  update: jest.fn(),
  findById: jest.fn((): any => mockUserEntity),
  findByEmail: jest.fn(),
  find: jest.fn(),
}

describe('Add access group', () => {
  it('Should throw an error invalid resources - empty values', async () => {
    try {
      const addAccessGroupUseCase = new AddAccessGroupUseCase(
        MockAccessGroupRepository,
        MockUserRepository
      )
      await addAccessGroupUseCase.execute(MockInputInvalidResources)
    } catch (err: any) {
      expect(err?.message).toBe('Invalid resources')
    }
  })
  it('Should throw an error invalid resources - wrong resource name', async () => {
    try {
      const addAccessGroupUseCase = new AddAccessGroupUseCase(
        MockAccessGroupRepository,
        MockUserRepository
      )
      await addAccessGroupUseCase.execute(MockInputInvalidResourcesName)
    } catch (err: any) {
      expect(err?.message).toBe('Invalid resource unknown')
    }
  })
  it('Should throw an error invalid actions', async () => {
    try {
      const addAccessGroupUseCase = new AddAccessGroupUseCase(
        MockAccessGroupRepository,
        MockUserRepository
      )
      await addAccessGroupUseCase.execute(MockInputInvalidActions)
    } catch (err: any) {
      expect(err?.message).toBe('Invalid action')
    }
  })

  it('Should throw an error invalid value', async () => {
    try {
      const addAccessGroupUseCase = new AddAccessGroupUseCase(
        MockAccessGroupRepository,
        MockUserRepository
      )
      await addAccessGroupUseCase.execute(MockInputInvalidValues)
    } catch (err: any) {
      expect(err?.message).toBe('Invalid value')
    }
  })
})
