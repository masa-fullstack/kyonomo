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
      mail?: string
      lineId?: string
      limitDate: string
      limitTime: string
      text?: string
    }

    resBody: Invitation
  }
}
