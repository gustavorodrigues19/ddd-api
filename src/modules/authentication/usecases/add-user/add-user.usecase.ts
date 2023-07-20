import Joi from 'joi'
import Id from '../../../@shared/domain/value-object/id.value-object'
import User from '../../domain/user.entity'
import UserGateway from '../../gateway/user.gateway'
import { UserInputDto, UserOutputDto } from './add-user.usecase.dto'
import { REGEX_CPF_CNPJ } from '../../../../utils/regex'

export default class AddUserUseCase {
  private _userRepository: UserGateway

  constructor(userRepository: UserGateway) {
    this._userRepository = userRepository
  }

  validate(input: UserInputDto): void {
    const schema = Joi.object({
      name: Joi.string().min(2).max(45).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(2).required(),
      document: Joi.string().regex(REGEX_CPF_CNPJ).required(),
      role: Joi.string().required(),
      franchisesIds: Joi.array().items(Joi.string()).required(),
      accessGroupId: Joi.string().required(),
      isActive: Joi.boolean().required(),
      tenantId: Joi.string().required(),
    })

    const { error } = schema.validate(input, { abortEarly: false })

    if (error) throw { error: error.details }
  }

  async execute(input: UserInputDto): Promise<UserOutputDto> {
    this.validate(input)
    const props = {
      id: new Id(input.id) || new Id(),
      name: input.name,
      email: input.email,
      password: input.password,
      document: input.document,
      role: input.role,
      franchisesIds: input.franchisesIds,
      accessGroupId: input.accessGroupId,
      isActive: input.isActive,
      tenantId: input.tenantId,
      createdAt: input.createdAt || new Date(),
      updatedAt: input.updatedAt || new Date(),
    }

    const user = new User(props)
    await this._userRepository.add(user)

    return {
      id: user.id.id,
      name: user.name,
      email: user.email,
      document: user.document,
      role: user.role,
      franchisesIds: user.franchisesIds,
      accessGroupId: user.accessGroupId,
      isActive: user.isActive,
      tenantId: user.tenantId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
