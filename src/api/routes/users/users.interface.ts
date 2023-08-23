export interface ParamsGetUserById {
  id: string
}

export interface QueryGetUsers {
  skip: number
}

export const ROLES = {
  MASTER_ADMIN: 'MASTER_ADMIN',
  ORGANIZATION_ADMIN: 'ORGANIZATION_ADMIN',
  FRANCHISE_ADMIN: 'FRANCHISE_ADMIN',
  CUSTOM_ADMIN: 'CUSTOM_ADMIN',
} as const

export type RoleKeys = (typeof ROLES)[keyof typeof ROLES]

export interface SystemResourcesProps {
  system: string[]
  business: string[]
  academy: string[]
  financial: string[]
  technical: string[]
}

export interface CreateUserInput {
  username: string
  email: string
  password: string
  role: RoleKeys
  accessGroupId: string
  tenantId: string
  isActive: boolean
}

export interface UpdateUserInput {
  id: string
  username: string
  email: string
  password: string
  role: RoleKeys
  accessGroupId: string
  tenantId: string
  isActive: boolean
}
