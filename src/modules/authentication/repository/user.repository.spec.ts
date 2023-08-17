import { PrismaClient } from '@prisma/client'
import UsersRepository from './user.repository'
import { mockUserEntity } from '../../../__mocks__/authentication.mock'

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    users: {
      create: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(() => [mockUserEntity]),
      count: jest.fn(() => 1),
      findUnique: jest.fn(() => mockUserEntity),
    },
  })),
}))
describe('Add user repository', () => {
  it('should add a user', async () => {
    const prismaClient = new PrismaClient()
    const repository = new UsersRepository(prismaClient)

    await repository.add(mockUserEntity)

    expect(prismaClient.users.create).toHaveBeenCalled()
  })

  it('should update a user', async () => {
    const prismaClient = new PrismaClient()
    const repository = new UsersRepository(prismaClient)

    await repository.update(mockUserEntity)

    expect(prismaClient.users.update).toHaveBeenCalled()
  })

  it('should find users', async () => {
    const prismaClient = new PrismaClient()
    const repository = new UsersRepository(prismaClient)

    const result = await repository.find(0, 100)

    expect(prismaClient.users.findMany).toHaveBeenCalled()
    expect(result).toEqual({ data: [mockUserEntity], total: 1 })
  })

  it('should find users by email or username', async () => {
    const prismaClient = new PrismaClient()
    const repository = new UsersRepository(prismaClient)

    const result = await repository.findByEmailOrUsername('email', 'username')

    expect(prismaClient.users.findMany).toHaveBeenCalled()
    expect(result).toEqual([mockUserEntity])
  })

  it('should find a user by id', async () => {
    const prismaClient = new PrismaClient()
    const repository = new UsersRepository(prismaClient)

    const result = await repository.findById('1')

    expect(prismaClient.users.findUnique).toHaveBeenCalled()
    expect(result).toEqual(mockUserEntity)
  })

  it('should not find a user by id', async () => {
    const prismaClient = new PrismaClient()
    const repository = new UsersRepository(prismaClient)
    prismaClient.users.findUnique = jest.fn((): any => null)

    const result = await repository.findById('1')

    expect(prismaClient.users.findUnique).toHaveBeenCalled()
    expect(result).toEqual(null)
  })
})
