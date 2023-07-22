import Id from '../../@shared/domain/value-object/id.value-object'
import AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface'
import BaseEntity from '../../@shared/domain/entity/base.entity'

type PlanProps = {
  id?: Id
  name: string
  description: string
  price: number
  createdAt?: Date
  updatedAt?: Date
}

export default class Plan extends BaseEntity implements AggregateRoot {
  private _name: string
  private _description: string
  private _price: number

  constructor(props: PlanProps) {
    super(props.id, props.createdAt, props.updatedAt)
    this._name = props.name
    this._description = props.description
    this._price = props.price
  }

  get name() {
    return this._name
  }

  get description() {
    return this._description
  }

  get price() {
    return this._price
  }
}
