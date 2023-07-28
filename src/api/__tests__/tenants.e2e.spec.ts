import { mockPlan, mockTenant } from '../__mocks__/system-adm.mock'
import app from '../main'

const responseObj = {
  tenants: [mockTenant],
  total: 0,
  offset: 0,
  pageSize: 200,
}

const bodyInput = {
  name: 'tenant',
  document: '123456789',
  domain: 'tenant.com',
  planId: '1',
  isActive: true,
}

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    tenants: {
      create: jest.fn(() => mockTenant),
      update: jest.fn(() => mockTenant),
      findMany: jest.fn(() => [mockTenant]),
      findUnique: jest.fn(() => mockTenant),
    },
    plans: {
      findUnique: jest.fn(() => mockPlan),
    },
  })),
}))

describe('E2E test for tenants', () => {
  afterAll(() => {
    app.close()
  })

  it('should query tenants', async () => {
    const response = await app.inject({ method: 'GET', url: '/tenants' })

    expect(response.json()).toEqual(responseObj)
    expect(response.statusCode).toBe(200)
  })

  it('should query a tenant by id', async () => {
    const response = await app.inject({ method: 'GET', url: '/tenants/1' })

    expect(response.json()).toEqual(mockTenant)
    expect(response.statusCode).toBe(200)
  })

  it('should update a tenant', async () => {
    const response = await app.inject({ method: 'PUT', url: '/tenants/1', body: bodyInput })

    expect(response.json()).toEqual(mockTenant)
    expect(response.statusCode).toBe(200)
  })
})