export interface UpdateTenantInputDto {
  id: string
  name: string
  document: string
  domain: string
  plan: string
  isActive: boolean
}

export interface UpdateTenantOutputDto {
  id: string
  name: string
  document: string
  domain: string
  plan: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
