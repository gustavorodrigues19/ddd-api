import Tenant from '../domain/tenant.entity'

export default interface TenantGateway {
  add(tenant: Tenant): Promise<Tenant>
  update(tenant: Tenant): Promise<Tenant>
  findById(id: string): Promise<Tenant>
  find(): Promise<Tenant[]>
}
