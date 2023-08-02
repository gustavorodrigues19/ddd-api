import { FastifyInstance } from 'fastify/types/instance'
import { FastifyPluginAsync } from 'fastify/types/plugin'
import fp from 'fastify-plugin'
import SystemAdminFactory from '../../../modules/system-adm/factory/facade.factory'
import { CreateTenantInput, ParamsGetTenantById, UpdateTenantInput } from './tenants.interface'
import { PutTenantSchema } from './tenants.schems'

const TenantRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.get('/tenants', async (req, reply) => {
    try {
      const systemAdmFactory = SystemAdminFactory.create()
      const tenants = await systemAdmFactory.findTenants()

      return await reply.status(200).send(tenants)
    } catch (error) {
      return await reply.status(500).send(error)
    }
  })

  server.get('/tenants/:id', async (req, reply) => {
    try {
      const { id } = req.params as ParamsGetTenantById

      const systemAdmFactory = SystemAdminFactory.create()
      const tenant = await systemAdmFactory.findTenant(id)

      return await reply.status(200).send(tenant)
    } catch (error) {
      return await reply.status(500).send(error)
    }
  })

  server.post('/tenants', async (req, reply) => {
    try {
      const { name, document, domain, planId, isActive } = req.body as CreateTenantInput

      const createTenantInput: CreateTenantInput = {
        name,
        document,
        domain,
        planId,
        isActive,
      }

      const systemAdmFactory = SystemAdminFactory.create()
      const tenant = await systemAdmFactory.createTenant(createTenantInput)

      return await reply.status(200).send(tenant)
    } catch (error) {
      return await reply.status(500).send(error)
    }
  })

  server.put('/tenants/:id', PutTenantSchema, async (req, reply) => {
    try {
      const { id } = req.params as ParamsGetTenantById
      const { name, document, domain, planId, isActive } = req.body as CreateTenantInput

      const updateTenantInput: UpdateTenantInput = {
        id,
        name,
        document,
        domain,
        planId,
        isActive,
      }

      const systemAdmFactory = SystemAdminFactory.create()
      const tenant = await systemAdmFactory.updateTenant(updateTenantInput)

      return await reply.status(200).send(tenant)
    } catch (error) {
      return await reply.status(500).send(error)
    }
  })
}

export default fp(TenantRoutes)
