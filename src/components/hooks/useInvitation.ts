import { format } from 'date-fns'
import { useEffect, useState } from 'react'

const MAX_HISTORY_COUNT = 10

type InvitationInfo = {
  id: string
  subject: string
  place: string
  time: string
  text: string
}
type LocalStrageInfo = { date: string }
type LocalInvitation = InvitationInfo & LocalStrageInfo
type ReturnUseInvitations = {
  localInvitations: LocalInvitation[] | undefined
  setLocalInvitation: SetLocalInvitation
}

type GetInvitations = () => LocalInvitation[] | undefined

const getInvitations: GetInvitations = () => {
  const localInvitations = localStorage.getItem(`KYONOMO_STORE:invitation`)
  return localInvitations != null ? JSON.parse(localInvitations) : undefined
}

type SetLocalInvitation = (invitationInfo: InvitationInfo) => void

const setLocalInvitation: SetLocalInvitation = ({ id, subject, place, time, text }) => {
  const date = format(new Date(), 'yyyyMMddHHmmss')
  const oldLocalInvitations = getInvitations()
  // 取得できなければフィルター処理はしない
  if (!oldLocalInvitations) {
    localStorage.setItem(`KYONOMO_STORE:invitation`, JSON.stringify([{ id, subject, place, time, text, date }]))
  } else {
    // 同一の入力は過去のものは省く（最新のものが追加される）
    const filteredLocalInvitations = oldLocalInvitations.filter((invitation) => {
      if (
        invitation.subject !== subject ||
        invitation.place !== place ||
        invitation.time !== time ||
        invitation.text !== text
      ) {
        return true
      } else {
        return false
      }
    })
    //最大件数以上の場合、最大件数-1にスライスする
    const slicedLocalInvitations =
      filteredLocalInvitations.length > MAX_HISTORY_COUNT - 1
        ? filteredLocalInvitations.slice(filteredLocalInvitations.length - MAX_HISTORY_COUNT + 1, MAX_HISTORY_COUNT)
        : filteredLocalInvitations

    localStorage.setItem(
      `KYONOMO_STORE:invitation`,
      JSON.stringify([...slicedLocalInvitations, { id, subject, place, time, text, date }])
    )
  }
}

type UseInvitation = () => ReturnUseInvitations

export const useInvitation: UseInvitation = () => {
  const initialState = {
    localInvitations: undefined,
    setLocalInvitation: () => null,
  }
  const [state, setState] = useState<ReturnUseInvitations>(initialState)

  useEffect(() => {
    const localInvitations = getInvitations()

    setState({ localInvitations, setLocalInvitation })
  }, [])

  return {
    localInvitations: state.localInvitations,
    setLocalInvitation: state.setLocalInvitation,
  }
}
