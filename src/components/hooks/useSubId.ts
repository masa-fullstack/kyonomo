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
  const updatedLocalSubIds = localSubIds.map((e) => {
    e.id === localSubId.id ? localSubId : e
  })
  localStorage.setItem('localSubIds', JSON.stringify(updatedLocalSubIds))
}

export const useLocalSubId = (id: string) => {
  const [localSubIds] = useState<LocalSubId[] | undefined>(getLocalSubIds())
  const localSubId = localSubIds === undefined ? undefined : localSubIds.filter((localSubId) => localSubId.id === id)[0]

  return {
    localSubId,
    setLocalSubId,
  }
}
