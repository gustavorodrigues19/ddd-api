import AccessGroupGateway from '../../../authentication/gateway/access-group.gateway'
import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import {
  AddAccessGroupUseCaseInputDTO,
  AddAccessGroupUseCaseOutputDTO,
} from './add-access-group.interface'
import AccessGroup from '../../../authentication/domain/access-group.entity'
import Resource from '../../../authentication/domain/resource.value-object'
import { SystemResourcesProps } from '../../../@shared/interfaces'
import { isUUID } from '../../../../utils'
import { RESOURCES_ACTIONS_LIST, SYSTEM_RESOURCES_LIST } from '../../../../utils/constants'

export class AddAccessGroupUseCase implements UseCaseInterface {
  private readonly _accessGroupRepository: AccessGroupGateway
  constructor(accessGroupRepository: AccessGroupGateway) {
    this._accessGroupRepository = accessGroupRepository
  }

  private validateStructure(permissions: SystemResourcesProps): void {
    const resourcesObject = Object.values(permissions).reduce(
      (acc, curr) => ({ ...acc, ...curr }),
      {}
    )

    for (let key in resourcesObject) {
      const resourceName = resourcesObject[key]
      const resourceSplit = resourceName.split(':')

      const entity = resourceSplit?.[0]
      const actions = resourceSplit?.[1]
      const values = resourceSplit?.[2]

      if (!entity || !actions || !values) throw new Error('Invalid resources')
      else {
        if (!SYSTEM_RESOURCES_LIST.includes(entity)) throw new Error(`Invalid resource ${entity}`)

        const isActionsValid = actions
          .split(',')
          .some((action: string) => RESOURCES_ACTIONS_LIST.includes(action))

        if (!isActionsValid) throw new Error('Invalid action')

        const isValuesValid = values
          .split(',')
          .some((value: string) => isUUID(value) || value === '*')

        if (!isValuesValid) throw new Error('Invalid value')
      }
    }
  }

  async execute(input: AddAccessGroupUseCaseInputDTO): Promise<AddAccessGroupUseCaseOutputDTO> {
    const resources = new Resource(input.permissions)

    this.validateStructure(input.permissions)

    const accessGroup = new AccessGroup({
      name: input.name,
      description: input.description,
      resources: resources.resourcesEncoded,
    })
    await this._accessGroupRepository.add(accessGroup)

    return {
      id: accessGroup.id.id,
      name: accessGroup.name,
      description: accessGroup.description,
    }
  }
}
