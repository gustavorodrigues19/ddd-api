import AccessGroupGateway from 'modules/authentication/gateway/access-group.gateway'
import Id from '../../../@shared/domain/value-object/id.value-object'
import User from '../../domain/user.entity'
import UserGateway from '../../gateway/user.gateway'
import { UserInputDto, UserOutputDto } from './add-user.usecase.dto'
import SystemAdminFacade from '../../../system-adm/facade/system-adm.facade'

export default class AddUserUseCase {
  private _userRepository: UserGateway
  private _accessGroupRepository: AccessGroupGateway
  private _systemAdminFacade: SystemAdminFacade

  constructor(
    userRepository: UserGateway,
    accessGroupRepository: AccessGroupGateway,
    systemAdminFacade: SystemAdminFacade
  ) {
    this._userRepository = userRepository
    this._accessGroupRepository = accessGroupRepository
    this._systemAdminFacade = systemAdminFacade
  }

  async execute(input: UserInputDto): Promise<UserOutputDto> {
    const tenant = await this._systemAdminFacade.findTenant(input.tenantId)

    const accessGroup = await this._accessGroupRepository.findById(input.accessGroupId)
    if (!accessGroup) throw new Error('Access group not found')

    const props = {
      id: new Id(input.id) || new Id(),
      name: input.name,
      email: input.email,
      password: input.password,
      document: input.document,
      accessGroup,
      isActive: input.isActive,
      tenantId: input.tenantId,
      createdAt: input.createdAt || new Date(),
      updatedAt: input.updatedAt || new Date(),
    }

    const user = new User(props)
    await this._userRepository.add(user)

    return {
      id: user.id.id,
      name: user.name,
      email: user.email,
      document: user.document,
      isActive: user.isActive,
      tenant: {
        id: tenant.id,
        name: tenant.name,
        isActive: tenant.isActive,
      },
      accessGroup: {
        id: user.accessGroup.id.id,
        name: user.accessGroup.name,
        description: user.accessGroup.description,
        permissions: user.accessGroup.resources.actions,
      },
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
