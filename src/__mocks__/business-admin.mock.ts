import Id from '../modules/@shared/domain/value-object/id.value-object'
import Franchise from '../modules/@shared/domain/entity/franchise.entity'
import AddressValueObject from '../modules/@shared/domain/value-object/address.value-object'
import FranchiseBrandValueObject from '../modules/@shared/domain/value-object/franchise-brand.value-object'
import { mockTenantEntity } from './system-adm.mock'

export const mockFranchiseEntity = new Franchise({
  id: new Id('1'),
  name: 'Franchise 1',
  email: 'examples@email.com',
  phone: '999999999',
  document: '123456789',
  isActive: true,
  tenant: mockTenantEntity,
  brand: new FranchiseBrandValueObject({ color: '#000000', logo_url: 'http://logo.com' }),
  address: new AddressValueObject({
    street: 'Street 1',
    houseNumber: '123',
    city: 'City 1',
    complement: 'Complement 1',
    neighborhood: 'Neighborhood 1',
    state: 'State 1',
    country: 'Country 1',
    zipCode: '12345678',
  }),
})
