import ValueObject from '../../@shared/domain/value-object/value-object.interface'
import SYSTEM_RESOURCES from '../perms/resources-erp.json'

export default class Resource implements ValueObject {
  private _actions: string

  constructor(actions: string) {
    this._actions = actions
  }

  public equals(other: Resource): boolean {
    return this._actions === other._actions
  }

  /* entity:actions:values
    E.g tenant:*:* franchises:view:123,123
  */
  private verifyActions(actions: string): string {
    const resourcesList: string[] = []
    const systemResources = SYSTEM_RESOURCES.resources
    type KeysSystemResources = keyof typeof SYSTEM_RESOURCES.resources

    Object.keys(systemResources).forEach((moduleName: string) => {
      resourcesList.push(...systemResources[moduleName as KeysSystemResources])
    })

    actions.split(' ').forEach((action: string) => {
      const actionContent: string[] = action.split(':')
      const actionEntity = actionContent?.[0]
      const actionName = actionContent?.[1]
      const actionValues = actionContent?.[2]

      if (!actionEntity || !actionName || !actionValues) {
        if (!resourcesList.includes(actionEntity as KeysSystemResources)) {
          throw new Error(`Invalid resource: ${actionEntity}`)
        }
        if (['*', 'view', 'create', 'edit', 'delete'].includes(actionName)) {
          throw new Error(`Invalid action: ${actionName}`)
        }
      }
    })

    return actions
  }

  get actions() {
    return this.verifyActions(this._actions)
  }
}
