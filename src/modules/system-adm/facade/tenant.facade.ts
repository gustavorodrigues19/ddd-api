import UseCaseInterface from '../../@shared/usecase/use-case.interface'
import {
  CreateTenantInputDto,
  TenantFacadeInterface,
  TenantOutputDto,
  UpdateTenantInputDto,
} from './facade.interface'

export default class TenantFacade implements TenantFacadeInterface {
  constructor(
    private findTenantsUseCase: UseCaseInterface,
    private createTenantUseCase: UseCaseInterface,
    private updateTenantUseCase: UseCaseInterface,
    private findTenantUseCase: UseCaseInterface
  ) {}

  async findTenants(): Promise<TenantOutputDto[]> {
    return this.findTenantsUseCase.execute()
  }

  async createTenant(input: CreateTenantInputDto): Promise<TenantOutputDto> {
    return this.createTenantUseCase.execute(input)
  }

  async updateTenant(input: UpdateTenantInputDto): Promise<TenantOutputDto> {
    return this.updateTenantUseCase.execute(input)
  }

  async findTenant(id: string): Promise<TenantOutputDto> {
    return this.findTenantUseCase.execute(id)
  }
}
