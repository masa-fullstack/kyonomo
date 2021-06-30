import { ApiCommonValue } from './Common'

export type Status = 'ok' | 'hm' | 'ng'
export type Answer = {
  id: string
  subId: string
  status: Status
  text: string
  referrer: string
} & ApiCommonValue
