import User from '../domain/user.entity'

export default class UserMapper {
  static toDomain(user: any): User {
    return new User({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
      isActive: user.isActive,
      accessGroup: user.accessGroup,
      tenant: user.tenant,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  }
}
