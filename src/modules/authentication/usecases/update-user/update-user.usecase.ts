import AccessGroupGateway from '../../gateway/access-group.gateway'
import bcrypt from 'bcrypt'
import Id from '../../../@shared/domain/value-object/id.value-object'
import User from '../../domain/user.entity'
import UserGateway from '../../gateway/user.gateway'
import { UpdateUserInputDto, UserOutputDto } from './update-user.usecase.dto'
import TenantGatewayShared from '../../../@shared/gateway/tenant-shared.gateway'
import authPermissions from '../../auth-perms.json'

export default class UpdateUserUseCase {
  private _userRepository: UserGateway
  private _accessGroupRepository: AccessGroupGateway
  private _tenantRepository: TenantGatewayShared

  constructor(
    userRepository: UserGateway,
    tenantRepository: TenantGatewayShared,
    accessGroupRepository: AccessGroupGateway
  ) {
    this._userRepository = userRepository
    this._tenantRepository = tenantRepository
    this._accessGroupRepository = accessGroupRepository
  }

  async execute(input: UpdateUserInputDto): Promise<UserOutputDto> {
    const user = await this._userRepository.findById(input.id)
    if (!user) throw new Error('User not found')

    const tenant = await this._tenantRepository.findById(input.tenantId)
    if (!tenant) throw new Error('Tenant not found')

    if (!authPermissions.all_roles.includes(input.role)) throw new Error('Invalid role')

    let accessGroup
    if (!authPermissions.default_roles.includes(input.role)) {
      // If user is a CUSTOM_ADMIN, add an access group is required
      accessGroup = await this._accessGroupRepository.findById(input.accessGroupId)
      if (!accessGroup) throw new Error('Access group not found')
    }

    const props = {
      id: new Id(input.id),
      username: input.username,
      email: input.email,
      password: bcrypt.hashSync(input.password, 10),
      role: input.role,
      accessGroup,
      tenant,
      isActive: input.isActive,
    }

    const userEntity = new User(props)
    await this._userRepository.update(userEntity)

    return {
      id: user.id.id,
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      tenant: {
        id: tenant.id.id,
        name: tenant.name,
        isActive: tenant.isActive,
      },
      ...(accessGroup && {
        accessGroup: {
          id: user?.accessGroup?.id.id,
          name: user?.accessGroup?.name,
        },
      }),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
