import { ApiCommonValue } from './Common'

export type Invitation = {
  id: string
  token: string
  lineId: string
  limitDate: string
  limitTime: string
  subject: string
  place: string
  time: string
  text: string
} & ApiCommonValue
