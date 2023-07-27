import { PrismaClient } from '@prisma/client'
import PlanGateway from '../gateway/plan.gateway'
import Plan from '../domain/plan.entity'
import Id from '../../@shared/domain/value-object/id.value-object'

export default class PlansRepository implements PlanGateway {
  private _prismaOrm: PrismaClient

  constructor(prismaOrm: PrismaClient) {
    this._prismaOrm = prismaOrm
  }

  async findById(id: string): Promise<Plan | null> {
    const result = await this._prismaOrm.plans.findUnique({
      where: { id },
    })
    if (!result) return null

    return new Plan({
      id: new Id(result.id),
      name: result.name,
      description: result.description,
      price: result.price,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    })
  }
}
