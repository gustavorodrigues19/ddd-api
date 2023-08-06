interface PermissionsInputDTO {
  actions: string
}

export interface AddAccessGroupUseCaseInputDTO {
  name: string
  description: string
  permissions: PermissionsInputDTO
}

export interface AddAccessGroupUseCaseOutputDTO {
  id: string
  name: string
  description: string
  permissions: string
}
