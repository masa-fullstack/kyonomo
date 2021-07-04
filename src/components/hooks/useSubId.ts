import { format, subMonths } from 'date-fns'
import { useState } from 'react'

export type LocalSubId = string

type GetLocalSubId = (id: string) => LocalSubId | undefined

const getLocalSubId: GetLocalSubId = (id) => {
  const localSubId = localStorage.getItem(`KYONOMO_STORE:${id}:subId`)
  return localSubId != null ? JSON.parse(localSubId).subId : undefined
}

type SetLocalSubId = (id: string, localSubId: LocalSubId) => void

const setLocalSubId: SetLocalSubId = (id, subId) => {
  const date = format(new Date(), 'yyyyMMddHHmmss')
  localStorage.setItem(`KYONOMO_STORE:${id}:subId`, JSON.stringify({ subId, date }))
}

type CleanLocalSubId = () => void

// 前月のlocalStrageは削除する
const cleanLocalSubId: CleanLocalSubId = () => {
  const date = format(subMonths(new Date(), 1), 'yyyyMMddHHmmss')
  Object.keys(localStorage).map((key) => {
    if (JSON.parse(localStorage.getItem(key)).date <= date) localStorage.removeItem(key)
  })
}

export const useLocalSubId = (id: string) => {
  cleanLocalSubId()
  const [localSubId] = useState<LocalSubId | undefined>(getLocalSubId(id))

  return {
    localSubId,
    setLocalSubId,
  }
}
