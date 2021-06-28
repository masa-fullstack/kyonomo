import useAspidaSWR from '@aspida/swr'
import { useSpring, animated, SpringValue } from '@react-spring/web'
import lottie from 'lottie-web'
import { useRouter } from 'next/dist/client/router'
import React, { useRef, useState } from 'react'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'
import ReactLoading from 'react-loading'

import { apiClient } from '~/src/utils/apiClient'

import { Button } from '../Button'
import { StaticInput } from '../StaticInput'

type Props = {
  form: UseFormReturn<FieldValues>
  onSubmit: (data: any) => void
  isLoading: boolean
  isAnswered: boolean
  isError: boolean
  id: string
  animationContainer: React.MutableRefObject<HTMLDivElement>
  setSpringState1: React.Dispatch<React.SetStateAction<boolean>>
  x1: SpringValue<number>
  setSpringState2: React.Dispatch<React.SetStateAction<boolean>>
  x2: SpringValue<number>
  setSpringState3: React.Dispatch<React.SetStateAction<boolean>>
  x3: SpringValue<number>
}

const Component: React.VFC<Props> = ({
  form,
  onSubmit,
  isLoading,
  isAnswered,
  isError,
  id,
  animationContainer,
  setSpringState1,
  x1,
  setSpringState2,
  x2,
  setSpringState3,
  x3,
}) =>
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
      <div ref={animationContainer} className="w-80 h-80" />
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
        <animated.div
          style={{
            opacity: x1.to({ range: [0, 0.5, 1], output: [1, 0.5, 1] }),
            scale: x1.to({
              range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
              output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
            }),
          }}
        >
          <Button
            label="OK🙆‍♂️"
            color="bg-blue-600"
            onClick={() => {
              form.setValue('status', 'OK')
              setSpringState1((prevState) => !prevState)
            }}
          />
        </animated.div>
      </div>
      <div className="flex items-center justify-center mb-12">
        <animated.div
          style={{
            opacity: x2.to({ range: [0, 0.5, 1], output: [1, 0.5, 1] }),
            scale: x2.to({
              range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
              output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
            }),
          }}
        >
          <Button
            label="PENDING🤔"
            color="bg-yellow-500"
            onClick={() => {
              form.setValue('status', 'PENDING')
              setSpringState2((prevState) => !prevState)
            }}
          />
        </animated.div>
      </div>
      <div className="flex items-center justify-center">
        <animated.div
          style={{
            opacity: x3.to({ range: [0, 0.5, 1], output: [1, 0.5, 1] }),
            scale: x3.to({
              range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
              output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
            }),
          }}
        >
          <Button
            label="NG🙅‍♂️"
            color="bg-red-600"
            onClick={() => {
              form.setValue('status', 'NG')
              setSpringState3((prevState) => !prevState)
            }}
          />
        </animated.div>
      </div>
      <input name="status" type="hidden" value="" />
    </form>
  )

const Container: React.VFC = () => {
  const router = useRouter()
  const [isAnswered, setIsAnswered] = useState(false)
  const form = useForm()
  const animationContainer = useRef<HTMLDivElement>(null)
  const [springState1, setSpringState1] = useState(true)
  const { x: x1 } = useSpring({
    from: { x: 0 },
    x: springState1 ? 1 : 0,
    config: { duration: 1000 },
  })

  const [springState2, setSpringState2] = useState(true)
  const { x: x2 } = useSpring({
    from: { x: 0 },
    x: springState2 ? 1 : 0,
    config: { duration: 1000 },
  })

  const [springState3, setSpringState3] = useState(true)
  const { x: x3 } = useSpring({
    from: { x: 0 },
    x: springState3 ? 1 : 0,
    config: { duration: 1000 },
  })

  const onSubmit = (data) => {
    setTimeout(() => {
      setIsAnswered(true)
      lottie.loadAnimation({
        container: animationContainer.current,
        loop: false,
        autoplay: true,
        path: '/images/check.json',
      })
      lottie.setSpeed(1.8)
    }, 950)
    apiClient.answer.$post({
      body: data,
    })
    // const res: Answer = await apiClient.answer.$post({
    //   body: data,
    // })
  }

  // console.log(form.watch('id'))
  // console.log(form.watch('status'))
  // console.log(form.watch('text'))

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

  return (
    <Component
      form={form}
      onSubmit={onSubmit}
      isLoading={!data}
      isError={error}
      isAnswered={isAnswered}
      animationContainer={animationContainer}
      id={id}
      setSpringState1={setSpringState1}
      x1={x1}
      setSpringState2={setSpringState2}
      x2={x2}
      setSpringState3={setSpringState3}
      x3={x3}
    />
  )
}

export default Container
