import { SystemResourcesProps } from '../modules/@shared/interfaces'
import { isUUID } from './index'
import authPermissions from '../modules/authentication/auth-perms.json'

export const getPermissionsStructure = (resourceName: string) => {
  const resourceSplit = resourceName.split(':')

  const entity = resourceSplit?.[0]
  const actions = resourceSplit?.[1]
  const values = resourceSplit?.[2]

  return { entity, actions, values }
}

export const getResourcesObject = (permissions: SystemResourcesProps) => {
  return Object.values(permissions).reduce((acc, curr) => ({ ...acc, ...curr }), {})
}

export const validatePermissionsStructure = (permissions: SystemResourcesProps) => {
  const resourcesObject = getResourcesObject(permissions)

  for (let key in resourcesObject) {
    const resourceName = resourcesObject[key]
    const { entity, actions, values } = getPermissionsStructure(resourceName)

    if (!entity || !actions || !values) throw new Error('Invalid resources')
    else {
      if (!authPermissions.resources_list.includes(entity))
        throw new Error(`Invalid resource ${entity}`)

      const isActionsValid = actions
        .split(',')
        .some((action: string) => authPermissions.actions_list.includes(action))

      if (!isActionsValid) throw new Error('Invalid action')

      const isValuesValid = values
        .split(',')
        .some((value: string) => isUUID(value) || ['*', '#'].includes(value))

      if (!isValuesValid) throw new Error('Invalid value')
    }
  }
}
