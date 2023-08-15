import { PrismaClient } from '@prisma/client'
import Franchise from '../domain/entity/franchise.entity'
import FranchiseGatewayShared from '../gateway/franchise-shared.gateway'
import FranchiseMapper from './franchise-shared.mapper'

export default class FranchisesRepository implements FranchiseGatewayShared {
  private _prismaOrm: PrismaClient

  constructor(prismaOrm: PrismaClient) {
    this._prismaOrm = prismaOrm
  }

  async findById(id: string): Promise<Franchise | null> {
    try {
      const result = await this._prismaOrm.franchises.findUnique({
        where: { id },
        include: { tenant: true },
      })
      if (!result) return null

      return FranchiseMapper.toDomain(result)
    } catch (error) {
      throw new Error('Error on find franchise.')
    }
  }

  async findByTenantId(id: string): Promise<Franchise[]> {
    try {
      const result = await this._prismaOrm.franchises.findMany({
        where: { tenantId: id },
        include: { tenant: true },
      })
      if (!result) return []

      return result.map(FranchiseMapper.toDomain)
    } catch (error) {
      throw new Error('Error on find franchises.')
    }
  }
}
