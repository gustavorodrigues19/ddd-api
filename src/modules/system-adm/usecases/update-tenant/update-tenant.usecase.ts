import TenantGateway from '../../gateway/tenant.gateway'
import { UpdateTenantInputDto, UpdateTenantOutputDto } from './update-tenant.usecase.dto'

export default class UpdateTenantUseCase {
  private _tenantRepository: TenantGateway

  constructor(tenantRepository: TenantGateway) {
    this._tenantRepository = tenantRepository
  }

  async execute(input: UpdateTenantInputDto): Promise<UpdateTenantOutputDto> {
    const tenant = await this._tenantRepository.findById(input.id)

    if (!tenant) throw new Error('Tenant not found')

    await this._tenantRepository.update(tenant)

    return {
      id: tenant.id.id,
      name: tenant.name,
      document: tenant.document,
      domain: tenant.domain,
      plan: tenant.plan,
      isActive: tenant.isActive,
      createdAt: tenant.createdAt,
      updatedAt: tenant.updatedAt,
    }
  }
}
