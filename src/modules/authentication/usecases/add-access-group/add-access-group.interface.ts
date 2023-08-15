import { SystemResourcesProps } from '../../../@shared/interfaces'

export interface AddAccessGroupUseCaseInputDTO {
  userId: string
  name: string
  description: string
  permissions: SystemResourcesProps
}

export interface AddAccessGroupUseCaseOutputDTO {
  id: string
  name: string
  description: string
}
