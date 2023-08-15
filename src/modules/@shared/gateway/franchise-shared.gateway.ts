import Franchise from '../domain/entity/franchise.entity'

export default interface FranchiseGatewayShared {
  findById(id: string): Promise<Franchise | null>
  findByTenantId(id: string): Promise<Franchise[]>
}
