import { Answer } from './Answer'
import { Invitation } from './Invitation'

export type InvitationGetQuery = {
  id: Invitation['id']
}

export type AnswerGetQuery = {
  id: Answer['id']
}
