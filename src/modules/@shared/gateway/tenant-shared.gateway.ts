import Tenant from '../domain/entity/tenant.entity'

export default interface TenantGatewayShared {
  findById(id: string): Promise<Tenant | null>
}
