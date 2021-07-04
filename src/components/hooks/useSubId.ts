import { useState } from 'react'

export type LocalSubId = string

type GetLocalSubIds = (id: string) => LocalSubId | undefined

const getLocalSubId: GetLocalSubIds = (id) => {
  const localSubId = localStorage.getItem(`KYONOMO_STORE:subId:${id}`)
  return localSubId != null ? JSON.parse(localSubId) : undefined
}

type SetLocalSubId = (id: string, localSubId: LocalSubId) => void

const setLocalSubId: SetLocalSubId = (id, localSubId) => {
  localStorage.setItem(`KYONOMO_STORE:subId:${id}`, JSON.stringify(localSubId))
}

export const useLocalSubId = (id: string) => {
  const [localSubId] = useState<LocalSubId | undefined>(getLocalSubId(id))

  return {
    localSubId,
    setLocalSubId,
  }
}
