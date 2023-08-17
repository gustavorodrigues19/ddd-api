import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import TenantGateway from '../../gateway/tenant.gateway'
import { FindTenantsOutputDto } from './find-tenants.usecase.dto'

export default class FindTenantsUseCase implements UseCaseInterface {
  private _tenantRepository: TenantGateway

  constructor(tenantRepository: TenantGateway) {
    this._tenantRepository = tenantRepository
  }

  async execute(skip: number): Promise<FindTenantsOutputDto> {
    const tenants = await this._tenantRepository.find(skip, 100)

    const total = tenants.total
    const data = tenants.data.map((tenant) => ({
      id: tenant.id.id,
      name: tenant.name,
      document: tenant.document,
      domain: tenant.domain,
      plan: {
        id: tenant.plan.id.id,
        name: tenant.plan.name,
        description: tenant.plan.description,
        price: tenant.plan.price,
        createdAt: tenant.plan.createdAt,
        updatedAt: tenant.plan.updatedAt,
      },
      isActive: tenant.isActive,
      createdAt: tenant.createdAt,
      updatedAt: tenant.updatedAt,
    }))

    return {
      data,
      total,
      skip,
      take: 100,
    }
  }
}
