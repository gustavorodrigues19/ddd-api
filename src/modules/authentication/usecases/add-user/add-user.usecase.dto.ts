import { RoleKeys } from '../../../@shared/interfaces'

export interface UserInputDto {
  id?: string
  username: string
  email: string
  password: string
  role: RoleKeys
  accessGroupId: string
  isActive: boolean
  tenantId: string
  createdAt?: Date
  updatedAt?: Date
}

export interface UserOutputDto {
  id?: string
  username: string
  email: string
  role: RoleKeys
  accessGroup: {
    id: string
    name: string
    description: string
    permissions: string
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
