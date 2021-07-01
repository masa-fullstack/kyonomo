import { Answer } from '~/src/types/api/Answer'
import { ApiReqHeaders } from '~/src/types/api/Headers'
import { Invitation } from '~/src/types/api/Invitation'

export type Methods = {
  get: {
    reqHeaders?: ApiReqHeaders
    query: {
      id: Invitation['id']
    }

    resBody: Answer[]
  }
}
