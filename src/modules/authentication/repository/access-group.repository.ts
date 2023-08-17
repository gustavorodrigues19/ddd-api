import { PrismaClient, Prisma } from '@prisma/client'
import AccessGroupGateway, { AccessGroupFindOutputDto } from '../gateway/access-group.gateway'
import AccessGroup from '../domain/access-group.entity'
import AccessGroupMapper from './access-group.mapper'

export default class AccessGroupsRepository implements AccessGroupGateway {
  private _prismaOrm: PrismaClient

  constructor(prismaOrm: PrismaClient) {
    this._prismaOrm = prismaOrm
  }

  async add(accessGroupInput: AccessGroup): Promise<void> {
    try {
      const accessGroup: Prisma.AccessGroupsCreateInput = {
        name: accessGroupInput.name,
        description: accessGroupInput.description,
        permissions: accessGroupInput.permissions,
        tenant: { connect: { id: accessGroupInput.tenant.id.id } },
      }
      await this._prismaOrm.accessGroups.create({ data: accessGroup })
    } catch (error) {
      throw new Error('Error on create access group.')
    }
  }

  async update(accessGroupInput: AccessGroup): Promise<void> {
    try {
      const accessGroup: Prisma.AccessGroupsCreateInput = {
        name: accessGroupInput.name,
        description: accessGroupInput.description,
        permissions: accessGroupInput.permissions,
        tenant: { connect: { id: accessGroupInput.tenant.id.id } },
      }
      await this._prismaOrm.accessGroups.update({
        where: { id: accessGroupInput.id.id },
        data: accessGroup,
        include: { tenant: true },
      })
    } catch (error) {
      throw new Error('Error on update access group')
    }
  }

  async findById(id: string): Promise<AccessGroup | null> {
    try {
      const result = await this._prismaOrm.accessGroups.findUnique({
        where: { id },
        include: { tenant: true },
      })
      if (!result) return null

      return AccessGroupMapper.toDomain(result)
    } catch (error) {
      throw new Error('Error on find access group.')
    }
  }

  async find(skip: number, take: number): Promise<AccessGroupFindOutputDto> {
    try {
      const results = await this._prismaOrm.accessGroups.findMany({
        include: { tenant: true },
        skip,
        take,
        orderBy: {
          name: 'asc',
        },
      })
      const total = await this._prismaOrm.accessGroups.count()
      const data = results.map(AccessGroupMapper.toDomain)
      return { data, total }
    } catch (error) {
      throw new Error('Error on find access group.')
    }
  }
}
