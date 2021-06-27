import { parse, format } from 'date-fns'
import React, { useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'
import ReactLoading from 'react-loading'

import { Invitation } from '~/src/types/api/Invitation'
import { apiClient } from '~/src/utils/apiClient'

import { Button } from '../Button'
import { StaticInput } from '../StaticInput'

type Props = {
  form: UseFormReturn<FieldValues>
  onSubmit: (data: Invitation) => void
  isLoading: boolean
  isDispURL: boolean
  nowDate: string
  nowTime: string
  scrollBottomRef: React.MutableRefObject<HTMLDivElement>
  isCopiedAnswer: boolean
  setIsCopiedAnswer: React.Dispatch<React.SetStateAction<boolean>>
  isCopiedAdmin: boolean
  setIsCopiedAdmin: React.Dispatch<React.SetStateAction<boolean>>
}

const Component: React.VFC<Props> = ({
  form,
  onSubmit,
  isLoading,
  isDispURL,
  nowDate,
  nowTime,
  scrollBottomRef,
  isCopiedAnswer,
  setIsCopiedAnswer,
  isCopiedAdmin,
  setIsCopiedAdmin,
}) => (
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <StaticInput
          id="mail"
          label="Mail"
          labelStyles="bg-gray-500 text-white"
          type="text"
          placeholder="kyonomo@gmail.com"
          defaultValue=""
          register={form.register('mail')}
        />
      </div>
      <div className="col-span-2">
        <StaticInput
          id="lineId"
          label="LineID"
          labelStyles="bg-gray-500 text-white"
          type="text"
          placeholder="LineのユーザーID"
          defaultValue=""
          register={form.register('lineId')}
        />
      </div>
      <div className="">
        <StaticInput
          id="limitDate"
          label="締切日"
          labelStyles="bg-gray-500 text-white"
          type="date"
          placeholder=""
          defaultValue={nowDate}
          register={form.register('limitDate', { required: true })}
        />
      </div>
      <div className="">
        <StaticInput
          id="limitTime"
          label="締切時間"
          type="time"
          placeholder=""
          defaultValue={nowTime}
          register={form.register('limitTime', { required: true })}
        />
      </div>
      <div className="col-span-2">
        <StaticInput
          id="text"
          label="テキスト"
          labelStyles="bg-gray-500 text-white"
          type="textarea"
          placeholder="今日20:00からオンライン飲みどう？"
          defaultValue=""
          register={form.register('text')}
        />
      </div>
      {(form.formState.errors.limitDate || form.formState.errors.limitTime) && <span>締切は必須入力です</span>}

      <div className="col-span-2">
        <div className="flex flex-col items-center justify-center">
          <Button label="飲もうぜ🍻" />

          {isLoading && (
            <div className="mt-5">
              <ReactLoading type="bars" color="#000" width={80} height={80} />
            </div>
          )}
        </div>
      </div>

      {isDispURL && (
        <>
          <div className="col-span-2">
            <div className="flex">
              <div className="flex-grow">
                <StaticInput
                  id="answerURL"
                  label="回答URL"
                  type="url"
                  placeholder=""
                  defaultValue=""
                  styles="border-none"
                  register={form.register('answer')}
                />
              </div>
              <div className="relative flex items-center">
                <CopyToClipboard
                  text={form.getValues('answer')}
                  onCopy={() => {
                    setIsCopiedAnswer(true)
                    setTimeout(() => setIsCopiedAnswer(false), 1000)
                  }}
                >
                  <img src="images/icon_copy.svg" className="cursor-pointer" alt="copy"></img>
                </CopyToClipboard>
                {isCopiedAnswer ? (
                  <span className="absolute left-2 bottom-16 inline-block p-1 whitespace-nowrap text-sm bg-gray-800 text-gray-200 rounded-lg">
                    Copied
                  </span>
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex">
              <div className="flex-grow">
                <StaticInput
                  id="adminURL"
                  label="管理URL"
                  type="url"
                  placeholder=""
                  defaultValue=""
                  styles="border-none"
                  register={form.register('admin')}
                />
              </div>

              <div className="relative flex items-center">
                <CopyToClipboard
                  text={form.getValues('admin')}
                  onCopy={() => {
                    setIsCopiedAdmin(true)
                    setTimeout(() => setIsCopiedAdmin(false), 1000)
                  }}
                >
                  <img src="images/icon_copy.svg" className="cursor-pointer" alt="copy"></img>
                </CopyToClipboard>
                {isCopiedAdmin ? (
                  <span className="absolute left-2 bottom-16 inline-block p-1 whitespace-nowrap text-sm bg-gray-800 text-gray-200 rounded-lg">
                    Copied
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </>
      )}
      <div ref={scrollBottomRef} />
    </div>
  </form>
)

const Container: React.VFC = () => {
  const [isCopiedAnswer, setIsCopiedAnswer] = useState(false)
  const [isCopiedAdmin, setIsCopiedAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDispURL, setIsDispURL] = useState(false)
  const scrollBottomRef = useRef<HTMLDivElement>(null)
  const form = useForm()
  const nowDate = format(new Date(), 'yyyy-MM-dd')
  const nowTime = '23:59'
  const onSubmit = async (data) => {
    setIsLoading(true)
    const limitDate = format(parse(data.limitDate, 'yyyy-MM-dd', new Date()), 'yyyyMMdd')
    const limitTime = format(parse(data.limitTime, 'HH:mm', new Date()), 'HHmm')

    const res: Invitation = await apiClient.invitation.$post({
      body: { ...data, limitDate, limitTime },
    })

    form.setValue('answer', `${process.env.NEXT_PUBLIC_SITE_URL}/answer?id=${res.id}`)
    form.setValue('admin', `${process.env.NEXT_PUBLIC_SITE_URL}/admin?id=${res.id}`)
    setIsDispURL(true)
    setIsLoading(false)
    scrollBottomRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // console.log(form.watch("mail"));
  // console.log(form.watch("lineId"));
  // console.log(form.watch("limitDate"));
  // console.log(form.watch("limitTime"));
  // console.log(form.watch("text"));
  // console.log(form.watch("answer"));
  // console.log(form.watch("text"));

  return (
    <Component
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      isDispURL={isDispURL}
      nowDate={nowDate}
      nowTime={nowTime}
      scrollBottomRef={scrollBottomRef}
      isCopiedAnswer={isCopiedAnswer}
      setIsCopiedAnswer={setIsCopiedAnswer}
      isCopiedAdmin={isCopiedAdmin}
      setIsCopiedAdmin={setIsCopiedAdmin}
    />
  )
}

export default Container
