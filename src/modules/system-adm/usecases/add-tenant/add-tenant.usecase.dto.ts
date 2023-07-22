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
  plan: {
    id: string
    name: string
    description: string
    price: number
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
