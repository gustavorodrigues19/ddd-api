import UseCaseInterface from 'modules/@shared/usecase/use-case.interface'
import TenantGateway from '../../gateway/tenant.gateway'
import { FindTenantsOutputDto } from './find-tenants.usecase.dto'

export default class FindTenantsUseCase implements UseCaseInterface {
  private _tenantRepository: TenantGateway

  constructor(tenantRepository: TenantGateway) {
    this._tenantRepository = tenantRepository
  }

  async execute(): Promise<FindTenantsOutputDto> {
    const foundTenants = await this._tenantRepository.find()

    const tenants = foundTenants.map((tenant) => ({
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
    }))

    return {
      tenants,
      total: 0,
      offset: 0,
      pageSize: 200,
    }
  }
}
