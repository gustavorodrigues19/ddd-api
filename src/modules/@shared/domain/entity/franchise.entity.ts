import AddressValueObject from '../value-object/address.value-object'
import FranchiseBrandValueObject from '../value-object/franchise-brand.value-object'
import Id from '../value-object/id.value-object'
import AggregateRoot from './aggregate-root.interface'
import BaseEntity from './base.entity'
import Tenant from './tenant.entity'

type FranchiseProps = {
  id?: Id
  name: string
  email: string
  phone: string
  document: string
  isActive?: boolean
  tenant: Tenant
  brand: FranchiseBrandValueObject
  address: AddressValueObject
  createdAt?: Date
  updatedAt?: Date
}

export default class Franchise extends BaseEntity implements AggregateRoot {
  private _name: string
  private _email: string
  private _phone: string
  private _document: string
  private _tenant: Tenant
  private _brand: FranchiseBrandValueObject
  private _address: AddressValueObject
  private _isActive?: boolean

  constructor(props: FranchiseProps) {
    super(props.id, props.createdAt, props.updatedAt)
    this._name = props.name
    this._document = props.document
    this._email = props.email
    this._phone = props.phone
    this._isActive = props.isActive
    this._tenant = props.tenant
    this._brand = props.brand
    this._address = props.address
  }

  activate() {
    this._isActive = true
  }

  deactivate() {
    this._isActive = false
  }

  get name() {
    return this._name
  }

  get email() {
    return this._email
  }

  get phone() {
    return this._phone
  }

  get document() {
    return this._document
  }

  get isActive() {
    return this._isActive
  }

  get tenant() {
    return this._tenant
  }

  get brand() {
    return this._brand
  }

  get address() {
    return this._address
  }
}
