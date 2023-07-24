export interface FindTenantInputDto {
  id: string
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
