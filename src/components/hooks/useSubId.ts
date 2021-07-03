import { useState } from 'react'

export type LocalSubId = {
  id: string
  subId: string
}

type GetLocalSubId = () => LocalSubId | undefined

const getLocalSubId: GetLocalSubId = () => {
  const localSubId = localStorage.getItem('localSubId')
  return localSubId != null ? JSON.parse(localSubId) : undefined
}

type SetLocalSubId = (localSubId: LocalSubId) => void

const setLocalSubId: SetLocalSubId = (localSubId) => {
  localStorage.setItem('localSubId', JSON.stringify(localSubId))
}

export const useLocalSubId = () => {
  const [localSubId] = useState<LocalSubId | undefined>(getLocalSubId())

  return {
    localSubId,
    setLocalSubId,
  }
}
