import User from '../domain/user.entity'
import { PrismaClient, Prisma } from '@prisma/client'
import UserGateway, { UserFindOutputDto } from '../gateway/user.gateway'
import UserMapper from './user.mapper'

export default class UsersRepository implements UserGateway {
  private _prismaOrm: PrismaClient

  constructor(prismaOrm: PrismaClient) {
    this._prismaOrm = prismaOrm
  }

  async add(userInput: User): Promise<void> {
    try {
      const user: Prisma.UsersCreateInput = {
        username: userInput.username,
        email: userInput.email,
        password: userInput.password,
        role: userInput.role,
        isActive: userInput.isActive,
        ...(userInput?.accessGroup && {
          accessGroup: {
            connect: { id: userInput.accessGroup.id.id },
          },
        }),
        tenant: { connect: { id: userInput.tenant.id.id } },
      }
      await this._prismaOrm.users.create({ data: user })
    } catch (error) {
      throw new Error('Error on create user.')
    }
  }

  async update(userInput: User): Promise<void> {
    try {
      const user: Prisma.UsersUpdateInput = {
        username: userInput.username,
        email: userInput.email,
        password: userInput.password,
        role: userInput.role,
        isActive: userInput.isActive,
        ...(userInput?.accessGroup && {
          accessGroup: {
            connect: { id: userInput.accessGroup.id.id },
          },
        }),
        tenant: { connect: { id: userInput.tenant.id.id } },
      }
      await this._prismaOrm.users.update({
        where: { id: userInput.id.id },
        data: user,
        include: { tenant: true },
      })
    } catch (error) {
      throw new Error('Error on update user.')
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const result = await this._prismaOrm.users.findUnique({
        where: { id },
        include: { tenant: true } && { accessGroup: true },
      })
      if (!result) return null

      return UserMapper.toDomain(result)
    } catch (error) {
      throw new Error('Error on find user.')
    }
  }

  async findByEmailOrUsername(email?: string, username?: string): Promise<User[]> {
    try {
      const result = await this._prismaOrm.users.findMany({
        where: { OR: [{ email }, { username }] },
        include: { tenant: true } && { accessGroup: true },
      })

      return result.map(UserMapper.toDomain)
    } catch (error) {
      throw new Error('Error on find user.')
    }
  }

  async find(skip: number, take: number): Promise<UserFindOutputDto> {
    try {
      const results = await this._prismaOrm.users.findMany({
        include: { tenant: true } && { accessGroup: true },
        skip,
        take,
        orderBy: {
          email: 'asc',
        },
      })
      const total = await this._prismaOrm.users.count()
      const data = results.map(UserMapper.toDomain)
      return { data, total }
    } catch (error) {
      throw new Error('Error on find users.')
    }
  }
}
