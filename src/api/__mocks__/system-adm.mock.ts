export const mockPlan = {
  id: '1',
  name: 'basic',
  description: 'Basic plan',
  price: 100,
  createdAt: '2023-07-22T21:31:31.000Z',
  updatedAt: '2023-07-22T21:31:31.000Z',
}

export const mockTenant = {
  id: '1',
  name: 'tenant',
  domain: 'tenant.com',
  document: '123456789',
  isActive: true,
  plan: mockPlan,
  createdAt: '2023-07-22T21:31:31.000Z',
  updatedAt: '2023-07-22T21:31:31.000Z',
}
