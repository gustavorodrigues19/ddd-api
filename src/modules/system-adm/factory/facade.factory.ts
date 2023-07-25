import { PrismaClient } from '@prisma/client'
import { SystemAdminInterface } from '../facade/facade.interface'
import SystemAdminFacade from '../facade/system-adm.facade'
import PlansRepository from '../repository/plan.repository'
import TenantsRepository from '../repository/tenant.repository'
import AddTenantUseCase from '../usecases/add-tenant/add-tenant.usecase'
import FindTenantUseCase from '../usecases/find-tenant/find-tenant.usecase'
import FindTenantsUseCase from '../usecases/find-tenants/find-tenants.usecase'
import UpdateTenantUseCase from '../usecases/update-tenant/update-tenant.usecase'

export default class SystemAdminFactory {
  static create(): SystemAdminInterface {
    const prismaClient = new PrismaClient()
    const tenantRepository = new TenantsRepository(prismaClient)
    const planRepository = new PlansRepository(prismaClient)

    const findTenantsUseCase = new FindTenantsUseCase(tenantRepository)
    const addTenantUseCase = new AddTenantUseCase(tenantRepository, planRepository)
    const updateTenantUseCase = new UpdateTenantUseCase(tenantRepository, planRepository)
    const findTenantUseCase = new FindTenantUseCase(tenantRepository)

    return new SystemAdminFacade(
      findTenantsUseCase,
      addTenantUseCase,
      updateTenantUseCase,
      findTenantUseCase
    )
  }
}
