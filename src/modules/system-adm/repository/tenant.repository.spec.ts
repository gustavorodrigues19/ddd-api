import TenantsRepository from './tenant.repository'
import { PrismaClient } from '@prisma/client'
import TenantMapper from './tenant.mapper'
import { mockTenant } from '../../../__mocks__/modules/system-adm/repository/mock-tenant'

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    tenants: {
      create: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(() => [mockTenant]),
      findUnique: jest.fn(() => mockTenant),
    },
  })),
}))
describe('Add tenant repository', () => {
  it('should add a tenant', async () => {
    const prismaClient = new PrismaClient()
    const repository = new TenantsRepository(prismaClient)
    const tenantMapped = TenantMapper.toDomain(mockTenant)

    await repository.add(tenantMapped)

    expect(prismaClient.tenants.create).toHaveBeenCalled()
  })

  it('should update a tenant', async () => {
    const prismaClient = new PrismaClient()
    const repository = new TenantsRepository(prismaClient)
    const tenantMapped = TenantMapper.toDomain(mockTenant)

    await repository.update(tenantMapped)

    expect(prismaClient.tenants.update).toHaveBeenCalled()
  })

  it('should find tenants', async () => {
    const prismaClient = new PrismaClient()
    const repository = new TenantsRepository(prismaClient)
    const tenantMapped = TenantMapper.toDomain(mockTenant)

    const result = await repository.find()

    expect(prismaClient.tenants.findMany).toHaveBeenCalled()
    expect(result).toEqual([tenantMapped])
  })

  it('should find a tenant by id', async () => {
    const prismaClient = new PrismaClient()
    const repository = new TenantsRepository(prismaClient)
    const tenantMapped = TenantMapper.toDomain(mockTenant)

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
