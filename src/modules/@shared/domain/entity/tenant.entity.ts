import Id from '../value-object/id.value-object'
import AggregateRoot from './aggregate-root.interface'
import BaseEntity from './base.entity'
import Plan from './plan.entity'

type TenantProps = {
  id?: Id
  name: string
  document: string
  domain: string
  plan: Plan
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export default class Tenant extends BaseEntity implements AggregateRoot {
  private _name: string
  private _document: string
  private _domain: string
  private _plan: Plan
  private _isActive: boolean

  constructor(props: TenantProps) {
    super(props.id, props.createdAt, props.updatedAt)
    this._name = props.name
    this._document = props.document
    this._domain = props.domain
    this._plan = props.plan
    this._isActive = props.isActive || true
  }

  activate() {
    this._isActive = true
  }

  get name() {
    return this._name
  }

  get document() {
    return this._document
  }

  get domain() {
    return this._domain
  }

  get isActive() {
    return this._isActive
  }

  get plan() {
    return this._plan
  }

  set plan(plan: Plan) {
    this._plan = plan
  }
}
