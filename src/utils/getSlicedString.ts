type GetSlicedString = (str: string, sliceEndPosition: number) => string

export const getSlicedString: GetSlicedString = (str, sliceEndPosition) => {
  const isSlice = str.length > sliceEndPosition
  return isSlice ? str.slice(0, sliceEndPosition) + '…' : str
}
