import User from '../domain/user.entity'

export default interface UserGateway {
  add(user: User): Promise<void>
  update(user: User): Promise<void>
  findById(id: string): Promise<User>
  findByEmail(email: string): Promise<User>
  find(): Promise<User[]>
}
