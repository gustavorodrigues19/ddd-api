export interface UserInputDto {
  id?: string
  name: string
  email: string
  password: string
  document: string
  accessGroupId: string
  isActive: boolean
  tenantId: string
  createdAt?: Date
  updatedAt?: Date
}

export interface UserOutputDto {
  id?: string
  name: string
  email: string
  document: string
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
