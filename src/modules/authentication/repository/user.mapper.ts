import Id from '../../@shared/domain/value-object/id.value-object'
import Plan from '../../@shared/domain/entity/plan.entity'
import Tenant from '../../@shared/domain/entity/tenant.entity'
import User from '../domain/user.entity'

export default class UserMapper {
  static toDomain(user: any): User {
    return new User({
      id: new Id(user.id),
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
      isActive: user.isActive,
      accessGroup: user.accessGroup,
      franchises: user.franchises,
      tenant: new Tenant({
        id: new Id(user.tenant.id),
        name: user.tenant.name,
        document: user.tenant.document,
        domain: user.tenant.domain,
        isActive: user.tenant.isActive,
        createdAt: user.tenant.createdAt,
        updatedAt: user.tenant.updatedAt,
        plan: new Plan({
          id: new Id(user.tenant.plan?.id),
          name: user.tenant.plan?.name,
          description: user.tenant?.plan?.description,
          price: user.tenant.plan?.price,
          createdAt: user.tenant.plan?.createdAt,
          updatedAt: user.tenant.plan?.updatedAt,
        }),
      }),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  }
}
