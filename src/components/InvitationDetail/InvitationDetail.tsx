import { parse, format } from 'date-fns'
import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'
import ReactLoading from 'react-loading'

import { Invitation } from '~/src/types/api/Invitation'
import { apiClient } from '~/src/utils/apiClient'

import { Button } from '../Button'
import { StaticInput } from '../StaticInput'
import { useAuth } from '../hooks/Auth'

type Props = {
  form: UseFormReturn<FieldValues>
  onSubmit: (data: Invitation) => void
  isLoading: boolean
  isDispURL: boolean
  nowDate: string
  nowTime: string
  isCopiedAnswer: boolean
  setIsCopiedAnswer: React.Dispatch<React.SetStateAction<boolean>>
}

const Component: React.VFC<Props> = ({
  form,
  onSubmit,
  isLoading,
  isDispURL,
  nowDate,
  nowTime,
  isCopiedAnswer,
  setIsCopiedAnswer,
}) => (
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <div className="grid grid-cols-10 gap-4">
      {/* <div className="col-span-10">
        <StaticInput
          id="mail"
          label="Mail"
          type="text"
          placeholder="kyonomo@gmail.com"
          defaultValue=""
          register={form.register('mail')}
        />
      </div> */}
      <div className="hidden">
        <StaticInput id="lineId" type="text" register={form.register('lineId')} />
      </div>
      <div className="col-span-6">
        <StaticInput
          id="limitDate"
          label="締切日"
          type="date"
          placeholder=""
          defaultValue={nowDate}
          register={form.register('limitDate', { required: true })}
        />
      </div>
      <div className="col-span-4">
        <StaticInput
          id="limitTime"
          label="締切時間"
          type="time"
          placeholder=""
          defaultValue={nowTime}
          register={form.register('limitTime', { required: true })}
        />
      </div>
      <div className="col-span-10">
        <StaticInput
          id="text"
          label="テキスト"
          type="textarea"
          placeholder="今日20:00からオンライン飲みどう？"
          defaultValue=""
          register={form.register('text')}
        />
      </div>
      <div className="col-span-10">
        <StaticInput
          id="mode"
          label="簡易回答"
          type="checkbox"
          placeholder=""
          defaultValue=""
          register={form.register('mode')}
        />
      </div>
      {(form.formState.errors.limitDate || form.formState.errors.limitTime) && <span>締切は必須入力です</span>}

      <div className="col-span-10">
        <div className="flex flex-col items-center justify-center">
          <Button label="飲もうぜ🍻" color="blue" />

          {isLoading && (
            <div className="mt-5">
              <ReactLoading type="bars" color="#000" width={80} height={80} />
            </div>
          )}
        </div>
      </div>

      {isDispURL && (
        <>
          <div className="col-span-10">
            <div className="flex">
              <div className="flex-grow">
                <StaticInput
                  id="answerURL"
                  label="回答URL"
                  type="url"
                  placeholder=""
                  defaultValue=""
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
        </>
      )}
    </div>
  </form>
)

const Container: React.VFC = () => {
  const [isCopiedAnswer, setIsCopiedAnswer] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDispURL, setIsDispURL] = useState(false)
  const form = useForm()
  const nowDate = format(new Date(), 'yyyy-MM-dd')
  const nowTime = '23:59'

  const { getIDToken, shareTargetPicker } = useAuth()

  const onSubmit = async (data) => {
    setIsLoading(true)
    const limitDate = format(parse(data.limitDate, 'yyyy-MM-dd', new Date()), 'yyyyMMdd')
    const limitTime = format(parse(data.limitTime, 'HH:mm', new Date()), 'HHmm')

    const lineId = await getIDToken()

    const res: Invitation = await apiClient.invitation.$post({
      body: { ...data, limitDate, limitTime, lineId },
    })

    if (form.getValues('mode') === true) {
      form.setValue(
        'answer',
        `${process.env.NEXT_PUBLIC_LIFF_OK_URL}?id=${res.id}\n${process.env.NEXT_PUBLIC_LIFF_HM_URL}?id=${res.id}\n${process.env.NEXT_PUBLIC_LIFF_NG_URL}?id=${res.id}\n`
      )
    } else {
      form.setValue('answer', `${process.env.NEXT_PUBLIC_LIFF_ANSWER_URL}?id=${res.id}`)
    }

    setIsDispURL(true)
    setIsLoading(false)

    // eslint-disable-next-line no-console
    console.log('start')
    const responseLiff = await shareTargetPicker([
      {
        type: 'text',
        text: 'Hello, World!',
      },
    ])
    // eslint-disable-next-line no-console
    console.log(responseLiff)
  }

  // console.log(form.watch("mail"));
  // console.log(form.watch("lineId"));
  // console.log(form.watch("limitDate"));
  // console.log(form.watch("limitTime"));
  // console.log(form.watch("text"));
  // console.log(form.watch("answer"));
  // console.log(form.watch("text"));
  // console.log(form.watch("mode"));

  // useEffect(() => {
  //   const func = async () => {
  //     const liff = (await import('@line/liff')).default
  //     await liff.ready
  //     const idToken = await liff.getIDToken
  //     form.setValue('lineId', idToken)
  //   }
  //   func()
  // }, [form])

  return (
    <Component
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      isDispURL={isDispURL}
      nowDate={nowDate}
      nowTime={nowTime}
      isCopiedAnswer={isCopiedAnswer}
      setIsCopiedAnswer={setIsCopiedAnswer}
    />
  )
}

export default Container
