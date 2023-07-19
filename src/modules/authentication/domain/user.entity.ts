import BaseEntity from '../../@shared/domain/entity/base.entity'
import AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface'
import Id from '../../@shared/domain/value-object/id.value-object'

type UserProps = {
  id?: Id
  name: string
  email: string
  password: string
  document: string
  role: string
  franchisesIds: string[]
  accessGroupId: string
  isActive: boolean
  tenantId: string
  createdAt?: Date
  updatedAt?: Date
}

export default class User extends BaseEntity implements AggregateRoot {
  private _name: string
  private _email: string
  private _document: string
  private _role: string
  private _password: string
  private _isActive: boolean
  private _franchisesIds: string[]
  private _tenantId: string
  private _accessGroupId: string

  constructor(props: UserProps) {
    super(props.id, props.createdAt, props.updatedAt)
    this._name = props.name
    this._email = props.email
    this._password = props.password
    this._document = props.document
    this._role = props.role
    this._franchisesIds = props.franchisesIds
    this._isActive = props.isActive
    this._accessGroupId = props.accessGroupId
    this._tenantId = props.tenantId
  }

  get name() {
    return this._name
  }

  get email() {
    return this._email
  }

  get password() {
    return this._password
  }

  get document() {
    return this._document
  }

  get role() {
    return this._role
  }

  get franchisesIds() {
    return this._franchisesIds
  }

  get tenantId() {
    return this._tenantId
  }

  get accessGroupId() {
    return this._accessGroupId
  }

  get isActive() {
    return this._isActive
  }
}
