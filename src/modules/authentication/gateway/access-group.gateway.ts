import AccessGroup from '../domain/access-group.entity'

export interface AccessGroupFindOutputDto {
  data: AccessGroup[]
  total: number
}

export default interface AccessGroupGateway {
  add(accessGroup: AccessGroup): Promise<void>
  update(accessGroup: AccessGroup): Promise<void>
  findById(id: string): Promise<AccessGroup | null>
  find(skip: number, take: number): Promise<AccessGroupFindOutputDto>
}
