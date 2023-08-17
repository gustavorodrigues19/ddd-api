export interface FindUserInputDto {
  id: string
}

export interface UserOutputDto {
  id: string
  username: string
  email: string
  role: string
  tenant: {
    id: string
    name: string
  }
  accessGroup?: {
    id: string
    name: string
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
