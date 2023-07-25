import TenantGateway from '../../gateway/tenant.gateway'
import { TenantOutputDto } from './find-tenant.usecase.dto'

export default class FindTenantUseCase {
  private _tenantRepository: TenantGateway

  constructor(tenantRepository: TenantGateway) {
    this._tenantRepository = tenantRepository
  }

  async execute(id: string): Promise<TenantOutputDto> {
    const tenant = await this._tenantRepository.findById(id)

    if (!tenant) throw new Error('Tenant not found')

    return {
      id: tenant.id.id,
      name: tenant.name,
      document: tenant.document,
      domain: tenant.domain,
      plan: {
        id: tenant.plan.id.id,
        name: tenant.plan.name,
        description: tenant.plan.description,
        createdAt: tenant.plan.createdAt,
        updatedAt: tenant.plan.updatedAt,
      },
      isActive: tenant.isActive,
      createdAt: tenant.createdAt,
      updatedAt: tenant.updatedAt,
    }
  }
}
