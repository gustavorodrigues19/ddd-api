export interface AddTenantInputDto {
  name: string
  document: string
  domain: string
  planId: string
  isActive: boolean
}

export interface AddTenantOutputDto {
  id: string
  name: string
  document: string
  domain: string
  plan: {
    id: string
    name: string
    description: string
    price: number
    createdAt: Date
    updatedAt: Date
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
