import Id from '../../@shared/domain/value-object/id.value-object'
import Tenant from '../../@shared/domain/entity/tenant.entity'
import Plan from '../../@shared/domain/entity/plan.entity'

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
