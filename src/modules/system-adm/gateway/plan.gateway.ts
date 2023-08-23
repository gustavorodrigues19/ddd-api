import Plan from '../../@shared/domain/entity/plan.entity'

export default interface PlanGateway {
  findById(id: string): Promise<Plan | null>
}
