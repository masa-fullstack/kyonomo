import { ApiReqHeaders } from '../types/api/Headers'

export const headers: ApiReqHeaders = {
  'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY ?? '',
}
