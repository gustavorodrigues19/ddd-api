import { RoleKeys } from '../../@shared/interfaces'

export interface CreateUserInputDto {
  id?: string
  username: string
  email: string
  password: string
  role: RoleKeys
  accessGroupId: string
  isActive: boolean
  tenantId: string
  createdAt?: Date
}

export interface UpdateUserInputDto {
  id: string
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
  id: string
  username: string
  email: string
  role: string
  isActive: boolean
  tenant: {
    id: string
    name: string
  }
  accessGroup?: {
    id: string
    name: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface AuthenticationInputDto {
  username: string
  password: string
}

export interface UsersOutputDto {
  data: UserOutputDto[]
  total: number
  skip: number
  take: number
}

export interface AuthenticationFacadeInterface {
  findUsers(skip: number): Promise<UsersOutputDto>
  createUser(input: CreateUserInputDto): Promise<UserOutputDto>
  updateUser(input: UpdateUserInputDto): Promise<UserOutputDto>
  findUser(id: string): Promise<UserOutputDto>
  deleteUser(id: string): Promise<UserOutputDto>
  authenticate(input: AuthenticationInputDto): Promise<string>
}
