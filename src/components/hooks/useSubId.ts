import { format, subMonths } from 'date-fns'
import { useEffect, useState } from 'react'

export type LocalSubId = {
  subId: string
  setLocalSubId: SetLocalSubId
}

type GetLocalSubId = (id: string) => string | undefined

const getLocalSubId: GetLocalSubId = (id) => {
  const localSubId = localStorage.getItem(`KYONOMO_STORE:${id}:subId`)
  return localSubId != null ? JSON.parse(localSubId).subId : undefined
}

type SetLocalSubId = (id: string, subId: string) => void

const setLocalSubId: SetLocalSubId = (id, subId) => {
  const date = format(new Date(), 'yyyyMMddHHmmss')
  localStorage.setItem(`KYONOMO_STORE:${id}:subId`, JSON.stringify({ subId, date }))
}

type CleanLocalSubId = () => void

// １ヶ月経過したlocalStrageは削除する
const cleanLocalSubId: CleanLocalSubId = () => {
  const lastDate = format(subMonths(new Date(), 1), 'yyyyMMddHHmmss')
  Object.keys(localStorage).map((key) => {
    if (JSON.parse(localStorage.getItem(key)).date <= lastDate) localStorage.removeItem(key)
  })
}

type UseLocalSubId = (id: string) => LocalSubId

export const useLocalSubId: UseLocalSubId = (id) => {
  const initialState = {
    subId: '',
    setLocalSubId: () => null,
  }
  const [state, setState] = useState<LocalSubId | undefined>(initialState)

  useEffect(() => {
    cleanLocalSubId()
    const subId = getLocalSubId(id)

    setState({ subId, setLocalSubId })
  }, [id])

  return {
    subId: state.subId,
    setLocalSubId: state.setLocalSubId,
  }
}
