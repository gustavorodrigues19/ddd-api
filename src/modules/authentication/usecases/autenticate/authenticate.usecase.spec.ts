/* eslint-disable @typescript-eslint/dot-notation */
import User from '../../../authentication/domain/user.entity'
import {
  mockUserEntity,
  mockUserFranchiseEntity,
  mockUserOrganizationEntity,
} from '../../../../__mocks__/authentication.mock'
import AuthenticateUseCase from './authenticate.usecase'
import jwt from 'jsonwebtoken'

const MockUserRepository = (userEntity?: User) => ({
  delete: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  findByEmailOrUsername: userEntity ? jest.fn(() => Promise.resolve([userEntity])) : jest.fn(),
  find: jest.fn(),
  add: jest.fn(),
})

const passwordEncoded = 'MTIzNDU2'
const input = {
  email: 'user@email.com',
  username: '999999999',
  password: passwordEncoded,
}

describe('Authenticate use case', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })
  afterAll(() => {
    process.env = OLD_ENV
  })
  it('should authenticate a user successfully - MASTER ADMIN', async () => {
    //@ts-expect-error - no params in constructor
    const authenticateUseCase = new AuthenticateUseCase()
    authenticateUseCase['_userRepository'] = MockUserRepository(mockUserEntity)
    process.env.SECRET_KEY = 'secret'

    const result = await authenticateUseCase.execute(input)
    expect(result).toBeDefined()

    const tokenDecoded: any = jwt.decode(result)

    expect(tokenDecoded.data).toHaveProperty('system')
    expect(tokenDecoded.data).toHaveProperty('business')
    expect(tokenDecoded.data).toHaveProperty('academy')
    expect(tokenDecoded.data).toHaveProperty('financial')
    expect(tokenDecoded.data).toHaveProperty('technical')
    expect(tokenDecoded.data.system).toEqual(['tenants:*:*', 'plans:*:*'])
    expect(tokenDecoded.data.business).toEqual(['franchises:*:*'])
  })

  it('should authenticate a user successfully - ORGANIZATION ADMIN', async () => {
    //@ts-expect-error - no params in constructor
    const authenticateUseCase = new AuthenticateUseCase()
    authenticateUseCase['_userRepository'] = MockUserRepository(mockUserOrganizationEntity)
    process.env.SECRET_KEY = 'secret'

    const result = await authenticateUseCase.execute(input)
    expect(result).toBeDefined()

    const tokenDecoded: any = jwt.decode(result)

    expect(tokenDecoded.data).toHaveProperty('system')
    expect(tokenDecoded.data).toHaveProperty('business')
    expect(tokenDecoded.data).toHaveProperty('academy')
    expect(tokenDecoded.data).toHaveProperty('financial')
    expect(tokenDecoded.data).toHaveProperty('technical')
    expect(tokenDecoded.data.system).toEqual(['tenants:view,edit:1', 'plans:view:*'])
    expect(tokenDecoded.data.business).toEqual(['franchises:*:1,2'])
  })

  it('should authenticate a user successfully - FRANCHISE ADMIN', async () => {
    //@ts-expect-error - no params in constructor
    const authenticateUseCase = new AuthenticateUseCase()
    authenticateUseCase['_userRepository'] = MockUserRepository(mockUserFranchiseEntity)
    process.env.SECRET_KEY = 'secret'

    const result = await authenticateUseCase.execute(input)
    expect(result).toBeDefined()

    const tokenDecoded: any = jwt.decode(result)

    expect(tokenDecoded.data).toHaveProperty('system')
    expect(tokenDecoded.data).toHaveProperty('business')
    expect(tokenDecoded.data).toHaveProperty('academy')
    expect(tokenDecoded.data).toHaveProperty('financial')
    expect(tokenDecoded.data).toHaveProperty('technical')
    expect(tokenDecoded.data.system).toEqual(['tenants:view:1'])
    expect(tokenDecoded.data.business).toEqual(['franchises:view,edit:1'])
  })

  it('should not find an user', async () => {
    //@ts-expect-error - no params in constructor
    const authenticateUseCase = new AuthenticateUseCase()
    authenticateUseCase['_userRepository'] = MockUserRepository()
    process.env.SECRET_KEY = 'secret'

    await authenticateUseCase.execute(input).catch((err) => {
      expect(err.message).toBe('User not found')
    })
  })

  it('should not find a secret key', async () => {
    //@ts-expect-error - no params in constructor
    const authenticateUseCase = new AuthenticateUseCase()
    authenticateUseCase['_userRepository'] = MockUserRepository(mockUserEntity)
    process.env.SECRET_KEY = undefined

    await authenticateUseCase.execute(input).catch((err) => {
      expect(err.message).toBe('Secret key not found')
    })
  })

  it('should pass invalid credentials', async () => {
    //@ts-expect-error - no params in constructor
    const authenticateUseCase = new AuthenticateUseCase()
    authenticateUseCase['_userRepository'] = MockUserRepository(mockUserEntity)
    process.env.SECRET_KEY = 'secret'

    await authenticateUseCase.execute({ ...input, password: 'bla' }).catch((err) => {
      expect(err.message).toBe('Invalid credentials')
    })
  })
})
