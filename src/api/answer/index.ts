import { Answer } from '~/src/types/api/Answer'
import { ApiReqHeaders } from '~/src/types/api/Headers'

export type Methods = {
  get: {
    reqHeaders?: ApiReqHeaders
    query: {
      id: Answer['id']
    }

    resBody: Answer[]
  }

  post: {
    reqHeaders?: ApiReqHeaders
    reqBody: {
      id: string
      subId: string
      status: string
      text?: string
      token?: string
      lineId?: string
      name?: string
    }

    resBody: Answer
  }
}
