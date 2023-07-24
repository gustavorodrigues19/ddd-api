export interface CreateTenantInputDto {
  name: string
  document: string
  domain: string
  planId: string
  isActive?: boolean
}

export interface UpdateTenantInputDto {
  id: string
  name: string
  document: string
  domain: string
  planId: string
  isActive?: boolean
}

export interface TenantOutputDto {
  id: string
  name: string
  document: string
  domain: string
  plan: {
    id: string
    name: string
    description: string
    createdAt: Date
    updatedAt: Date
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface TenantFacadeInterface {
  findTenants(): Promise<TenantOutputDto[]>
  createTenant(input: CreateTenantInputDto): Promise<TenantOutputDto>
  updateTenant(input: UpdateTenantInputDto): Promise<TenantOutputDto>
  findTenant(id: string): Promise<TenantOutputDto>
}
