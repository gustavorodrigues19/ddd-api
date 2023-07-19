export interface UserInputDto {
  id?: string
  name: string
  email: string
  password: string
  document: string
  role: string
  franchisesIds: string[]
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
  role: string
  franchisesIds: string[]
  accessGroupId: string
  isActive: boolean
  tenantId: string
  createdAt: Date
  updatedAt: Date
}
