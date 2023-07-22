import Id from '../../@shared/domain/value-object/id.value-object'
import Plan from '../domain/plan.entity'
import Tenant from '../domain/tenant.entity'

export default class TenantMapper {
  static toDomain(input: any): Tenant {
    return new Tenant({
      id: new Id(input.id),
      name: input.name,
      domain: input.domain,
      document: input.document,
      plan: new Plan({
        id: new Id(input.plan.id),
        name: input.plan.name,
        description: input.plan.description,
        price: input.plan.price,
        createdAt: input.plan.createdAt,
        updatedAt: input.plan.updatedAt,
      }),
      isActive: input.isActive,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    })
  }
}
