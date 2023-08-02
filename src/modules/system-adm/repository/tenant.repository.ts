import Tenant from '../domain/tenant.entity'
import TenantGateway from '../gateway/tenant.gateway'
import { PrismaClient, Prisma } from '@prisma/client'
import TenantMapper from './tenant.mapper'

export default class TenantsRepository implements TenantGateway {
  private _prismaOrm: PrismaClient

  constructor(prismaOrm: PrismaClient) {
    this._prismaOrm = prismaOrm
  }

  async add(tenantInput: Tenant): Promise<void> {
    const tenant: Prisma.TenantsCreateInput = {
      name: tenantInput.name,
      domain: tenantInput.domain,
      document: tenantInput.document,
      isActive: tenantInput.isActive,
      plan: { connect: { id: tenantInput.plan.id.id } },
    }
    await this._prismaOrm.tenants.create({ data: tenant })
  }

  async update(tenantInput: Tenant): Promise<void> {
    const tenant: Prisma.TenantsUpdateInput = {
      name: tenantInput.name,
      domain: tenantInput.domain,
      document: tenantInput.document,
      isActive: tenantInput.isActive,
      plan: { connect: { id: tenantInput.plan.id.id } },
    }
    await this._prismaOrm.tenants.update({
      where: { id: tenantInput.id.id },
      data: tenant,
      include: { plan: true },
    })
  }

  async findById(id: string): Promise<Tenant | null> {
    const result = await this._prismaOrm.tenants.findUnique({
      where: { id },
      include: { plan: true },
    })
    if (!result) return null

    return TenantMapper.toDomain(result)
  }

  async find(): Promise<Tenant[]> {
    const results = await this._prismaOrm.tenants.findMany()
    return results.map(TenantMapper.toDomain)
  }
}
