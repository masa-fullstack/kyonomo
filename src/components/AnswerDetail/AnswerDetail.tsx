import useAspidaSWR from '@aspida/swr'
import { useRouter } from 'next/dist/client/router'
import React, { useState } from 'react'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'
import ReactLoading from 'react-loading'

import { apiClient } from '~/src/utils/apiClient'

import { StaticInput } from '../StaticInput'

type Props = {
  form: UseFormReturn<FieldValues>
  onSubmit: (data: any) => void
  isLoading: boolean
  isAnswered: boolean
  isError: boolean
  id: string
}

const Component: React.VFC<Props> = ({ form, onSubmit, isLoading, isAnswered, isError, id }) =>
  isError ? (
    <div className="h-screen mx-auto flex flex-col items-center justify-center container">
      <span className="text-3xl" role="img" aria-label="回答期限切れ">
        回答期限切れです🥺
      </span>
    </div>
  ) : isLoading ? (
    <div className="h-screen mx-auto flex flex-col items-center justify-center container">
      <ReactLoading type="bars" color="#000" width={160} height={160} />
    </div>
  ) : isAnswered ? (
    <div className="h-screen mx-auto flex flex-col items-center justify-center container">
      <span className="text-3xl" role="img" aria-label="完了">
        Thank you🙌
      </span>
    </div>
  ) : (
    <form name="answerForm" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="h-screen mx-auto flex flex-col items-center justify-center container">
        <div>
          <div className="hidden">
            <StaticInput type="text" defaultValue={id} register={form.register('id')} />
          </div>
          <div className="hidden">
            <StaticInput type="text" register={form.register('status')} />
          </div>
          <div className="flex mb-3">
            <StaticInput
              label="テキスト"
              labelStyles="bg-gray-500 text-white"
              type="textarea"
              placeholder="20:30から参加します"
              defaultValue=""
              register={form.register('text')}
            />
          </div>

          <div className="flex items-center justify-center mt-16 mb-16">
            <input
              type="submit"
              onClick={() => form.setValue('status', 'OK')}
              value="OK🙆‍♂️"
              className="px-10 py-5 bg-blue-600 text-white text-xl font-medium rounded-3xl cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-center mt-16 mb-16">
            <input
              type="submit"
              onClick={() => form.setValue('status', 'PENDING')}
              value="PENDING🤔"
              className="px-10 py-5 bg-yellow-500 text-white text-xl font-medium rounded-3xl cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-center mt-16 mb-16">
            <input
              type="submit"
              onClick={() => form.setValue('status', 'NG')}
              value="NG🙅‍♂️"
              className="px-10 py-5 bg-red-600 text-white text-xl font-medium rounded-3xl cursor-pointer"
            />
          </div>

          <input name="status" type="hidden" value="" />
        </div>
      </div>
    </form>
  )

const Container: React.VFC = () => {
  const router = useRouter()
  const [isAnswered, setIsAnswered] = useState(false)
  const form = useForm()

  const onSubmit = (data) => {
    setIsAnswered(true)
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
    revalidateOnMount: false,
  })

  return <Component form={form} onSubmit={onSubmit} isLoading={!data} isError={error} isAnswered={isAnswered} id={id} />
}

export default Container
