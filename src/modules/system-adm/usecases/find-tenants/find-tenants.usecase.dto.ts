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
  plan: {
    id: string
    name: string
    price: number
    description: string
    createdAt: Date
    updatedAt: Date
  }
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
