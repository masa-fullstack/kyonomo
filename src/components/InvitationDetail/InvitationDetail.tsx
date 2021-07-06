import { parse, format } from 'date-fns'
import React, { useState } from 'react'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'
import ReactLoading from 'react-loading'

import { Invitation } from '~/src/types/api/Invitation'
import { apiClient } from '~/src/utils/apiClient'
import { getMessages } from '~/src/utils/getMessages'

import { Button } from '../Button'
import { StaticInput } from '../StaticInput'
import { useLiff } from '../hooks/useLiff'

type Props = {
  form: UseFormReturn<FieldValues>
  onSubmit: (data: Invitation) => void
  isLoading: boolean
  nowDate: string
  nowTime: string
}

const Component: React.VFC<Props> = ({ form, onSubmit, isLoading, nowDate, nowTime }) => (
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <div className="grid grid-cols-10 gap-4 relative">
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
          label="タイトル"
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
          label="場所"
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
          label="時間"
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
          label="自由記入"
          type="textarea"
          placeholder="途中参加／退席自由です"
          defaultValue=""
          register={form.register('text')}
        />
      </div>
      <div className="col-span-10">
        <StaticInput
          id="mode"
          label="匿名回答モード"
          type="checkbox"
          defaultChecked={false}
          register={form.register('mode')}
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
            <div className="absolute z-10 -top-10 h-screen w-screen bg-cover bg-gray-500 opacity-90 flex items-center justify-center">
              <ReactLoading type="bars" color="#000" width={80} height={80} />
            </div>
          )}
        </div>
      </div>
    </div>
  </form>
)

const Container: React.VFC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm({ mode: 'all' })
  const nowDate = format(new Date(), 'yyyy-MM-dd')
  const nowTime = '23:59'

  const { token, shareTargetPicker, closeWindow } = useLiff()

  const onSubmit = async (data: Invitation) => {
    setIsLoading(true)
    const limitDate = format(parse(data.limitDate, 'yyyy-MM-dd', new Date()), 'yyyyMMdd')
    const limitTime = format(parse(data.limitTime, 'HH:mm', new Date()), 'HHmm')

    const res: Invitation = await apiClient.invitation.$post({
      body: { ...data, limitDate, limitTime, token },
    })

    const isLiff = !form.getValues('mode')

    const okURL = isLiff ? process.env.NEXT_PUBLIC_LIFF_OK_URL : process.env.NEXT_PUBLIC_OK_URL
    const hmURL = isLiff ? process.env.NEXT_PUBLIC_LIFF_HM_URL : process.env.NEXT_PUBLIC_HM_URL
    const ngURL = isLiff ? process.env.NEXT_PUBLIC_LIFF_NG_URL : process.env.NEXT_PUBLIC_NG_URL
    const answerURL = isLiff ? process.env.NEXT_PUBLIC_LIFF_ANSWER_URL : process.env.NEXT_PUBLIC_ANSWER_URL

    await shareTargetPicker(
      getMessages(
        res.id,
        isLiff,
        okURL,
        hmURL,
        ngURL,
        answerURL,
        form.getValues('subject'),
        form.getValues('place'),
        form.getValues('time'),
        form.getValues('text')
      )
    )
    setIsLoading(false)
    closeWindow()
  }

  return <Component form={form} onSubmit={onSubmit} isLoading={isLoading} nowDate={nowDate} nowTime={nowTime} />
}

export default Container
