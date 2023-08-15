export const ROLES = {
  MASTER_ADMIN: 'MASTER_ADMIN',
  ORGANIZATION_ADMIN: 'ORGANIZATION_ADMIN',
  FRANCHISE_ADMIN: 'FRANCHISE_ADMIN',
  COACH_ADMIN: 'COACH_ADMIN',
  CLIENT_ADMIN: 'CLIENT_ADMIN',
  FINANCE_ADMIN: 'FINANCE_ADMIN',
  ATHLETE_ADMIN: 'ATHLETE_ADMIN',
  CUSTOM_ADMIN: 'CUSTOM_ADMIN',
} as const

export type RoleKeys = (typeof ROLES)[keyof typeof ROLES]

export interface SystemResourcesProps {
  system: {
    tenants: string
    plans?: string
  }
  business?: {
    franchises?: string
    administrators?: string
    coaches?: string
  }
  academy?: {
    athletes?: string
    teams?: string
    sport_categories?: string
    experimental_trainings?: string
    medical_terms?: string
  }
  financial?: {
    clients?: string
    subscriptions?: string
    charges?: string
    plans?: string
  }
  technical?: {
    report_models?: string
    performance_reports?: string
    attendance_list?: string
  }
}
