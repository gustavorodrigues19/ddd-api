import { PrismaClient } from '@prisma/client'
import { AuthenticationFacadeInterface } from '../facade/facade.interface'
import AuthenticationFacade from '../facade/authentication.facade'
import FindUsersUseCase from '../usecases/find-users/find-users.usecase'
import AddUserUseCase from '../usecases/add-user/add-user.usecase'
import UpdateUserUseCase from '../usecases/update-user/update-user.usecase'
import FindUserUseCase from '../usecases/find-user/find-user.usecase'
import TenantsRepository from '../../@shared/repository/tenant-shared.repository'
import UsersRepository from '../repository/user.repository'
import AccessGroupsRepository from '../repository/access-group.repository'
import DeleteUserUseCase from '../usecases/delete-user/delete-user.usecase'

export default class AuthenticationFactory {
  static create(): AuthenticationFacadeInterface {
    const prismaClient = new PrismaClient()
    const userRepository = new UsersRepository(prismaClient)
    const tenantRepository = new TenantsRepository(prismaClient)
    const accessGroupRepository = new AccessGroupsRepository(prismaClient)

    const findUsersUseCase = new FindUsersUseCase(userRepository)
    const addUserUseCase = new AddUserUseCase(
      userRepository,
      tenantRepository,
      accessGroupRepository
    )
    const updateUserUseCase = new UpdateUserUseCase(
      userRepository,
      tenantRepository,
      accessGroupRepository
    )
    const findUserUseCase = new FindUserUseCase(userRepository)
    const deleteUserUseCase = new DeleteUserUseCase(userRepository)

    return new AuthenticationFacade(
      findUsersUseCase,
      addUserUseCase,
      updateUserUseCase,
      findUserUseCase,
      deleteUserUseCase
    )
  }
}
