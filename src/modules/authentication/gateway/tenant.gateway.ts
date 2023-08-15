import Tenant from '../../@shared/domain/entity/tenant.entity'

export default interface TenantGateway {
  findById(id: string): Promise<Tenant | null>
}
