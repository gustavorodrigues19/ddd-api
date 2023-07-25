import UseCaseInterface from '../../@shared/usecase/use-case.interface'
import {
  CreateTenantInputDto,
  SystemAdminInterface,
  TenantOutputDto,
  UpdateTenantInputDto,
} from './facade.interface'

export default class SystemAdminFacade implements SystemAdminInterface {
  constructor(
    private findTenantsUseCase: UseCaseInterface,
    private addTenantUseCase: UseCaseInterface,
    private updateTenantUseCase: UseCaseInterface,
    private findTenantUseCase: UseCaseInterface
  ) {}

  async findTenants(): Promise<TenantOutputDto[]> {
    return this.findTenantsUseCase.execute()
  }

  async createTenant(input: CreateTenantInputDto): Promise<TenantOutputDto> {
    return this.addTenantUseCase.execute(input)
  }

  async updateTenant(input: UpdateTenantInputDto): Promise<TenantOutputDto> {
    return this.updateTenantUseCase.execute(input)
  }

  async findTenant(id: string): Promise<TenantOutputDto> {
    return this.findTenantUseCase.execute(id)
  }
}
