import Joi from 'joi'
import Id from '../../../@shared/domain/value-object/id.value-object'
import User from '../../domain/user.entity'
import UserGateway from '../../gateway/user.gateway'
import { UserInputDto, UserOutputDto } from './add-user.usecase.dto'

export default class AddUserUseCase {
  private _userRepository: UserGateway

  constructor(userRepository: UserGateway) {
    this._userRepository = userRepository
  }

  validate(input: UserInputDto): Joi.ValidationResult {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      document: Joi.string().required(),
      role: Joi.string().required(),
      franchisesIds: Joi.array().items(Joi.string()).required(),
      accessGroupId: Joi.string().required(),
      isActive: Joi.boolean().required(),
      tenantId: Joi.string().required(),
    })

    return schema.validate(input)
  }

  async execute(input: UserInputDto): Promise<UserOutputDto> {
    const validation = this.validate(input)
    console.log(validation)
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
