import TenantsRepository from './tenant-shared.repository'
import { PrismaClient } from '@prisma/client'
import { mockTenantEntity } from '../../../__mocks__/system-adm.mock'

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    tenants: {
      findUnique: jest.fn(() => mockTenantEntity),
    },
  })),
}))
describe('Tenant repository', () => {
  it('should find a tenant by id', async () => {
    const prismaClient = new PrismaClient()
    const repository = new TenantsRepository(prismaClient)

    const result = await repository.findById('1')

    expect(prismaClient.tenants.findUnique).toHaveBeenCalled()
    expect(result?.name).toEqual(mockTenantEntity.name)
    expect(result?.domain).toEqual(mockTenantEntity.domain)
    expect(result?.plan.name).toEqual(mockTenantEntity.plan.name)
    expect(result?.plan.price).toEqual(mockTenantEntity.plan.price)
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
