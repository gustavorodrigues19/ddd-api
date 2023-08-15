import Tenant from '../../@shared/domain/entity/tenant.entity'

export interface TenantFindOutputDto {
  data: Tenant[]
  total: number
}
export default interface TenantGateway {
  add(tenant: Tenant): Promise<void>
  update(tenant: Tenant): Promise<void>
  findById(id: string): Promise<Tenant | null>
  find(skip: number, take: number): Promise<TenantFindOutputDto>
  findByCondition(name: string, document: string): Promise<Tenant[]>
}
