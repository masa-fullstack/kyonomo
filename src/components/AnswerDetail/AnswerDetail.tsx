import useAspidaSWR from '@aspida/swr'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useRef, useState } from 'react'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'
import ReactLoading from 'react-loading'

import { Answer, Status } from '~/src/types/api/Answer'
import { apiClient } from '~/src/utils/apiClient'

import { Animation } from '../Animation'
import { Button } from '../Button'
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
} & ContainerPorps

// eslint-disable-next-line react/display-name
const Component = React.forwardRef<HTMLInputElement, Props>(
  ({ form, onSubmit, isLoading, isAnswered, isError, id, initialStatus }, ref) =>
    isError ? (
      <div className="flex items-center justify-center">
        <span className="text-xl" role="img" aria-label="エラー">
          有効なお誘いが存在しません。 期限が切れているか、URLが誤っていないかご確認下さい🥺
        </span>
      </div>
    ) : isLoading ? (
      <div className="flex items-center justify-center">
        <ReactLoading type="bars" color="#000" width={160} height={160} />
      </div>
    ) : isAnswered ? (
      <div className="flex flex-col items-center justify-center">
        <Animation speed={2} />
        <span className="text-3xl" role="img" aria-label="完了">
          Thank you🙌
        </span>
      </div>
    ) : (
      <form name="answerForm" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="hidden">
          <StaticInput id="id" type="text" defaultValue={id} register={form.register('id')} />
        </div>
        <div className="hidden">
          <StaticInput id="status" type="text" register={form.register('status')} />
        </div>
        <div className="mb-3 w-72">
          <StaticInput
            id="text"
            label="Comments ✉️💨"
            type="textarea"
            placeholder="例)21時から参加します👍"
            defaultValue=""
            register={form.register('text')}
          />
        </div>

        <div className="flex items-center justify-center mt-16 mb-12">
          <Button
            label="OK🙆‍♂️"
            color="blue"
            onClick={() => {
              form.setValue('status', 'ok')
            }}
            ref={initialStatus === 'ok' ? ref : null}
          />
        </div>
        <div className="flex items-center justify-center mb-12">
          <Button
            label="PENDING🤔"
            color="yellow"
            onClick={() => {
              form.setValue('status', 'pending')
            }}
            ref={initialStatus === 'pending' ? ref : null}
          />
        </div>
        <div className="flex items-center justify-center">
          <Button
            label="NG🙅‍♂️"
            color="red"
            onClick={() => {
              form.setValue('status', 'ng')
            }}
            ref={initialStatus === 'ng' ? ref : null}
          />
        </div>
        <input name="status" type="hidden" value="" />
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

  const { data, error } = useAspidaSWR(apiClient.invitation.check, '$get', {
    query: { id: id },
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
    if (props.initialStatus && data) ref.current.click()
  }, [props.initialStatus, data])

  return (
    <Component
      {...props}
      form={form}
      onSubmit={onSubmit}
      isLoading={!data}
      isError={error}
      isAnswered={isAnswered}
      id={id}
      ref={ref}
    />
  )
}

export default Container
