import Id from '../../@shared/domain/value-object/id.value-object'
import AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface'
import BaseEntity from '../../@shared/domain/entity/base.entity'
import Resource from './resource.value-object'

interface AccessGroupProps {
  id?: Id
  name: string
  description: string
  resources: string
  createdAt?: Date
  updatedAt?: Date
}

export default class AccessGroup extends BaseEntity implements AggregateRoot {
  private _name: string
  private _description: string
  private _resources: Resource

  constructor(props: AccessGroupProps) {
    super(props.id, props.createdAt, props.updatedAt)
    this._name = props.name
    this._description = props.description
    this._resources = new Resource(props.resources)
  }

  get name() {
    return this._name
  }

  get description() {
    return this._description
  }

  get resources() {
    return this._resources
  }
}
