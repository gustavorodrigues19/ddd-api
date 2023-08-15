import { mockFranchiseEntity } from '../../../__mocks__/business-admin.mock'
import FranchisesRepository from './franchise-shared.repository'
import { PrismaClient } from '@prisma/client'

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    franchises: {
      findUnique: jest.fn(() => mockFranchiseEntity),
      findMany: jest.fn(() => [mockFranchiseEntity]),
    },
  })),
}))
describe('Test franchise repository', () => {
  it('findById - should return franchise', async () => {
    const prismaClient = new PrismaClient()
    const franchise = new FranchisesRepository(prismaClient)
    const result = await franchise.findById('1')

    expect(prismaClient.franchises.findUnique).toHaveBeenCalled()
    expect(result?.name).toBe(mockFranchiseEntity.name)
    expect(result?.document).toBe(mockFranchiseEntity.document)
    expect(result?.email).toBe(mockFranchiseEntity.email)
    expect(result?.brand.color).toBe(mockFranchiseEntity.brand.color)
    expect(result?.brand.logo_url).toBe(mockFranchiseEntity.brand.logo_url)
    expect(result?.address.street).toBe(mockFranchiseEntity.address.street)
    expect(result?.address.houseNumber).toBe(mockFranchiseEntity.address.houseNumber)
    expect(result?.address.city).toBe(mockFranchiseEntity.address.city)
    expect(result?.address.state).toBe(mockFranchiseEntity.address.state)
  })

  it('findById - should return null', async () => {
    const prismaClient = new PrismaClient()
    prismaClient.franchises.findUnique = jest.fn((): any => null)
    const franchise = new FranchisesRepository(prismaClient)
    const result = await franchise.findById('1')

    expect(prismaClient.franchises.findUnique).toHaveBeenCalled()
    expect(result).toBe(null)
  })

  it('findById - should throw an generic error', async () => {
    const prismaClient = new PrismaClient()
    prismaClient.franchises.findUnique = jest.fn((): any => Promise.reject('error'))
    const franchise = new FranchisesRepository(prismaClient)

    franchise.findById('1').catch((err) => {
      expect(prismaClient.franchises.findUnique).toHaveBeenCalled()
      expect(err?.message).toBe('Error on find franchise.')
    })
  })

  it('findByTenantId - should return a franchise list', async () => {
    const prismaClient = new PrismaClient()
    const franchise = new FranchisesRepository(prismaClient)
    const results = await franchise.findByTenantId('1')
    const result = results[0]

    expect(prismaClient.franchises.findMany).toHaveBeenCalled()
    expect(result?.name).toBe(mockFranchiseEntity.name)
    expect(result?.document).toBe(mockFranchiseEntity.document)
    expect(result?.email).toBe(mockFranchiseEntity.email)
    expect(result?.brand.color).toBe(mockFranchiseEntity.brand.color)
    expect(result?.brand.logo_url).toBe(mockFranchiseEntity.brand.logo_url)
    expect(result?.address.street).toBe(mockFranchiseEntity.address.street)
    expect(result?.address.houseNumber).toBe(mockFranchiseEntity.address.houseNumber)
    expect(result?.address.city).toBe(mockFranchiseEntity.address.city)
    expect(result?.address.state).toBe(mockFranchiseEntity.address.state)
  })
  it('findByTenantId - should return an empty array', async () => {
    const prismaClient = new PrismaClient()
    prismaClient.franchises.findMany = jest.fn((): any => [])
    const franchise = new FranchisesRepository(prismaClient)
    const result = await franchise.findByTenantId('1')

    expect(prismaClient.franchises.findMany).toHaveBeenCalled()
    expect(result).toEqual([])
  })

  it('findByTenantId - should throw an generic error', async () => {
    const prismaClient = new PrismaClient()
    prismaClient.franchises.findMany = jest.fn((): any => Promise.reject('error'))
    const franchise = new FranchisesRepository(prismaClient)

    franchise.findByTenantId('1').catch((err) => {
      expect(prismaClient.franchises.findMany).toHaveBeenCalled()
      expect(err?.message).toBe('Error on find franchises.')
    })
  })
})
