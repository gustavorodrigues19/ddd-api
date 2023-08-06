import BaseEntity from '../../@shared/domain/entity/base.entity'
import AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface'
import bcrypt from 'bcrypt'
import Id from '../../@shared/domain/value-object/id.value-object'
import AccessGroup from './access-group.entity'

type UserProps = {
  id?: Id
  name: string
  email: string
  password: string
  document: string
  tenantId: string
  accessGroup: AccessGroup
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export default class User extends BaseEntity implements AggregateRoot {
  private _name: string
  private _email: string
  private _document: string
  private _password: string
  private _isActive: boolean
  private _tenantId: string
  private _accessGroup: AccessGroup

  constructor(props: UserProps) {
    super(props.id, props.createdAt, props.updatedAt)
    this._name = props.name
    this._email = props.email
    this._password = bcrypt.hashSync(props.password, 10)
    this._document = props.document
    this._isActive = props.isActive || true
    this._tenantId = props.tenantId
    this._accessGroup = props.accessGroup
  }

  activate() {
    this._isActive = true
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

  get tenantId() {
    return this._tenantId
  }

  get accessGroup() {
    return this._accessGroup
  }

  get isActive() {
    return this._isActive
  }
}
