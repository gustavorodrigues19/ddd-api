import Id from '../../@shared/domain/value-object/id.value-object'
import Tenant from '../domain/tenant.entity'

export default class TenantMapper {
  static toDomain(input: any): Tenant {
    return new Tenant({
      id: new Id(input.id),
      name: input.name,
      domain: input.domain,
      document: input.document,
      planId: input.planId,
      isActive: input.isActive,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    })
  }
}
