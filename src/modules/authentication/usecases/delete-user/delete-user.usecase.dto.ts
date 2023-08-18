import { RoleKeys } from '../../../@shared/interfaces'

export interface UserOutputDto {
  id?: string
  username: string
  email: string
  role: RoleKeys
  isActive: boolean
  accessGroup?: {
    id?: string
    name?: string
  }
  tenant: {
    id: string
    name: string
  }
  createdAt: Date
  updatedAt: Date
}
