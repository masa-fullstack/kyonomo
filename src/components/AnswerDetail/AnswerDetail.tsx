import useAspidaSWR from '@aspida/swr'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useRef, useState } from 'react'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'
import ReactLoading from 'react-loading'

import { Answer, Status } from '~/src/types/api/Answer'
import { apiClient } from '~/src/utils/apiClient'

import { AnimatedButton } from '../AnimatedButton'
import { Animation } from '../Animation'
import { People } from '../People'
import { StaticInput } from '../StaticInput'

type ContainerPorps = {
  initialStatus?: Status
}

type Props = {
  form: UseFormReturn<FieldValues>
  onSubmit: (data: Answer) => void
  isLoading: boolean
  isAnswered: boolean
  isError: boolean
  id: string
  answers: Answer[]
} & ContainerPorps

// eslint-disable-next-line react/display-name
const Component = React.forwardRef<HTMLInputElement, Props>(
  ({ form, onSubmit, isLoading, isAnswered, isError, id, answers, initialStatus }, ref) =>
    isError ? (
      <div className="flex items-center justify-center">
        <span className="text-xl" role="img" aria-label="エラー">
          有効なお誘いが存在しません。 期限が切れているか、URLが誤っていないかご確認下さい🥺
        </span>
      </div>
    ) : isAnswered ? (
      <div className="flex flex-col items-center justify-center">
        <Animation speed={2} />
        <span className="text-3xl" role="img" aria-label="完了">
          Thank you🙌
        </span>
      </div>
    ) : isLoading ? (
      <div className="flex items-center justify-center">
        <ReactLoading type="bars" color="#000" width={160} height={160} />
      </div>
    ) : (
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

        <div className="flex items-center justify-center mt-6 mb-2">
          <AnimatedButton
            label="OK🙆‍♂️"
            color="blue"
            onClick={() => {
              form.setValue('status', 'ok')
            }}
            ref={initialStatus === 'ok' ? ref : null}
          />
        </div>
        <div className="flex items-center justify-center h-5 mb-6">
          {answers
            .filter((answer) => answer.status === 'ok')
            .map((answer) => (
              <People key={answer.subId} />
            ))}
        </div>
        <div className="flex items-center justify-center mb-2">
          <AnimatedButton
            label="Hmm...🤔"
            color="yellow"
            onClick={() => {
              form.setValue('status', 'hm')
            }}
            ref={initialStatus === 'hm' ? ref : null}
          />
        </div>
        <div className="flex items-center justify-center h-5 mb-6">
          {answers
            .filter((answer) => answer.status === 'hm')
            .map((answer) => (
              <People key={answer.subId} />
            ))}
        </div>
        <div className="flex items-center justify-center mb-2">
          <AnimatedButton
            label="NG🙅‍♂️"
            color="red"
            onClick={() => {
              form.setValue('status', 'ng')
            }}
            ref={initialStatus === 'ng' ? ref : null}
          />
        </div>
        <div className="flex items-center justify-center h-5 mb-12">
          {answers
            .filter((answer) => answer.status === 'ng')
            .map((answer) => (
              <People key={answer.subId} />
            ))}
        </div>

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
      </form>
    )
)

const Container: React.VFC<ContainerPorps> = (props) => {
  const router = useRouter()
  const [isAnswered, setIsAnswered] = useState(false)
  const form = useForm()
  const ref = useRef<HTMLInputElement>()

  const onSubmit = (data: Answer) => {
    if (props.initialStatus) setIsAnswered(true)
    else setTimeout(() => setIsAnswered(true), 950)

    apiClient.answer.$post({
      body: data,
    })
  }

  let id: string
  if (typeof router.query.id === 'string') {
    id = router.query.id
  }

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
    if (props.initialStatus && answers) ref.current.click()
  }, [props.initialStatus, answers])

  useEffect(() => {
    const func = async () => {
      const liff = (await import('@line/liff')).default
      await liff.ready
      const profile = await liff.getProfile()
      const userId = profile.userId
      const displayName = profile.displayName
      form.setValue('subId', userId)
      form.setValue('referrer', displayName)
    }
    func()
  }, [form])

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
      ref={ref}
    />
  )
}

export default Container
