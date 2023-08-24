import { FastifyInstance } from 'fastify/types/instance'
import { FastifyPluginAsync } from 'fastify/types/plugin'
import fp from 'fastify-plugin'
import { AuthInput } from './auht.interface'
import { AuthSchema } from './auth.schema'
import AuthenticationFactory from '../../../modules/authentication/factory/facade.factory'

const AuthRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.post('/login', AuthSchema, async (req, reply) => {
    try {
      const { username, password } = req.body as AuthInput

      const authInput: AuthInput = {
        username,
        password,
      }

      const authenticationFactory = AuthenticationFactory.create()
      const token = await authenticationFactory.authenticate(authInput)

      const response = {
        tokenType: 'Bearer',
        accessToken: token,
        expiresIn: 3600,
      }
      return await reply.status(200).send(response)
    } catch (error) {
      return await reply.status(500).send(error)
    }
  })
}

export default fp(AuthRoutes)
