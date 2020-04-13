import classnames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import React, { Fragment, useEffect } from 'react'
import useBoards from '~/hooks/useBoards'
import useIOSDetection from '~/hooks/useIOSDetection'
import Box from './Box'
import Cells from './Cells'

interface Props {
  player: firebase.firestore.DocumentData
  room: firebase.firestore.DocumentData
  setPlayerProps: (props: {}) => void
}

export default function Boards({ player, room, setPlayerProps }: Props) {
  const boards = useBoards(player.boards)
  const { t } = useTranslation()
  const isIOS = useIOSDetection()

  useEffect(() => {
    if (room && player) {
      const update = () => {
        try {
          const roomValues = JSON.parse(
            localStorage.getItem('roomValues') || '{}',
          )
          const playerValues = roomValues?.[player.id] || {}
          player.ref.update(playerValues)
          localStorage.removeItem('roomValues')
        } catch (e) {
          console.error(e)
        }
      }

      const saveOnLeave = (e?: Event) => {
        localStorage.setItem(
          'roomValues',
          JSON.stringify({
            [player.id]: boards.reduce(
              (acc, board) => ({
                ...acc,
                [board.id]: player?.[board.id] || [],
              }),
              {},
            ),
          }),
        )

        return e && e.preventDefault()
      }

      update()

      /*
        Because onbeforeunload doesn't work on iOS devices
        we save every number on firebase
      */
      if (isIOS) {
        window.onpagehide = saveOnLeave
      } else {
        window.onbeforeunload = saveOnLeave
      }

      window.onpopstate = saveOnLeave
    }
  }, [boards, player, room])

  return (
    <Fragment>
      {boards.map((board, i) => (
        <div key={i} className={classnames([i !== 0 && 'mt-4'])}>
          <Box>
            <p className="font-semibold uppercase">
              {t('common:board', { boardId: board.id })}
            </p>
            <div className="border-l-2 border-t-2 border-gray-900 flex flex-wrap mt-2">
              <Cells
                boardNumbers={board.numbers}
                selectedNumbers={player?.[board.id]}
                setSelectedNumbers={newSelectedNumbers =>
                  setPlayerProps({
                    [board.id]: newSelectedNumbers,
                  })
                }
              />
            </div>
          </Box>
        </div>
      ))}
    </Fragment>
  )
}
