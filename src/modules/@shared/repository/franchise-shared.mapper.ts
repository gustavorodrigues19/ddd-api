import Id from '../domain/value-object/id.value-object'
import Tenant from '../domain/entity/tenant.entity'
import Franchise from '../domain/entity/franchise.entity'
import Plan from '../domain/entity/plan.entity'
import FranchiseBrandValueObject from '../domain/value-object/franchise-brand.value-object'
import AddressValueObject from '../domain/value-object/address.value-object'

export default class FranchiseMapper {
  static toDomain(input: any): Franchise {
    const tenant = new Tenant({
      id: new Id(input.tenant.id),
      name: input.tenant.name,
      domain: input.tenant.domain,
      document: input.tenant.document,
      plan: new Plan({
        id: new Id(input.tenant.plan.id),
        name: input.tenant.plan.name,
        description: input.tenant.plan.description,
        price: input.tenant.plan.price,
        createdAt: input.tenant.plan.createdAt,
        updatedAt: input.tenant.plan.updatedAt,
      }),
      isActive: input.tenant.isActive,
      createdAt: input.tenant.createdAt,
      updatedAt: input.tenant.updatedAt,
    })

    const brand = new FranchiseBrandValueObject({
      color: input.brand.color,
      logo_url: input.brand?.logo_url,
    })

    const address = new AddressValueObject({
      street: input.address.street,
      houseNumber: input.address.houseNumber,
      neighborhood: input.address.neighborhood,
      complement: input.address?.complement || '',
      city: input.address.city,
      state: input.address.state,
      country: input.address.country,
      zipCode: input.address.zipCode,
    })

    const franchise = new Franchise({
      id: new Id(input.id),
      name: input.name,
      document: input.document,
      email: input.email,
      phone: input.phone,
      brand,
      tenant,
      address,
      isActive: input.isActive,
    })

    return franchise
  }
}
