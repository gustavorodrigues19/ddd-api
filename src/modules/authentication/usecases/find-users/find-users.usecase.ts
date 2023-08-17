import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import UserGateway from '../../gateway/user.gateway'
import { FindUsersOutputDto } from './find-users.usecase.dto'

export default class FindUsersUseCase implements UseCaseInterface {
  private _userRepository: UserGateway

  constructor(userRepository: UserGateway) {
    this._userRepository = userRepository
  }

  async execute(skip: number): Promise<FindUsersOutputDto> {
    const users = await this._userRepository.find(skip, 100)

    const total = users.total
    const data = users.data.map((user) => ({
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
    }))

    return {
      data,
      total,
      skip,
      take: 100,
    }
  }
}
