import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'
import ReactLoading from 'react-loading'

import { Invitation } from '~/src/types/api/Invitation'
import { apiClient } from '~/src/utils/apiClient'

import { StaticInput } from '../StaticInput'

type Props = {
  form: UseFormReturn<FieldValues>
  onSubmit: (data: Invitation) => void
  isLoading: boolean
  isDispURL: boolean
}

const Component: React.VFC<Props> = ({ form, onSubmit, isLoading, isDispURL }) => (
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <div className="h-screen mx-auto mt-10 flex flex-col items-center container">
      <div>
        <div className="flex mb-3">
          <StaticInput
            label="Mail"
            labelStyles="bg-gray-500 text-white"
            type="text"
            placeholder="kyonomo@gmail.com"
            defaultValue=""
            register={form.register('mail')}
          />
        </div>
        <div className="flex mb-3">
          <StaticInput
            label="LineID"
            labelStyles="bg-gray-500 text-white"
            type="text"
            placeholder="LineのユーザーID"
            defaultValue=""
            register={form.register('lineId')}
          />
        </div>
        <div className="flex mb-3">
          <StaticInput
            label="締切"
            labelStyles="bg-gray-500 text-white"
            type="text"
            placeholder=""
            defaultValue="20210626"
            register={form.register('limitDate', { required: true })}
          />
          <StaticInput
            type="text"
            placeholder=""
            defaultValue="2323"
            register={form.register('limitTime', { required: true })}
          />
        </div>
        <div className="flex mb-3">
          <StaticInput
            label="テキスト"
            labelStyles="bg-gray-500 text-white"
            type="textarea"
            placeholder="今日20:00からオンライン飲みどう？"
            defaultValue=""
            register={form.register('text')}
          />
        </div>
        {(form.formState.errors.limitDate || form.formState.errors.limitTime) && <span>締切は必須入力です</span>}

        <div className="flex flex-col items-center justify-center mt-16 mb-16">
          <input
            type="submit"
            value="お誘いURL作成"
            className="px-10 py-5 bg-blue-600 text-white text-xl font-medium rounded-3xl cursor-pointer"
          />
          {isLoading && (
            <div className="mt-20">
              <ReactLoading type="bars" color="#000" width={160} height={160} />
            </div>
          )}
        </div>

        {isDispURL && (
          <>
            <div className="flex mb-3">
              <StaticInput
                label="回答URL"
                type="textarea"
                placeholder=""
                defaultValue=""
                readOnly={true}
                styles="border-none"
                register={form.register('answer')}
              />
              <CopyToClipboard text={form.getValues('answer')}>
                <img src="images/icon_copy.svg" className="cursor-pointer" alt="copy"></img>
              </CopyToClipboard>
            </div>
            <div className="flex mb-3">
              <StaticInput
                label="管理URL"
                type="textarea"
                placeholder=""
                defaultValue=""
                readOnly={true}
                styles="border-none"
                register={form.register('admin')}
              />
              <CopyToClipboard text={form.getValues('admin')}>
                <img src="images/icon_copy.svg" className="cursor-pointer" alt="copy"></img>
              </CopyToClipboard>
            </div>
          </>
        )}
      </div>
    </div>
  </form>
)

const Container: React.VFC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isDispURL, setIsDispURL] = useState(false)
  const form = useForm()
  const onSubmit = async (data) => {
    setIsLoading(true)
    const res: Invitation = await apiClient.invitation.$post({
      body: data,
    })

    form.setValue('answer', `${process.env.NEXT_PUBLIC_SITE_URL}/answer?id=${res.id}`)
    form.setValue('admin', `${process.env.NEXT_PUBLIC_SITE_URL}/admin?id=${res.id}`)
    setIsDispURL(true)
    setIsLoading(false)
  }

  // console.log(form.watch("mail"));
  // console.log(form.watch("lineId"));
  // console.log(form.watch("limitDate"));
  // console.log(form.watch("limitTime"));
  // console.log(form.watch("text"));
  // console.log(form.watch("answer"));
  // console.log(form.watch("text"));

  return <Component form={form} onSubmit={onSubmit} isLoading={isLoading} isDispURL={isDispURL} />
}

export default Container
