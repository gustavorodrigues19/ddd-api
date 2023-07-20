export interface AddTenantInputDto {
  name: string
  document: string
  domain: string
  plan: string
  isActive: boolean
}

export interface AddTenantOutputDto {
  id: string
  name: string
  document: string
  domain: string
  plan: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
