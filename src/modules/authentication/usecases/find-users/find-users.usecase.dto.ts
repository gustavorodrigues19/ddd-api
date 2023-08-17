export interface FindUsersInputDto {
  total?: number
  offset?: number
  pageSize?: number
}

export interface UserDto {
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

export interface FindUsersOutputDto {
  data: UserDto[]
  total: number
  skip: number
  take: number
}
