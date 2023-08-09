export const isUUID = (uuid: string) => {
  const uuidRegex = new RegExp(
    '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
    'i'
  )
  return uuidRegex.test(uuid)
}
