import AccessGroupGateway from '../../../authentication/gateway/access-group.gateway'
import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import {
  AddAccessGroupUseCaseInputDTO,
  AddAccessGroupUseCaseOutputDTO,
} from './add-access-group.interface'
import AccessGroup from '../../../authentication/domain/access-group.entity'
import { ROLES } from '../../../@shared/interfaces'
import {
  getPermissionsStructure,
  validatePermissionsStructure,
} from '../../../../utils/permissions'
import UserGateway from '../../gateway/user.gateway'
import User from '../../domain/user.entity'

export class AddAccessGroupUseCase implements UseCaseInterface {
  private readonly _accessGroupRepository: AccessGroupGateway
  private readonly _userRepository: UserGateway
  constructor(accessGroupRepository: AccessGroupGateway, userRepository: UserGateway) {
    this._accessGroupRepository = accessGroupRepository
    this._userRepository = userRepository
  }

  private async validatePermissions(
    input: AddAccessGroupUseCaseInputDTO,
    user: User
  ): Promise<void> {
    if (user.role === ROLES.ORGANIZATION_ADMIN) {
      // Franchise Owner
      const systemPermissions = input.permissions.system
      const businessPermissions = input.permissions.business

      if (!systemPermissions && !businessPermissions) throw new Error('Invalid permissions')

      if (systemPermissions?.tenants) {
        const { entity, actions } = getPermissionsStructure(systemPermissions.tenants)

        if (entity !== 'tenants') throw new Error('Invalid resource tenants')
        if (actions !== 'view,edit') throw new Error('Invalid action')
      }
    }
    // if (businessPermissions?.franchises) {

    // system?: {
    //   tenants: string
    //   plans?: string
    // }
    // business?: {
    //   franchises?: string
    //   administrators?: string
    //   coaches?: string
    // }
    // academy?: {
    //   athletes?: string
    //   teams?: string
    //   sport_categories?: string
    // }
  }

  async execute(input: AddAccessGroupUseCaseInputDTO): Promise<AddAccessGroupUseCaseOutputDTO> {
    const user = await this._userRepository.findById(input.userId)
    if (!user) throw new Error('User not found')

    validatePermissionsStructure(input.permissions)
    await this.validatePermissions(input, user)

    const accessGroup = new AccessGroup({
      name: input.name,
      description: input.description,
      permissions: input.permissions.toString(),
    })
    await this._accessGroupRepository.add(accessGroup)

    return {
      id: accessGroup.id.id,
      name: accessGroup.name,
      description: accessGroup.description,
    }
  }
}
