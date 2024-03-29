import UseCaseInterface from '../../@shared/usecase/use-case.interface'
import {
  AuthenticationFacadeInterface,
  AuthenticationInputDto,
  CreateUserInputDto,
  UpdateUserInputDto,
  UserOutputDto,
  UsersOutputDto,
} from './facade.interface'

export default class AuthenticationFacade implements AuthenticationFacadeInterface {
  private _findUsersUseCase: UseCaseInterface
  private _findUserUseCase: UseCaseInterface
  private _createUserUseCase: UseCaseInterface
  private _updateUserUseCase: UseCaseInterface
  private _deleteUserUseCase: UseCaseInterface
  private _authenticationUseCase: UseCaseInterface

  constructor(
    findUsersUseCase: UseCaseInterface,
    findUserUseCase: UseCaseInterface,
    createUserUseCase: UseCaseInterface,
    updateUserUseCase: UseCaseInterface,
    deleteUserUseCase: UseCaseInterface,
    authenticationUseCase: UseCaseInterface
  ) {
    this._findUsersUseCase = findUsersUseCase
    this._findUserUseCase = findUserUseCase
    this._createUserUseCase = createUserUseCase
    this._updateUserUseCase = updateUserUseCase
    this._deleteUserUseCase = deleteUserUseCase
    this._authenticationUseCase = authenticationUseCase
  }

  async findUsers(skip: number): Promise<UsersOutputDto> {
    return this._findUsersUseCase.execute(skip)
  }

  async findUser(id: string): Promise<UserOutputDto> {
    return this._findUserUseCase.execute(id)
  }

  async createUser(input: CreateUserInputDto): Promise<UserOutputDto> {
    return this._createUserUseCase.execute(input)
  }

  async updateUser(input: UpdateUserInputDto): Promise<UserOutputDto> {
    return this._updateUserUseCase.execute(input)
  }

  async deleteUser(id: string): Promise<UserOutputDto> {
    return this._deleteUserUseCase.execute(id)
  }

  async authenticate(input: AuthenticationInputDto): Promise<string> {
    return this._authenticationUseCase.execute(input)
  }
}
