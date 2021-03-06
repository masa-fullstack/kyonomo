import { parse, format } from 'date-fns'
import React, { useState } from 'react'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'

import { Invitation } from '~/src/types/api/Invitation'
import { apiClient } from '~/src/utils/apiClient'
import { getMessages } from '~/src/utils/getMessages'

import { Animation } from '../Animation'
import { Button } from '../Button'
import { Loading } from '../Loading'
import { StaticInput } from '../StaticInput'
import { LocalInvitation, useInvitation } from '../hooks/useInvitation'
import { useLiff } from '../hooks/useLiff'

type Props = {
  form: UseFormReturn<FieldValues>
  onSubmit: (data: Invitation) => void
  isLoading: boolean
  nowDate: string
  nowTime: string
  isCreated: boolean
  localInvitations: LocalInvitation
}

const Component: React.VFC<Props> = ({ form, onSubmit, isLoading, nowDate, nowTime, isCreated, localInvitations }) =>
  isCreated ? (
    <div className="h-full flex flex-col items-center justify-center">
      <Animation path="/animes/done.json" loop={false} speed={1.5} />
      <span className="text-3xl" role="img" aria-label="ๅฎไบ">
        Have a Good Time๐
      </span>
    </div>
  ) : (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid grid-cols-10 gap-4 relative">
        <div className="col-span-6">
          <StaticInput
            id="limitDate"
            label="็ท ๅๆฅ"
            type="date"
            placeholder=""
            defaultValue={nowDate}
            isRequired={true}
            isError={form.formState.errors.limitDate}
            register={form.register('limitDate', { required: true })}
          >
            <p>ๅ็ญใฎ็ท ๅใ่จญๅฎใใพใใ</p>
            <p>ๅ็ญ่ใฏ็ท ๅใ่ถใใฆๅ็ญใงใใชใใชใใพใใ</p>
          </StaticInput>
        </div>
        <div className="col-span-4">
          <StaticInput
            id="limitTime"
            label="็ท ๅๆ้"
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
            label="ใฟใคใใซ"
            type="datalist"
            data={localInvitations?.subject}
            control={form.control}
            rules={{ required: true }}
            placeholder="ใชใณใฉใคใณ้ฃฒใฟใใใ๏ผ"
            defaultValue=""
            isRequired={true}
            isError={form.formState.errors.subject}
            register={form.register('subject', { required: true })}
          />
        </div>
        <div className="col-span-10">
          <StaticInput
            id="place"
            label="ๅ ดๆ"
            type="datalist"
            data={localInvitations?.place}
            control={form.control}
            rules={{ required: true }}
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
            label="ๆ้"
            type="datalist"
            data={localInvitations?.time}
            control={form.control}
            rules={{ required: true }}
            placeholder="21ๆใใใ23ๆ"
            defaultValue=""
            isRequired={true}
            isError={form.formState.errors.time}
            register={form.register('time', { required: true })}
          />
        </div>
        <div className="col-span-10">
          <StaticInput
            id="text"
            label="่ช็ฑ่จๅฅ"
            type="textarea"
            placeholder="้ไธญๅๅ ๏ผ้ๅธญ่ช็ฑใงใ"
            defaultValue=""
            register={form.register('text')}
          />
        </div>
        <div className="col-span-10">
          <StaticInput
            id="mode"
            label="ๅฟๅๅ็ญใขใผใ"
            type="checkbox"
            defaultChecked={false}
            register={form.register('mode')}
          >
            <>
              <p>ONใซใใใจๅฟๅใงใฎๅ็ญใจใชใใพใใ</p>
            </>
          </StaticInput>
        </div>
        {(form.formState.errors.limitDate ||
          form.formState.errors.limitTime ||
          form.formState.errors.subject ||
          form.formState.errors.place ||
          form.formState.errors.time) && <div className="col-span-10 text-red-500">ๆชๅฅๅ้ ็ฎใใใใพใ</div>}

        <div className="col-span-10">
          <div className="flex flex-col items-center justify-center">
            <Button label="ๅใ ใก/ใฐใซใผใใฎ้ธๆ" color="line" disabled={!form.formState.isValid} />

            {isLoading && (
              <div className="absolute z-10 -top-4 h-screen w-screen bg-cover bg-gray-500 opacity-90 flex items-center justify-center">
                <Loading />
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  )

const Container: React.VFC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isCreated, setIsCreated] = useState(false)
  const { localInvitations, setLocalInvitation } = useInvitation()
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
    setLocalInvitation({
      subject: form.getValues('subject'),
      place: form.getValues('place'),
      time: form.getValues('time'),
    })
    setIsLoading(false)
    setIsCreated(true)
    setTimeout(() => closeWindow(), 1500)
  }

  return (
    <Component
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      nowDate={nowDate}
      nowTime={nowTime}
      isCreated={isCreated}
      localInvitations={localInvitations}
    />
  )
}

export default Container
