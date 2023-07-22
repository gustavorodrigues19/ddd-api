import PlanGateway from '../../gateway/plan.gateway'
import Tenant from '../../domain/tenant.entity'
import TenantGateway from '../../gateway/tenant.gateway'
import { AddTenantInputDto, AddTenantOutputDto } from './add-tenant.usecase.dto'

export default class AddTenantUseCase {
  private _tenantRepository: TenantGateway
  private _planRepository: PlanGateway

  constructor(tenantRepository: TenantGateway, planRepository: PlanGateway) {
    this._tenantRepository = tenantRepository
    this._planRepository = planRepository
  }

  async execute(input: AddTenantInputDto): Promise<AddTenantOutputDto> {
    const plan = await this._planRepository.findById(input.planId)

    if (!plan) throw new Error('Plan not found')

    const tenant = new Tenant({
      name: input.name,
      document: input.document,
      domain: input.domain,
      plan,
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
    }
  }
}
