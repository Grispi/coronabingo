import useTranslation from 'next-translate/useTranslation'
import React, { Fragment } from 'react'
import { BOARD_NUMBER_COLOR } from '~/utils/constants'
import Anchor from './Anchor'
import Ball from './Ball'

interface Props {
  selectedNumbers: number[]
}

export default function LastNumbers({ selectedNumbers }: Props) {
  const { t } = useTranslation()
  const [last, ...rest] = selectedNumbers

  return (
    <Fragment>
      {!!last && (
        <Fragment>
          <div className="flex items-center overflow-hidden">
            <div style={{ flex: '0 0 85px' }}>
              <Ball
                animate
                color={BOARD_NUMBER_COLOR[last - 1]}
                number={last}
                size={75}
              />
            </div>
            <div className="flex flex-auto overflow-x-scroll">
              {rest.map(n => (
                <div
                  className="opacity-50"
                  key={n}
                  style={{ flex: '0 0 65px' }}
                >
                  <Ball
                    color={BOARD_NUMBER_COLOR[n - 1]}
                    number={n}
                    size={55}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="flex-auto font-medium">{t(`jugar:dreams.${last}`)}</p>
            <p className="text-right md:text-sm w-24">
              <Anchor href="https://es.wikipedia.org/wiki/Quiniela_(Argentina)">
                {t('jugar:dreams-link')}
              </Anchor>
            </p>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}
