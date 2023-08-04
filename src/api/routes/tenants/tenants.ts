import { FastifyInstance } from 'fastify/types/instance'
import { FastifyPluginAsync } from 'fastify/types/plugin'
import fp from 'fastify-plugin'
import SystemAdminFactory from '../../../modules/system-adm/factory/facade.factory'
import {
  CreateTenantInput,
  ParamsGetTenantById,
  QueryGetTenants,
  UpdateTenantInput,
} from './tenants.interface'
import {
  CreateTenantSchema,
  GetTenantSchema,
  GetTenantsSchema,
  UpdateTenantSchema,
} from './tenants.schema'

const TenantRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.get('/tenants', GetTenantsSchema, async (req, reply) => {
    try {
      const systemAdmFactory = SystemAdminFactory.create()
      const { skip } = req.query as QueryGetTenants
      const response = await systemAdmFactory.findTenants(skip)

      return await reply.status(200).send(response)
    } catch (error) {
      return await reply.status(500).send(error)
    }
  })

  server.get('/tenants/:id', GetTenantSchema, async (req, reply) => {
    try {
      const { id } = req.params as ParamsGetTenantById

      const systemAdmFactory = SystemAdminFactory.create()
      const tenant = await systemAdmFactory.findTenant(id)

      return await reply.status(200).send(tenant)
    } catch (error) {
      return await reply.status(500).send(error)
    }
  })

  server.post('/tenants', CreateTenantSchema, async (req, reply) => {
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

  server.put('/tenants/:id', UpdateTenantSchema, async (req, reply) => {
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
