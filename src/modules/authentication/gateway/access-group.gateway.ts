import AccessGroup from '../domain/access-group.entity'

export default interface AccessGroupGateway {
  add(accessGroup: AccessGroup): Promise<void>
  update(accessGroup: AccessGroup): Promise<void>
  findById(id: string): Promise<AccessGroup>
  find(): Promise<AccessGroup[]>
}
