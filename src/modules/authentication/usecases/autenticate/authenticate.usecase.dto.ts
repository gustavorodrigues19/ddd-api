import { RoleKeys } from '../../../@shared/interfaces'

export interface UserInputDto {
  email: string
  username?: string
  password: string
}

export interface UserOutputDto {
  id?: string
  username: string
  email: string
  role: RoleKeys
  accessGroup?: {
    id?: string
    name?: string
  }
  tenant: {
    id: string
    name: string
    isActive: boolean
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
