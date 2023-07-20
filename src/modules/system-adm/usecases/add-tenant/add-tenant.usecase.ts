import Joi from 'joi'
import Tenant from '../../domain/tenant.entity'
import TenantGateway from '../../gateway/tenant.gateway'
import { AddTenantInputDto, AddTenantOutputDto } from './add-tenant.usecase.dto'
import { REGEX_CPF_CNPJ } from '../../../../utils/regex'

export default class AddTenantUseCase {
  private _tenantRepository: TenantGateway

  constructor(tenantRepository: TenantGateway) {
    this._tenantRepository = tenantRepository
  }

  validate(input: AddTenantInputDto): void {
    const schema = Joi.object({
      name: Joi.string().min(2).max(45).required(),
      domain: Joi.string().domain().required(),
      document: Joi.string().regex(REGEX_CPF_CNPJ).required(),
      plan: Joi.string().required(),
      isActive: Joi.boolean(),
    })

    const { error } = schema.validate(input, { abortEarly: false })

    if (error) throw { error: error.details }
  }

  async execute(input: AddTenantInputDto): Promise<AddTenantOutputDto> {
    this.validate(input)

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
