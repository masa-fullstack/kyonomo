import { ApiReqHeaders } from '~/src/types/api/Headers'
import { Invitation } from '~/src/types/api/Invitation'

export type Methods = {
  get: {
    reqHeaders?: ApiReqHeaders
    query: {
      id: Invitation['id']
    }

    resBody: Invitation
  }

  post: {
    reqHeaders?: ApiReqHeaders
    reqBody: {
      token: string
      lineId?: string
      limitDate: string
      limitTime: string
      subject?: string
      place?: string
      time?: string
      text?: string
    }

    resBody: Invitation
  }
}
