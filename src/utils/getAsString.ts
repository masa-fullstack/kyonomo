type GetAsString = (value: string | string[]) => string
export const getAsString: GetAsString = (value) => {
  if (Array.isArray(value)) {
    return value[0]
  }

  return value
}
