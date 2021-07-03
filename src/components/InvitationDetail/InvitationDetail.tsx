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
// import { message } from '~/src/utils/message'

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
          isRequired={true}
          isError={form.formState.errors.limitDate}
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
          isRequired={true}
          isError={form.formState.errors.limitTime}
          register={form.register('limitTime', { required: true })}
        />
      </div>
      <div className="col-span-10">
        <StaticInput
          id="subject"
          label="Subject"
          type="text"
          placeholder="オンライン飲みしよう！"
          defaultValue=""
          isRequired={true}
          isError={form.formState.errors.subject}
          register={form.register('subject', { required: true })}
        />
      </div>
      <div className="col-span-10">
        <StaticInput
          id="place"
          label="Place"
          type="text"
          placeholder="zoom"
          defaultValue=""
          isRequired={true}
          isError={form.formState.errors.place}
          register={form.register('place', { required: true })}
        />
      </div>
      <div className="col-span-10">
        <StaticInput
          id="time"
          label="Time"
          type="text"
          placeholder="21時ごろ〜23時"
          defaultValue=""
          isRequired={true}
          isError={form.formState.errors.time}
          register={form.register('time', { required: true })}
        />
      </div>
      <div className="col-span-10">
        <StaticInput
          id="text"
          label="テキスト"
          type="textarea"
          placeholder="途中参加／退席自由です"
          defaultValue=""
          register={form.register('text')}
        />
      </div>
      {(form.formState.errors.limitDate ||
        form.formState.errors.limitTime ||
        form.formState.errors.subject ||
        form.formState.errors.place ||
        form.formState.errors.time) && <div className="col-span-10 text-red-500">未入力項目があります</div>}

      <div className="col-span-10">
        <div className="flex flex-col items-center justify-center">
          <Button label="飲もうぜ🍻" color="blue" disabled={!form.formState.isValid} />

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
  const form = useForm({ mode: 'all' })
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
    form.setValue('answer', `${process.env.NEXT_PUBLIC_LIFF_ANSWER_URL}?id=${res.id}`)

    setIsDispURL(true)
    setIsLoading(false)

    // eslint-disable-next-line no-console
    console.log('start')
    const responseLiff = await shareTargetPicker([
      {
        type: 'flex',
        altText: 'this is a flex message',
        contents: {
          type: 'bubble',
          hero: {
            type: 'image',
            url: 'https://kyonomo.vercel.app/images/HEADER.png',
            size: 'full',
            aspectRatio: '20:13',
            aspectMode: 'cover',
          },
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: form.getValues('subject'),
                weight: 'bold',
                size: 'xl',
              },
              {
                type: 'box',
                layout: 'vertical',
                margin: 'lg',
                spacing: 'sm',
                contents: [
                  {
                    type: 'box',
                    layout: 'baseline',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'text',
                        text: 'Place',
                        color: '#aaaaaa',
                        size: 'sm',
                        flex: 1,
                      },
                      {
                        type: 'text',
                        text: form.getValues('place'),
                        wrap: true,
                        color: '#666666',
                        size: 'sm',
                        flex: 5,
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'baseline',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'text',
                        text: 'Time',
                        color: '#aaaaaa',
                        size: 'sm',
                        flex: 1,
                      },
                      {
                        type: 'text',
                        text: form.getValues('time'),
                        wrap: true,
                        color: '#666666',
                        size: 'sm',
                        flex: 5,
                      },
                    ],
                  },
                ],
              },
              {
                type: 'text',
                text: form.getValues('text') ? form.getValues('text') : ' ',
                margin: 'md',
                size: 'sm',
              },
            ],
          },
          footer: {
            type: 'box',
            layout: 'vertical',
            spacing: 'xxl',
            contents: [
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'button',
                    style: 'link',
                    height: 'sm',
                    action: {
                      type: 'uri',
                      label: 'OK🍻',
                      uri: `https://liff.line.me/1656164238-QBJ8Kzky?id=${res.id}`,
                    },
                    color: '#FFFFFF',
                  },
                ],
                backgroundColor: '#3b82f6',
                cornerRadius: 'xl',
                paddingAll: 'md',
              },
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'button',
                    style: 'link',
                    height: 'sm',
                    action: {
                      type: 'uri',
                      label: 'Hmm...🤔',
                      uri: `https://liff.line.me/1656164238-pA6oXKvj?id=${res.id}`,
                    },
                    color: '#FFFFFF',
                  },
                ],
                backgroundColor: '#fbbf24',
                cornerRadius: 'xl',
                paddingAll: 'md',
              },
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'button',
                    style: 'link',
                    height: 'sm',
                    action: {
                      type: 'uri',
                      label: 'NG🙅‍♂️',
                      uri: `https://liff.line.me/1656164238-PajlAG3E?id=${res.id}`,
                    },
                    color: '#FFFFFF',
                  },
                ],
                backgroundColor: '#f87171',
                paddingAll: 'md',
                cornerRadius: 'xl',
              },
              {
                type: 'spacer',
                size: 'sm',
              },
            ],
            flex: 0,
          },
        },
      },
      // {
      //   type: 'text',
      //   text: 'Hello, World!',
      // },
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
