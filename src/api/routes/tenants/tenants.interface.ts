export interface ParamsGetTenantById {
  id: string
}

export interface QueryGetTenants {
  skip: number
}

export interface CreateTenantInput {
  name: string
  document: string
  domain: string
  planId: string
  isActive?: boolean
}

export interface UpdateTenantInput {
  id: string
  name: string
  document: string
  domain: string
  planId: string
  isActive?: boolean
}
