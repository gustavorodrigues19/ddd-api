import Tenant from '../domain/entity/tenant.entity'
import TenantGateway from '../../authentication/gateway/tenant.gateway'
import { PrismaClient } from '@prisma/client'
import Id from '../domain/value-object/id.value-object'
import Plan from '../domain/entity/plan.entity'

export default class TenantsRepository implements TenantGateway {
  private _prismaOrm: PrismaClient

  constructor(prismaOrm: PrismaClient) {
    this._prismaOrm = prismaOrm
  }

  async findById(id: string): Promise<Tenant | null> {
    try {
      const result = await this._prismaOrm.tenants.findUnique({
        where: { id },
        include: { plan: true },
      })
      if (!result) return null

      return new Tenant({
        id: new Id(result.id),
        name: result.name,
        domain: result.domain,
        document: result.document,
        plan: new Plan({
          id: new Id(result.plan.id),
          name: result.plan.name,
          description: result.plan.description,
          price: result.plan.price,
          createdAt: result.plan.createdAt,
          updatedAt: result.plan.updatedAt,
        }),
        isActive: result.isActive,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      })
    } catch (error) {
      throw new Error('Error on find tenant.')
    }
  }
}
