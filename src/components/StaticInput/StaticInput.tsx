import React, { InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

type ContainerProps = {
  id: string
  register: UseFormRegisterReturn
  label?: string
  type: InputHTMLAttributes<HTMLInputElement>['type']
  placeholder?: string
  defaultValue?: string
  styles?: string
  labelStyles?: string
  currency?: string[]
}

type Props = ContainerProps

const Component: React.VFC<Props> = (props) => (
  <div>
    {props.label && (
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
        {props.label}
      </label>
    )}
    {/* テキストエリア */}
    {props.type === 'textarea' ? (
      <textarea
        name={props.id}
        id={props.id}
        rows={2}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        {...props.register}
        className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full px-3 md:px-5 text-xs md:text-sm border-gray-300 rounded-md resize-none ${props.styles}`}
      />
    ) : // 読み取り専用枠なし
    props.type === 'url' ? (
      <textarea
        name={props.id}
        id={props.id}
        rows={3}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        readOnly={true}
        {...props.register}
        className={`block w-full px-3 md:px-5 text-xs md:text-sm border-0 ring-0 focus:ring-0 resize-none `}
      />
    ) : (
      //以外
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
        <input
          type={props.type}
          name={props.id}
          id={props.id}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-3 md:px-5 text-base border-gray-300 rounded-md"
          defaultValue={props.defaultValue}
          {...props.register}
          placeholder={props.placeholder}
        />
      </div>
    )}
  </div>
)

const Container: React.VFC<ContainerProps> = (props) => {
  return <Component {...props} />
}

export default Container
