import AccessGroupGateway from '../../gateway/access-group.gateway'
import Id from '../../../@shared/domain/value-object/id.value-object'
import User from '../../domain/user.entity'
import UserGateway from '../../gateway/user.gateway'
import { UserInputDto, UserOutputDto } from './add-user.usecase.dto'
import TenantGatewayShared from '../../../@shared/gateway/tenant-shared.gateway'

export default class AddUserUseCase {
  private _userRepository: UserGateway
  private _accessGroupRepository: AccessGroupGateway
  private _tenantRepository: TenantGatewayShared

  constructor(
    userRepository: UserGateway,
    accessGroupRepository: AccessGroupGateway,
    tenantRepository: TenantGatewayShared
  ) {
    this._userRepository = userRepository
    this._accessGroupRepository = accessGroupRepository
    this._tenantRepository = tenantRepository
  }

  async execute(input: UserInputDto): Promise<UserOutputDto> {
    const tenant = await this._tenantRepository.findById(input.tenantId)
    if (!tenant) throw new Error('Tenant not found')

    const accessGroup = await this._accessGroupRepository.findById(input.accessGroupId)
    if (!accessGroup) throw new Error('Access group not found')

    const props = {
      id: new Id(input.id) || new Id(),
      username: input.username,
      email: input.email,
      password: input.password,
      role: input.role,
      accessGroup,
      tenant,
      isActive: input.isActive,
      createdAt: input.createdAt || new Date(),
      updatedAt: input.updatedAt || new Date(),
    }

    const user = new User(props)
    await this._userRepository.add(user)

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
      accessGroup: {
        id: user.accessGroup.id.id,
        name: user.accessGroup.name,
        description: user.accessGroup.description,
        permissions: user.accessGroup.permissions,
      },
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
