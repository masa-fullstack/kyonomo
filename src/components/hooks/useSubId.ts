import { useState } from 'react'

export type LocalSubId = {
  id: string
  subId: string
}

type GetLocalSubIds = () => LocalSubId[] | undefined

const getLocalSubIds: GetLocalSubIds = () => {
  const localSubIds = localStorage.getItem('localSubIds')
  return localSubIds != null ? JSON.parse(localSubIds) : undefined
}

type SetLocalSubId = (localSubId: LocalSubId) => void

const setLocalSubId: SetLocalSubId = (localSubId) => {
  const localSubIds = getLocalSubIds()
  localStorage.setItem('localSubIds', JSON.stringify([...localSubIds, localSubId]))
}

export const useLocalSubId = (id: string) => {
  const [localSubIds] = useState<LocalSubId[] | undefined>(getLocalSubIds())
  const localSubId = localSubIds ? localSubIds.filter((localSubId) => localSubId.id === id)[0] : undefined

  return {
    localSubId,
    setLocalSubId,
  }
}
