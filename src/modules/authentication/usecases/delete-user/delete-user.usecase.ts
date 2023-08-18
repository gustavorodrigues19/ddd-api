import UserGateway from '../../gateway/user.gateway'
import { UserOutputDto } from './delete-user.usecase.dto'

export default class DeleteUserUseCase {
  private _userRepository: UserGateway

  constructor(userRepository: UserGateway) {
    this._userRepository = userRepository
  }

  async execute(id: string): Promise<UserOutputDto> {
    const user = await this._userRepository.findById(id)
    if (!user) throw new Error('User not found')

    await this._userRepository.delete(id)

    return {
      id: user.id.id,
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      tenant: {
        id: user.tenant.id.id,
        name: user.tenant.name,
      },
      ...(user?.accessGroup && {
        accessGroup: {
          id: user?.accessGroup?.id.id,
          name: user?.accessGroup?.name,
        },
      }),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
