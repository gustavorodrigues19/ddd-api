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
    expect(result.total).toBe(1)
    expect(result.data[0].username).toEqual(mockUserEntity.username)
    expect(result.data[0].email).toEqual(mockUserEntity.email)
    expect(result.data[0].isActive).toEqual(mockUserEntity.isActive)
    expect(result.data[0].tenant.id.id).toEqual(mockUserEntity.tenant.id)
    expect(result.data[0].tenant.name).toEqual(mockUserEntity.tenant.name)
  })

  it('should find users by email or username', async () => {
    const prismaClient = new PrismaClient()
    const repository = new UsersRepository(prismaClient)

    const result = await repository.findByEmailOrUsername('email', 'username')

    expect(prismaClient.users.findMany).toHaveBeenCalled()
    expect(result[0].username).toEqual(mockUserEntity.username)
    expect(result[0].email).toEqual(mockUserEntity.email)
    expect(result[0].isActive).toEqual(mockUserEntity.isActive)
    expect(result[0].tenant.id.id).toEqual(mockUserEntity.tenant.id)
    expect(result[0].tenant.name).toEqual(mockUserEntity.tenant.name)
  })

  it('should find a user by id', async () => {
    const prismaClient = new PrismaClient()
    const repository = new UsersRepository(prismaClient)

    const result = await repository.findById('1')

    expect(prismaClient.users.findUnique).toHaveBeenCalled()
    expect(result?.username).toEqual(mockUserEntity.username)
    expect(result?.email).toEqual(mockUserEntity.email)
    expect(result?.isActive).toEqual(mockUserEntity.isActive)
    expect(result?.tenant.id.id).toEqual(mockUserEntity.tenant.id)
    expect(result?.tenant.name).toEqual(mockUserEntity.tenant.name)
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
