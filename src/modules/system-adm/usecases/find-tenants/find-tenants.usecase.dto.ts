export interface FindTenantsInputDto {
  total?: number
  offset?: number
  pageSize?: number
}

export interface TenantDto {
  id: string
  name: string
  document: string
  domain: string
  plan: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface FindTenantsOutputDto {
  tenants: TenantDto[]
  total: number
  offset: number
  pageSize: number
}
