import AccessGroupGateway from '../../../authentication/gateway/access-group.gateway'
import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import {
  AddAccessGroupUseCaseInputDTO,
  AddAccessGroupUseCaseOutputDTO,
} from './add-access-group.interface'
import AccessGroup from '../../../authentication/domain/access-group.entity'
import { validatePermissionsStructure } from '../../../../utils/permissions'
import UserGateway from '../../gateway/user.gateway'

export class AddAccessGroupUseCase implements UseCaseInterface {
  private readonly _accessGroupRepository: AccessGroupGateway
  private readonly _userRepository: UserGateway
  constructor(accessGroupRepository: AccessGroupGateway, userRepository: UserGateway) {
    this._accessGroupRepository = accessGroupRepository
    this._userRepository = userRepository
  }

  async execute(input: AddAccessGroupUseCaseInputDTO): Promise<AddAccessGroupUseCaseOutputDTO> {
    const user = await this._userRepository.findById(input.userId)
    if (!user) throw new Error('User not found')

    validatePermissionsStructure(input.permissions)

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
