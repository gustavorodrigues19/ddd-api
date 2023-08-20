import BaseEntity from '../../@shared/domain/entity/base.entity'
import AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface'
import Id from '../../@shared/domain/value-object/id.value-object'
import AccessGroup from './access-group.entity'
import Tenant from '../../@shared/domain/entity/tenant.entity'
import { RoleKeys } from '../../@shared/interfaces'
import Franchise from '../../@shared/domain/entity/franchise.entity'

type UserProps = {
  id?: Id
  email: string
  username: string
  role: RoleKeys
  password: string
  isActive?: boolean
  tenant: Tenant
  accessGroup?: AccessGroup
  franchises?: Franchise[]
  createdAt?: Date
  updatedAt?: Date
}

export default class User extends BaseEntity implements AggregateRoot {
  private _email: string
  private _username: string
  private _password: string
  private _role: RoleKeys
  private _isActive: boolean
  private _tenant: Tenant
  private _franchises?: Franchise[]
  private _accessGroup?: AccessGroup

  constructor(props: UserProps) {
    super(props.id, props.createdAt, props.updatedAt)
    this._email = props.email
    this._username = props.username
    this._password = props.password
    this._isActive = props.isActive || true
    this._role = props.role
    this._tenant = props.tenant
    this._accessGroup = props.accessGroup
    this._franchises = props.franchises
  }

  get username() {
    return this._username
  }

  get email() {
    return this._email
  }

  get password() {
    return this._password
  }

  get role() {
    return this._role
  }

  get isActive() {
    return this._isActive
  }

  get accessGroup() {
    return this._accessGroup
  }

  get tenant() {
    return this._tenant
  }

  get franchises() {
    return this._franchises
  }

  activate() {
    this._isActive = true
  }
}
