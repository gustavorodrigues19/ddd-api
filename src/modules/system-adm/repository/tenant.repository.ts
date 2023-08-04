import Tenant from '../domain/tenant.entity'
import TenantGateway, { TenantFindOutputDto } from '../gateway/tenant.gateway'
import { PrismaClient, Prisma } from '@prisma/client'
import TenantMapper from './tenant.mapper'

export default class TenantsRepository implements TenantGateway {
  private _prismaOrm: PrismaClient

  constructor(prismaOrm: PrismaClient) {
    this._prismaOrm = prismaOrm
  }

  async add(tenantInput: Tenant): Promise<void> {
    try {
      const tenant: Prisma.TenantsCreateInput = {
        name: tenantInput.name,
        domain: tenantInput.domain,
        document: tenantInput.document,
        isActive: tenantInput.isActive,
        plan: { connect: { id: tenantInput.plan.id.id } },
      }
      await this._prismaOrm.tenants.create({ data: tenant })
    } catch (error) {
      throw new Error('Error on create tenant.')
    }
  }

  async update(tenantInput: Tenant): Promise<void> {
    try {
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
    } catch (error) {
      throw new Error('Error on update tenant.')
    }
  }

  async findById(id: string): Promise<Tenant | null> {
    try {
      const result = await this._prismaOrm.tenants.findUnique({
        where: { id },
        include: { plan: true },
      })
      if (!result) return null

      return TenantMapper.toDomain(result)
    } catch (error) {
      throw new Error('Error on find tenant.')
    }
  }

  async findByCondition(name: string, document: string): Promise<Tenant[]> {
    try {
      const result = await this._prismaOrm.tenants.findMany({
        where: { OR: [{ name }, { document }] },
        include: { plan: true },
      })

      return result.map(TenantMapper.toDomain)
    } catch (error) {
      throw new Error('Error on find tenant.')
    }
  }

  async find(skip: number, take: number): Promise<TenantFindOutputDto> {
    try {
      const results = await this._prismaOrm.tenants.findMany({
        include: { plan: true },
        skip,
        take,
        orderBy: {
          name: 'asc',
        },
      })
      const total = await this._prismaOrm.tenants.count()
      const data = results.map(TenantMapper.toDomain)
      return { data, total }
    } catch (error) {
      throw new Error('Error on find tenants.')
    }
  }
}
