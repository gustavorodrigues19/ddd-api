import AccessGroup from '../domain/access-group.entity'

export default class AccessGroupMapper {
  static toDomain(user: any): AccessGroup {
    return new AccessGroup({
      id: user.id,
      name: user.name,
      description: user.description,
      permissions: user.permissions,
      tenant: user.tenant,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  }
}
