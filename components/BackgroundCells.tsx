import classnames from 'classnames'
import { Fragment, useContext } from 'react'
import { BackgroundCellContext } from '~/contexts/BackgroundCellContext'
import { BACKGROUND_CELL_VALUES } from '~/utils/constants'
import InputText from './InputText'

export default function BackgroundCells() {
  const { backgroundCell, setBackgroundCell } = useContext(
    BackgroundCellContext
  )

  return (
    <Fragment>
      <div className="flex flex-wrap -mb-2">
        {BACKGROUND_CELL_VALUES.map((bc, i) => (
          <label
            key={bc.value}
            htmlFor={i.toString()}
            className={classnames([
              'bg-gray-100 border-2 border-gray-300 cursor-pointer mb-2 mr-4 px-4 py-2 rounded',
              'w-full text-center',
              'focus-within:outline-none focus-within:shadow-outline',
              'duration-150 ease-in-out transition',
              backgroundCell.value === bc.value && 'bg-gray-300 border-gray-600'
            ])}
          >
            <input
              type="radio"
              name="background"
              id={i.toString()}
              className="visually-hidden"
              onChange={() =>
                setBackgroundCell({
                  type: bc.type,
                  value: bc.value
                })
              }
              defaultChecked={backgroundCell.value === bc.value}
            />
            <span>{bc.name}</span>
          </label>
        ))}
      </div>
      <div className="-mb-4 mt-4">
        <InputText
          id="background"
          label="Link a una imágen en internet"
          onChange={value => {
            setBackgroundCell({
              type: 'url',
              value
            })
          }}
          value={(backgroundCell.type === 'url' && backgroundCell.value) || ''}
        />
      </div>
    </Fragment>
  )
}
