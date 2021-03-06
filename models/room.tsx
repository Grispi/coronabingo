import { Room, RoomBase } from '~/interfaces'
import { roomsRef, Timestamp } from '~/utils/firebase'

const defaultRoomData: RoomBase = {
  adminId: '',
  bingoSpinner: true,
  confettiType: '',
  date: null,
  name: '',
  readyToPlay: false,
  selectedNumbers: [],
  soundToPlay: '',
  videoCall: '',
}

const createRoom = (room: Partial<RoomBase>): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const roomDoc = roomsRef.doc()
      const roomId = roomDoc.id

      await roomDoc.set(
        Object.assign({}, defaultRoomData, room, {
          date: Timestamp.fromDate(new Date()),
        }),
      )

      resolve(roomId)
    } catch (error) {
      reject(error)
    }
  })
}

const excludeExtraFields = (room: Room): RoomBase => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { exists, id, ref, ...roomValues } = room

  return roomValues
}

const updateRoom = (
  roomRef: firebase.firestore.DocumentReference,
  roomData: Partial<RoomBase>,
): Promise<void> => {
  return roomRef.update(roomData)
}

const roomApi = {
  createRoom,
  excludeExtraFields,
  updateRoom,
}

export default roomApi
export { defaultRoomData }
