import Plan from '../domain/plan.entity'

export default interface PlanGateway {
  findById(id: string): Promise<Plan | null>
}
