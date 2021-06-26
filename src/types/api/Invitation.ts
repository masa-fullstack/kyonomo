import { ApiCommonValue } from './Common'

export type Invitation = {
  id: string
  mail: string
  lineId: string
  limitDate: string
  limitTime: string
  text: string
} & ApiCommonValue
