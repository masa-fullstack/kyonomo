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
  // eslint-disable-next-line no-console
  console.log(`セット前localSubIds:${localSubIds}`)

  const updatedLocalSubIds =
    localSubIds === undefined
      ? [localSubId]
      : localSubIds.map((e) => {
          e.id === localSubId.id ? localSubId : e
        })
  // eslint-disable-next-line no-console
  console.log(`更新のやつupdatedLocalSubIds:${updatedLocalSubIds}`)
  localStorage.setItem('localSubIds', JSON.stringify(updatedLocalSubIds))
}

export const useLocalSubId = (id: string) => {
  const [localSubIds] = useState<LocalSubId[] | undefined>(getLocalSubIds())
  // eslint-disable-next-line no-console
  console.log(`最初localSubIds:${localSubIds}`)
  const localSubId = localSubIds === undefined ? undefined : localSubIds.filter((e) => e.id === id)[0]
  // eslint-disable-next-line no-console
  console.log(`最初撮ったlocalSubId:${localSubId}`)

  return {
    localSubId,
    setLocalSubId,
  }
}
