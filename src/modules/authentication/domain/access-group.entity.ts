import Id from '../../@shared/domain/value-object/id.value-object'
import AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface'
import BaseEntity from '../../@shared/domain/entity/base.entity'
import Tenant from '../../@shared/domain/entity/tenant.entity'

interface AccessGroupProps {
  id?: Id
  name: string
  description: string
  permissions: string
  tenant: Tenant
  createdAt?: Date
  updatedAt?: Date
}

export default class AccessGroup extends BaseEntity implements AggregateRoot {
  private _name: string
  private _description: string
  private _permissions: string
  private _tenant: Tenant

  constructor(props: AccessGroupProps) {
    super(props.id, props.createdAt, props.updatedAt)
    this._name = props.name
    this._description = props.description
    this._permissions = props.permissions
    this._tenant = props.tenant
  }

  get name() {
    return this._name
  }

  get description() {
    return this._description
  }

  get permissions() {
    return this._permissions
  }

  get tenant() {
    return this._tenant
  }
}
