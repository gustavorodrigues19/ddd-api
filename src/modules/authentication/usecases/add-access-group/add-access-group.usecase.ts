import AccessGroupGateway from 'modules/authentication/gateway/access-group.gateway'
import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import {
  AddAccessGroupUseCaseInputDTO,
  AddAccessGroupUseCaseOutputDTO,
} from './add-access-group.interface'
import AccessGroup from 'modules/authentication/domain/access-group.entity'
import Resource from 'modules/authentication/domain/resource.value-object'

export class AddAccessGroupUseCase implements UseCaseInterface {
  private readonly _accessGroupRepository: AccessGroupGateway
  constructor(accessGroupRepository: AccessGroupGateway) {
    this._accessGroupRepository = accessGroupRepository
  }
  async execute(input: AddAccessGroupUseCaseInputDTO): Promise<AddAccessGroupUseCaseOutputDTO> {
    const resources = new Resource(input.permissions.actions)

    const accessGroup = new AccessGroup({
      name: input.name,
      description: input.description,
      resources: resources.actions,
    })
    await this._accessGroupRepository.add(accessGroup)

    return {
      id: accessGroup.id.id,
      name: accessGroup.name,
      description: accessGroup.description,
      permissions: accessGroup.resources.actions,
    }
  }
}
