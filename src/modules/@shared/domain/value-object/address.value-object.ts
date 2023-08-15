import ValueObject from './value-object.interface'

type AddressValueObjectProps = {
  street: string
  houseNumber: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  country: string
  zipCode: string
}

export default class AddressValueObject implements ValueObject {
  private _street: string
  private _houseNumber: string
  private _complement?: string
  private _neighborhood: string
  private _city: string
  private _state: string
  private _country: string
  private _zipCode: string

  constructor(props: AddressValueObjectProps) {
    this._street = props.street
    this._houseNumber = props.houseNumber
    this._complement = props.complement
    this._neighborhood = props.neighborhood
    this._city = props.city
    this._state = props.state
    this._country = props.country
    this._zipCode = props.zipCode
  }

  get street(): string {
    return this._street
  }

  get houseNumber(): string {
    return this._houseNumber
  }

  get complement(): string | undefined {
    return this._complement
  }

  get neighborhood(): string {
    return this._neighborhood
  }

  get city(): string {
    return this._city
  }

  get state(): string {
    return this._state
  }

  get country(): string {
    return this._country
  }

  get zipCode(): string {
    return this._zipCode
  }
}
