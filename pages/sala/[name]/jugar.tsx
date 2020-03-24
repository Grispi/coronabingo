import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Boards from '~/components/Boards'
import Message from '~/components/Message'
import SelectedNumbers from '~/components/SelectedNumbers'
import TurningGlob from '~/components/TurningGlob'
import { roomsRef } from '~/utils/firebase'

export default function Jugar() {
  const router = useRouter()
  const roomName = router.query.name?.toString()
  const playerId = router.query.jugador?.toString()
  const [room, setRoom] = useState<
    firebase.firestore.DocumentData | undefined
  >()
  const [player, setPlayer] = useState<
    firebase.firestore.DocumentData | undefined
  >()
  const isAdmin = room?.adminId === playerId

  useEffect(() => {
    if (!roomName) return

    const unsubscribe = roomsRef.doc(roomName).onSnapshot(doc => {
      setRoom(doc.data())
    })

    return unsubscribe
  }, [roomName])

  useEffect(() => {
    if (!playerId || !roomName) return

    const unsubscribe = roomsRef
      .doc(roomName)
      .collection('players')
      .doc(playerId)
      .onSnapshot(doc => {
        setPlayer({
          id: doc.id,
          ...doc.data()
        })
      })

    return unsubscribe
  }, [playerId, roomName])

  const onNewNumber = (n: number) => {
    roomsRef.doc(roomName).update({
      selectedNumbers: [n, ...room?.selectedNumbers]
    })
  }

  return (
    <div className="px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-medium text-center text-xl">Sala {roomName}</h2>
        {!room && (
          <div className="md:w-2/4 mx-auto">
            <Message type="information">
              Cargando información de la sala...
            </Message>
          </div>
        )}
        {room && room.turningGlob && (
          <TurningGlob
            isAdmin={isAdmin}
            onNewNumber={onNewNumber}
            selectedNumbers={room?.selectedNumbers}
          />
        )}
        {player && <Boards boards={player.boards} />}
        {room && room.selectedNumbers && (
          <SelectedNumbers
            enableForAdmin={isAdmin && !room.turningGlob}
            onNewNumber={onNewNumber}
            selectedNumbers={room.selectedNumbers}
          />
        )}
      </div>
    </div>
  )
}
