import React, { InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

type ContainerProps = {
  id: string
  register: UseFormRegisterReturn
  label?: string
  type: InputHTMLAttributes<HTMLInputElement>['type']
  placeholder?: string
  defaultValue?: string
  currency?: string[]
  isRequired?: boolean
  isError?: boolean
  isChecked?: boolean
}

type Props = { errorStyle: string } & ContainerProps

const Component: React.VFC<Props> = (props) => (
  <div>
    {props.label && (
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
        {props.label}
        {props.isRequired && <span className="text-red-500"> *</span>}
      </label>
    )}
    {props.type === 'textarea' ? (
      // テキストエリア
      <textarea
        name={props.id}
        id={props.id}
        rows={2}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        {...props.register}
        className={`${props.errorStyle}  focus:ring-indigo-500 focus:border-indigo-500 block w-full px-3 md:px-5 text-base placeholder-gray-300 border-gray-300 rounded-md resize-none bg-gray-100 focus:bg-white`}
      />
    ) : props.type === 'url' ? (
      // 読み取り専用枠なし
      <textarea
        name={props.id}
        id={props.id}
        rows={6}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        readOnly={true}
        {...props.register}
        className="block w-full px-3 md:px-5 text-xs md:text-sm border-0 ring-0 focus:ring-0 resize-none"
      />
    ) : props.type === 'checkbox' ? (
      // チェックボックス
      <div className="mt-1 relative rounded-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
        <input
          type={props.type}
          name={props.id}
          id={props.id}
          checked={props.isChecked}
          placeholder={props.placeholder}
          {...props.register}
          className="focus:ring-indigo-500 focus:border-indigo-500 block h-4 w-4 text-indigo-600 border-gray-300 rounded bg-gray-100 focus:bg-white"
        />
      </div>
    ) : (
      //以外
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
        <input
          type={props.type}
          name={props.id}
          id={props.id}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          {...props.register}
          className={`${props.errorStyle}  focus:ring-indigo-500 focus:border-indigo-500 block w-full px-3 md:px-5 text-base placeholder-gray-300 border-gray-300 rounded-md bg-gray-100 focus:bg-white`}
        />
      </div>
    )}
  </div>
)

const Container: React.VFC<ContainerProps> = (props) => {
  const errorStyle = props.isError ? 'border-red-500' : ''
  return <Component {...props} errorStyle={errorStyle} />
}

export default Container
