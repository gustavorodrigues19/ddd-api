import 'dotenv/config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserGateway from '../../gateway/user.gateway'
import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import { UserInputDto } from './authenticate.usecase.dto'
import User from '../../domain/user.entity'
import { ROLES, SystemResourcesProps } from '../../../@shared/interfaces'
import authPermissions from '../../auth-perms.json'
import msgpack5 from 'msgpack5'
import { getPermissionsStructure } from 'utils/permissions'

export default class AuthenticateUseCase implements UseCaseInterface {
  private _userRepository: UserGateway

  constructor(userRepository: UserGateway) {
    this._userRepository = userRepository
  }

  private buildToken(user: User): SystemResourcesProps {
    let permissions: SystemResourcesProps
    if (user.role === ROLES.CUSTOM_ADMIN) {
      if (!user?.accessGroup) throw new Error('Resource not found')

      const decodedPermission: SystemResourcesProps = msgpack5().decode(
        user.accessGroup.permissions as any
      )
      permissions = decodedPermission
    } else {
      // eslint-disable-next-line no-unused-vars
      const { CUSTOM_ADMIN, ...defaultRoles } = ROLES

      type DefaultRoleKeys = (typeof defaultRoles)[keyof typeof defaultRoles]
      permissions = authPermissions.perms[user.role as DefaultRoleKeys]
    }

    const permissionsPopulated: SystemResourcesProps = {
      system: [],
      business: [],
      academy: [],
      financial: [],
      technical: [],
    }

    permissions.system.forEach((system: string) => {
      const { entity, actions, values } = getPermissionsStructure(system)

      if (entity === 'tenants' && values === '$') {
        permissionsPopulated.system.push(`${entity}:${actions}:${user.tenant.id.id}`)
      }
      if (entity === 'tenants' && values === '*' && user.role === ROLES.MASTER_ADMIN) {
        permissionsPopulated.system.push(`${entity}:${actions}:*`)
      }
      if (entity === 'plans' && values === '$') {
        permissionsPopulated.system.push(`${entity}:${actions}:${user.tenant.plan.id.id}`)
      }
    })

    if (permissions?.business?.length) {
      permissions?.business?.forEach((business: string) => {
        const { entity, actions, values } = getPermissionsStructure(business)
        const franchisesIds = user.franchises?.map((franchise) => franchise.id.id) ?? []

        if (entity === 'franchises' && values === '#') {
          permissionsPopulated.business.push(`${entity}:${actions}:${franchisesIds.join(',')}`)
        }
        if (entity === 'franchises' && values === '$') {
          permissionsPopulated.business.push(`${entity}:${actions}:${franchisesIds?.[0]}`)
        }
      })
    }

    return permissionsPopulated
  }

  async execute(input: UserInputDto): Promise<string> {
    const user = await this._userRepository.findByEmailOrUsername(input?.email, input?.username)
    if (!user?.length) throw new Error('User not found')

    const passwordDecoded = Buffer.from(input.password, 'ascii').toString('ascii')

    const secret = process.env.SECRET_KEY
    if (!secret) throw new Error('Secret key not found')

    const isMatch = bcrypt.compareSync(user[0].password, passwordDecoded)
    if (!isMatch) throw new Error('Invalid credentials')

    const data = this.buildToken(user[0])
    const token = jwt.sign(data, secret, { expiresIn: '1h' })

    return token
  }
}
