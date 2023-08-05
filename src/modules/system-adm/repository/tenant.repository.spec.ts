import TenantsRepository from './tenant.repository'
import { PrismaClient } from '@prisma/client'
import TenantMapper from './tenant.mapper'
import { mockTenantEntity } from '../../__mocks__/system-adm.mock'

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    tenants: {
      create: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(() => [mockTenantEntity]),
      count: jest.fn(() => 1),
      findUnique: jest.fn(() => mockTenantEntity),
    },
  })),
}))
describe('Add tenant repository', () => {
  it('should add a tenant', async () => {
    const prismaClient = new PrismaClient()
    const repository = new TenantsRepository(prismaClient)
    const tenantMapped = TenantMapper.toDomain(mockTenantEntity)

    await repository.add(tenantMapped)

    expect(prismaClient.tenants.create).toHaveBeenCalled()
  })

  it('should update a tenant', async () => {
    const prismaClient = new PrismaClient()
    const repository = new TenantsRepository(prismaClient)
    const tenantMapped = TenantMapper.toDomain(mockTenantEntity)

    await repository.update(tenantMapped)

    expect(prismaClient.tenants.update).toHaveBeenCalled()
  })

  it('should find tenants', async () => {
    const prismaClient = new PrismaClient()
    const repository = new TenantsRepository(prismaClient)
    const tenantMapped = TenantMapper.toDomain(mockTenantEntity)

    const result = await repository.find(0, 100)

    expect(prismaClient.tenants.findMany).toHaveBeenCalled()
    expect(result).toEqual({ data: [tenantMapped], total: 1 })
  })

  it('should find tenants', async () => {
    const prismaClient = new PrismaClient()
    const repository = new TenantsRepository(prismaClient)
    const tenantMapped = TenantMapper.toDomain(mockTenantEntity)

    const result = await repository.findByCondition('tenant', '17.868.815/0001-90')

    expect(prismaClient.tenants.findMany).toHaveBeenCalled()
    expect(result).toEqual([tenantMapped])
  })

  it('should find a tenant by id', async () => {
    const prismaClient = new PrismaClient()
    const repository = new TenantsRepository(prismaClient)
    const tenantMapped = TenantMapper.toDomain(mockTenantEntity)

    const result = await repository.findById('1')

    expect(prismaClient.tenants.findUnique).toHaveBeenCalled()
    expect(result).toEqual(tenantMapped)
  })

  it('should not find a tenant by id', async () => {
    const prismaClient = new PrismaClient()
    const repository = new TenantsRepository(prismaClient)
    prismaClient.tenants.findUnique = jest.fn((): any => null)

    const result = await repository.findById('1')

    expect(prismaClient.tenants.findUnique).toHaveBeenCalled()
    expect(result).toEqual(null)
  })
})
