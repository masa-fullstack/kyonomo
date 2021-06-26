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
      status: string
      text?: string
      referrer?: string
    }

    resBody: Answer
  }
}
