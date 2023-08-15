import ValueObject from './value-object.interface'

type FranchiseBrandValueObjectProps = {
  logo_url?: string
  color: string
}

export default class FranchiseBrandValueObject implements ValueObject {
  private _logo_url?: string
  private _color: string

  constructor(props: FranchiseBrandValueObjectProps) {
    this._logo_url = props.logo_url
    this._color = props.color
  }

  get logo_url(): string | undefined {
    return this._logo_url
  }

  get color(): string {
    return this._color
  }
}
