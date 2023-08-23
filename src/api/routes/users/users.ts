import { FastifyInstance } from 'fastify/types/instance'
import { FastifyPluginAsync } from 'fastify/types/plugin'
import fp from 'fastify-plugin'
import {
  CreateUserInput,
  ParamsGetUserById,
  QueryGetUsers,
  UpdateUserInput,
} from './users.interface'
import { CreateUserSchema, GetUserSchema, GetUsersSchema, UpdateUserSchema } from './users.schema'
import AuthenticationFactory from '../../../modules/authentication/factory/facade.factory'

const UserRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.get('/users', GetUsersSchema, async (req, reply) => {
    try {
      const authenticationFactory = AuthenticationFactory.create()
      const { skip } = req.query as QueryGetUsers
      const response = await authenticationFactory.findUsers(skip)

      return await reply.status(200).send(response)
    } catch (error) {
      return await reply.status(500).send(error)
    }
  })

  server.get('/users/:id', GetUserSchema, async (req, reply) => {
    try {
      const { id } = req.params as ParamsGetUserById

      const authenticationFactory = AuthenticationFactory.create()
      const tenant = await authenticationFactory.findUser(id)

      return await reply.status(200).send(tenant)
    } catch (error) {
      return await reply.status(500).send(error)
    }
  })

  server.post('/users', CreateUserSchema, async (req, reply) => {
    try {
      const { username, email, password, role, accessGroupId, isActive, tenantId } =
        req.body as CreateUserInput

      const createUserInput: CreateUserInput = {
        username,
        email,
        password,
        role,
        accessGroupId,
        isActive,
        tenantId,
      }

      const authenticationFactory = AuthenticationFactory.create()
      const user = await authenticationFactory.createUser(createUserInput)

      return await reply.status(200).send(user)
    } catch (error) {
      return await reply.status(500).send(error)
    }
  })

  server.put('/users/:id', UpdateUserSchema, async (req, reply) => {
    try {
      const { id } = req.params as ParamsGetUserById
      const { username, email, password, role, accessGroupId, isActive, tenantId } =
        req.body as CreateUserInput

      const updateUserInput: UpdateUserInput = {
        id,
        username,
        email,
        password,
        role,
        accessGroupId,
        isActive,
        tenantId,
      }

      const authenticationFactory = AuthenticationFactory.create()
      const tenant = await authenticationFactory.updateUser(updateUserInput)

      return await reply.status(200).send(tenant)
    } catch (error) {
      return await reply.status(500).send(error)
    }
  })
}

export default fp(UserRoutes)
