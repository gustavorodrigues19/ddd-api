import TenantsRepository from './tenant.repository'
import { PrismaClient } from '@prisma/client'
import TenantMapper from './tenant.mapper'

export const mockTenant = {
  id: '1',
  name: 'tenant',
  domain: 'tenant.com',
  document: '123456789',
  isActive: true,
  plan: {
    id: '1',
    name: 'basic',
    description: 'Basic plan',
    price: 100,
    createdAt: new Date('2023-07-22T22:31:31'),
    updatedAt: new Date('2023-07-22T22:31:31'),
  },
  createdAt: new Date('2023-07-22T22:31:31'),
  updatedAt: new Date('2023-07-22T22:31:31'),
}

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
