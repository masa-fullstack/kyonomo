import useAspidaSWR from '@aspida/swr'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useRef, useState } from 'react'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'
import { v4 as uuidV4 } from 'uuid'

import { Answer, Status } from '~/src/types/api/Answer'
import { apiClient } from '~/src/utils/apiClient'
import { getAsString } from '~/src/utils/getAsString'

import { AnimatedButton } from '../AnimatedButton'
import { Animation } from '../Animation'
import { Loading } from '../Loading'
import { OpacityDisplay } from '../OpacityDisplay'
import { People } from '../People'
import { StaticInput } from '../StaticInput'
import { useLocalSubId } from '../hooks/useSubId'

type ContainerPorps = {
  initialStatus?: Status
  isLiff?: boolean
  closeWindow?: () => void
  token?: string
}

type Props = {
  form: UseFormReturn<FieldValues>
  onSubmit: (data: Answer) => void
  isLoading: boolean
  isAnswered: boolean
  isError: boolean
  id: string
  answers: Answer[]
  isLiff: boolean
} & ContainerPorps

// eslint-disable-next-line react/display-name
const Component = React.forwardRef<HTMLInputElement, Props>(
  ({ form, onSubmit, isLoading, isAnswered, isError, id, answers, isLiff, initialStatus }, ref) =>
    isError ? (
      <div className="h-full flex items-center justify-center">
        <span className="text-xl" role="img" aria-label="エラー">
          有効なお誘いが存在しません。 期限が切れているか、URLが誤っていないかご確認下さい🥺
        </span>
      </div>
    ) : isAnswered ? (
      <div className="h-full flex flex-col items-center justify-center">
        <Animation path="/animes/check.json" loop={false} speed={2} />
        <span className="text-3xl" role="img" aria-label="完了">
          Thank you🙌
        </span>
        {!isLiff && <span className="mt-2 text-lg">下にスワイプ or 右上の × で閉じます</span>}
      </div>
    ) : isLoading ? (
      <div className="h-full flex items-center justify-center">
        <Loading />
      </div>
    ) : (
      <OpacityDisplay>
        <div className={initialStatus === undefined ? '' : 'hidden'}>
          <form name="answerForm" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="hidden">
              <StaticInput id="id" type="text" defaultValue={id} register={form.register('id')} />
            </div>
            <div className="hidden">
              <StaticInput id="status" type="text" register={form.register('status')} />
            </div>
            <div className="hidden">
              <StaticInput id="subId" type="text" register={form.register('subId')} />
            </div>
            <div className="hidden">
              <StaticInput id="referrer" type="text" register={form.register('referrer')} />
            </div>
            {answers.length === 0 && (
              <div className="inline-block px-3 py-1 text-xs bg-gray-800 text-white rounded-lg shadow-lg mb-3">
                回答はまだありません
              </div>
            )}
            <div className="mb-3 w-72">
              <StaticInput
                id="text"
                label="コメントがあれば"
                type="textarea"
                placeholder="例)遅れて21時から参加します"
                defaultValue=""
                register={form.register('text')}
              />
            </div>
            <div className="flex items-center justify-center mt-6 mb-6">
              <AnimatedButton
                label="OK🍻"
                color="blue"
                onClick={() => {
                  form.setValue('status', 'ok')
                }}
                ref={initialStatus === 'ok' ? ref : null}
              />
            </div>
            {answers.filter((answer) => answer.status === 'ok').length !== 0 && (
              <div className="flex flex-col justify-center mb-10">
                {answers
                  .filter((answer) => answer.status === 'ok')
                  .map((answer) => (
                    <People key={answer.subId} name={answer.name} text={answer.text} />
                  ))}
              </div>
            )}
            <div className="flex items-center justify-center mb-6">
              <AnimatedButton
                label="Hmm...🤔"
                color="yellow"
                onClick={() => {
                  form.setValue('status', 'hm')
                }}
                ref={initialStatus === 'hm' ? ref : null}
              />
            </div>
            {answers.filter((answer) => answer.status === 'hm').length !== 0 && (
              <div className="flex flex-col justify-center mb-10">
                {answers
                  .filter((answer) => answer.status === 'hm')
                  .map((answer) => (
                    <People key={answer.subId} name={answer.name} text={answer.text} />
                  ))}
              </div>
            )}
            <div className="flex items-center justify-center mb-6">
              <AnimatedButton
                label="NG🙅‍♂️"
                color="red"
                onClick={() => {
                  form.setValue('status', 'ng')
                }}
                ref={initialStatus === 'ng' ? ref : null}
              />
            </div>
            {answers.filter((answer) => answer.status === 'ng').length !== 0 && (
              <div className="flex flex-col justify-center mb-10">
                {answers
                  .filter((answer) => answer.status === 'ng')
                  .map((answer) => (
                    <People key={answer.subId} name={answer.name} text={answer.text} />
                  ))}
              </div>
            )}
          </form>
        </div>
      </OpacityDisplay>
    )
)

const Container: React.VFC<ContainerPorps> = (props) => {
  const router = useRouter()
  const [isAnswered, setIsAnswered] = useState(false)
  const form = useForm()
  const ref = useRef<HTMLInputElement>()

  const onSubmit = async (data: Answer) => {
    let closeTime = 1500
    if (props.initialStatus) {
      setIsAnswered(true)
    } else {
      const animatedButtonEffectTime = 950
      closeTime += animatedButtonEffectTime
      setTimeout(() => setIsAnswered(true), animatedButtonEffectTime)
    }

    const subId = !oldSubId ? uuidV4() : oldSubId
    if (!oldSubId) {
      setLocalSubId(id, subId)
    }

    apiClient.answer.$post({
      body: { ...data, subId, token: props.token },
    })
    setTimeout(() => props.closeWindow(), closeTime)
  }

  const id = getAsString(router.query.id)
  const isLiff = getAsString(router.query.isLiff)
  const { subId: oldSubId, setLocalSubId } = useLocalSubId(id)
  const { data: answers, error } = useAspidaSWR(apiClient.invitation.check, '$get', {
    query: { id: id },
    enabled: !!id && !isAnswered,
    revalidateOnReconnect: false,
    revalidateOnFocus: false,

    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Never retry on 404.
      if (error.status === 404) return
      // Never retry on 403.
      if (error.status === 403) return
      // Never retry on 500.
      if (error.status === 500) return
      // Only retry up to 3 times.
      if (retryCount >= 3) return
      // Retry after 5 seconds.
      setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000)
    },
  })

  useEffect(() => {
    if (props.initialStatus && answers) {
      ref.current.click()
    }
  }, [props.initialStatus, answers])

  return (
    <Component
      {...props}
      form={form}
      onSubmit={onSubmit}
      isLoading={!answers}
      isError={error}
      isAnswered={isAnswered}
      id={id}
      answers={answers}
      isLiff={isLiff === 'true'}
      ref={ref}
    />
  )
}

export default Container
