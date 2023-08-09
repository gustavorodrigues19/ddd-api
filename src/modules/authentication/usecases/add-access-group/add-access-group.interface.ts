import { RoleKeys, SystemResourcesProps } from '../../../@shared/interfaces'

export interface AddAccessGroupUseCaseInputDTO {
  name: string
  description: string
  permissions: SystemResourcesProps
  role: RoleKeys
}

export interface AddAccessGroupUseCaseOutputDTO {
  id: string
  name: string
  description: string
}
