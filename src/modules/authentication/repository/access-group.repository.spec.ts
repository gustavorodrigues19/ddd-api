import { PrismaClient } from '@prisma/client'
import { mockAccessGroupEntity } from '../../../__mocks__/authentication.mock'
import AccessGroupsRepository from './access-group.repository'

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    accessGroups: {
      create: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(() => [mockAccessGroupEntity]),
      count: jest.fn(() => 1),
      findUnique: jest.fn(() => mockAccessGroupEntity),
    },
  })),
}))
describe('Add access group repository', () => {
  it('should add a access group', async () => {
    const prismaClient = new PrismaClient()
    const repository = new AccessGroupsRepository(prismaClient)

    await repository.add(mockAccessGroupEntity)

    expect(prismaClient.accessGroups.create).toHaveBeenCalled()
  })

  it('should update a access group', async () => {
    const prismaClient = new PrismaClient()
    const repository = new AccessGroupsRepository(prismaClient)

    await repository.update(mockAccessGroupEntity)

    expect(prismaClient.accessGroups.update).toHaveBeenCalled()
  })

  it('should find access groups', async () => {
    const prismaClient = new PrismaClient()
    const repository = new AccessGroupsRepository(prismaClient)

    const result = await repository.find(0, 100)

    expect(prismaClient.accessGroups.findMany).toHaveBeenCalled()
    expect(result).toEqual({ data: [mockAccessGroupEntity], total: 1 })
  })

  it('should find a access group by id', async () => {
    const prismaClient = new PrismaClient()
    const repository = new AccessGroupsRepository(prismaClient)

    const result = await repository.findById('1')

    expect(prismaClient.accessGroups.findUnique).toHaveBeenCalled()
    expect(result).toEqual(mockAccessGroupEntity)
  })

  it('should not find a access group by id', async () => {
    const prismaClient = new PrismaClient()
    const repository = new AccessGroupsRepository(prismaClient)
    prismaClient.accessGroups.findUnique = jest.fn((): any => null)

    const result = await repository.findById('1')

    expect(prismaClient.accessGroups.findUnique).toHaveBeenCalled()
    expect(result).toEqual(null)
  })
})
