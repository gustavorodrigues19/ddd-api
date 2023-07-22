import Tenant from '../../domain/tenant.entity'
import TenantGateway from '../../gateway/tenant.gateway'
import { AddTenantInputDto, AddTenantOutputDto } from './add-tenant.usecase.dto'

export default class AddTenantUseCase {
  private _tenantRepository: TenantGateway

  constructor(tenantRepository: TenantGateway) {
    this._tenantRepository = tenantRepository
  }

  async execute(input: AddTenantInputDto): Promise<AddTenantOutputDto> {
    const tenant = new Tenant({
      name: input.name,
      document: input.document,
      domain: input.domain,
      plan: input.plan,
      isActive: input.isActive,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await this._tenantRepository.add(tenant)

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
