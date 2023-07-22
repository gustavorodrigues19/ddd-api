import Tenant from '../domain/tenant.entity'

export default interface TenantGateway {
  add(tenant: Tenant): Promise<void>
  update(tenant: Tenant): Promise<void>
  findById(id: string): Promise<Tenant | null>
  find(): Promise<Tenant[]>
}
