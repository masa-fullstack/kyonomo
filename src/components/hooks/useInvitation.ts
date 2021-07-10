import { useEffect, useState } from 'react'

const MAX_HISTORY_COUNT = 10

export type InvitationInfo = {
  subject: string
  place: string
  time: string
  text: string
}

export type LocalInvitation = {
  subject: string[]
  place: string[]
  time: string[]
  text: string[]
}

type ReturnUseInvitations = {
  localInvitations: LocalInvitation | undefined
  setLocalInvitation: SetLocalInvitation
}

type GetInvitations = () => LocalInvitation | undefined

const getInvitations: GetInvitations = () => {
  const localInvitations = localStorage.getItem(`KYONOMO_STORE:invitation`)
  return localInvitations != null ? JSON.parse(localInvitations) : undefined
}

type AddToArray = <T>(array: T[], value: T) => T[]

const addToArray: AddToArray = (array, value) => {
  // 新規の場合は追加してリターン
  if (!array) return [value]
  // 重複している場合は追加せずリターン
  if (array.includes(value)) return array

  //最大件数以上の場合、最大件数-1にスライスする
  const slicedArray =
    array.length > MAX_HISTORY_COUNT - 1 ? array.slice(array.length - MAX_HISTORY_COUNT + 1, MAX_HISTORY_COUNT) : array
  return [...slicedArray, value]
}

type SetLocalInvitation = (invitationInfo: InvitationInfo) => void

const setLocalInvitation: SetLocalInvitation = ({ subject, place, time, text }) => {
  const oldLocalInvitations = getInvitations()
  const newSubject = addToArray(oldLocalInvitations?.subject, subject)
  const newPlace = addToArray(oldLocalInvitations?.place, place)
  const newTime = addToArray(oldLocalInvitations?.time, time)
  const newText = addToArray(oldLocalInvitations?.text, text)

  localStorage.setItem(
    `KYONOMO_STORE:invitation`,
    JSON.stringify({ subject: newSubject, place: newPlace, time: newTime, text: newText })
  )
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
