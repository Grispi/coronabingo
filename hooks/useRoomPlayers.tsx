import { useContext } from 'react'
import { FirebaseContext } from '~/contexts/Firebase'
import { Player } from '~/components/Players'

export default function useRoomPlayers() {
  const { currentPlayer, players, setPlayers } = useContext(FirebaseContext)

  const setPlayer = (player: Player) => {
    const playerIndex = players.map(p => p.id).indexOf(player.id)
    const playersCopy = [...players]
    if (playerIndex > -1) {
      playersCopy[playerIndex] = player
      setPlayers(playersCopy)
    }
  }

  return { player: currentPlayer, players, setPlayer, setPlayers }
}
