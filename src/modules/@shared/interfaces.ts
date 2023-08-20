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
  system: string[]
  business: string[]
  academy: string[]
  financial: string[]
  technical: string[]
}
