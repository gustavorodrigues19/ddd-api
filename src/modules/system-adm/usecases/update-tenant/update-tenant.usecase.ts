import PlanGateway from '../../gateway/plan.gateway'
import TenantGateway from '../../gateway/tenant.gateway'
import { UpdateTenantInputDto, UpdateTenantOutputDto } from './update-tenant.usecase.dto'

export default class UpdateTenantUseCase {
  private _tenantRepository: TenantGateway
  private _planRepository: PlanGateway

  constructor(tenantRepository: TenantGateway, planRepository: PlanGateway) {
    this._tenantRepository = tenantRepository
    this._planRepository = planRepository
  }

  async execute(input: UpdateTenantInputDto): Promise<UpdateTenantOutputDto> {
    const tenant = await this._tenantRepository.findById(input.id)
    if (!tenant) throw new Error('Tenant not found')

    const plan = await this._planRepository.findById(input.planId)
    if (!plan) throw new Error('Plan not found')

    tenant.plan = plan

    await this._tenantRepository.update(tenant)

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
