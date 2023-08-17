import UserGateway from '../../gateway/user.gateway'
import { UserOutputDto } from './find-user.usecase.dto'

export default class FindUserUseCase {
  private _userRepository: UserGateway

  constructor(userRepository: UserGateway) {
    this._userRepository = userRepository
  }

  async execute(id: string): Promise<UserOutputDto> {
    const user = await this._userRepository.findById(id)

    if (!user) throw new Error('User not found')

    return {
      id: user.id.id,
      email: user.email,
      role: user.role,
      username: user.username,
      isActive: user.isActive,
      tenant: {
        id: user.tenant.id.id,
        name: user.tenant.name,
      },
      ...(user.accessGroup && {
        accessGroup: { id: user.accessGroup.id.id, name: user.accessGroup.name },
      }),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
