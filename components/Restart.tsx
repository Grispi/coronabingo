import Router from 'next-translate/Router'
import useTranslation from 'next-translate/useTranslation'
import React, { Fragment } from 'react'
import { FiThumbsUp } from 'react-icons/fi'
import { Room } from '~/interfaces'
import roomApi from '~/models/room'
import Button from './Button'

interface Props {
  room: Room
}

export default function Restart({ room }: Props) {
  const { t } = useTranslation()

  const replay = async () => {
    await roomApi.updateRoom(room.ref, { readyToPlay: false })

    Router.pushI18n('/room/[roomId]/admin', `/room/${room.id}/admin`)
  }

  return (
    <Fragment>
      <p>{t('jugar:replay.description')}</p>
      <div className="mt-8 text-center">
        <Button id="confirm" onClick={replay} color="green">
          <FiThumbsUp />
          <span className="ml-4">{t('jugar:replay.confirm')}</span>
        </Button>
      </div>
    </Fragment>
  )
}
