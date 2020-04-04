import classnames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { Fragment } from 'react'
import { FiChevronDown } from 'react-icons/fi'

interface IProps {
  disabled?: boolean
  hint?: string
  id: string
  label?: string
  onChange?: (value: string) => void
  options: IOption[]
  value: string
}

export default function Select({
  disabled = false,
  hint = '',
  id,
  label,
  onChange,
  options,
  value
}: IProps) {
  const { t } = useTranslation()

  return (
    <Fragment>
      <label htmlFor={id} className="flex flex-col">
        {label && <span className="mb-1">{label}</span>}
        <div className="relative">
          <select
            id={id}
            className={classnames([
              'appearance-none border-2 border-gray-300 h-12 leading-normal p-2 pr-8 rounded',
              'focus:border-gray-600 focus:outline-none focus:shadow-outline hover:border-gray-500',
              'duration-150 ease-in-out transition',
              'disabled:opacity-50'
            ])}
            value={value}
            onChange={event => onChange && onChange(event.target.value)}
            disabled={disabled}
          >
            {!value && (
              <option value={''}>{t('common:select-empty-option')}</option>
            )}
            {options.map(opt => (
              <option key={opt.name} value={opt.id}>
                {opt.name}
              </option>
            ))}
          </select>
          <div
            className="absolute right-0 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              top: '50%'
            }}
          >
            <FiChevronDown className="text-gray-500" />
          </div>
        </div>
      </label>
      {hint && (
        <p className="italic leading-normal mt-1 text-gray-600 text-sm">
          {hint}
        </p>
      )}
    </Fragment>
  )
}

interface IOption {
  id: string
  name: string
}
