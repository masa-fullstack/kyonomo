import { ApiCommonValue } from './Common'

export type Answer = {
  id: string
  subId: string
  status: string
  text: string
  referrer: string
} & ApiCommonValue
