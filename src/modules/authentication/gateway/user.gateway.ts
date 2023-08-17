import User from '../domain/user.entity'

export interface UserFindOutputDto {
  data: User[]
  total: number
}
export default interface UserGateway {
  add(user: User): Promise<void>
  update(user: User): Promise<void>
  findById(id: string): Promise<User | null>
  findByEmailOrUsername(email?: string, username?: string): Promise<User[]>
  find(skip: number, take: number): Promise<UserFindOutputDto>
}
