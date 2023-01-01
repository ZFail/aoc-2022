import { getDemoInput, getInput, notNull, range, sum } from '../utils'

type Room = {
  idx: number
  name: string
  rate: number
  tunnelNames: string[]
  tunnels: Room[]
  tunnelsArr: number[]
  distances: number[]
}

const distance = (a: Room, b: Room) => {
  let front: Set<Room> = new Set([a])
  let visited: Set<Room> = new Set([a])
  let dist = 0
  while (!front.has(b)) {
    front = new Set(
      [...front]
        .map((it) => {
          return it.tunnels.filter((t) => !visited.has(t))
        })
        .flat()
    )
    visited = new Set([...visited, ...front])
    dist += 1
    if (front.size === 0) throw new Error('ub')
  }
  return dist
}

const solution = (input: string) => {
  const rooms: Room[] = input.split('\n').map((it, idx) => {
    const parts = it.split(' ')
    return {
      idx,
      name: parts[1],
      rate: parseInt(parts[4].split('=').pop().split(';').shift()),
      tunnelNames: parts.slice(9).map((it) => it.split(',').shift()),
      tunnels: [],
      tunnelsArr: [],
      distances: [],
    }
  })
  rooms.forEach((it) => {
    it.tunnels = it.tunnelNames.map((name) =>
      rooms.find((it) => it.name === name)
    )
  })
  rooms.forEach((_, i) => {
    rooms.forEach((_, j) => {
      rooms[i].tunnelsArr[j] = rooms[i].tunnelNames.includes(rooms[j].name)
        ? 1
        : 0
      rooms[i].distances[j] = distance(rooms[i], rooms[j])
    })
  })

  const startRoom = rooms.find((it) => it.name === 'AA')

  type PlayerState = {
    currentRoom: Room
    time: number
  }
  type State = {
    players: PlayerState[]
    notVisited: Room[]
    released: number
    prevState?: State
  }

  let states: State[] = [
    {
      players: [
        {
          currentRoom: startRoom,
          time: 0,
        },
        {
          currentRoom: startRoom,
          time: 0,
        },
      ],
      notVisited: rooms.filter((it) => it.rate !== 0),
      released: 0,
    },
  ]

  const endTime = 26

  const resultedStates: State[] = []

  function calcPlayerStep(to: Room, playerState: PlayerState) {
    const time =
      playerState.time + playerState.currentRoom.distances[to.idx] + 1
    if (time >= endTime) return null
    return {
      time,
      released: (endTime - time) * to.rate,
      toRoom: to,
    }
  }

  while (states.length > 0) {
    states = states
      .map((state) => {
        const newStates: State[] = []
        if (state.players.length === 2 && state.notVisited.length >= 2) {
          for (const i of range(state.notVisited.length)) {
            for (const j of range(state.notVisited.length)) {
              if (i === j) continue
              const playerToRoom = [state.notVisited[i], state.notVisited[j]]
              const newPlayerStep = state.players.map((player, idx) =>
                calcPlayerStep(playerToRoom[idx], player)
              )
              if (!newPlayerStep.every(notNull)) continue
              newStates.push({
                players: newPlayerStep.map((it) => ({
                  currentRoom: it.toRoom,
                  time: it.time,
                })),
                notVisited: state.notVisited.filter(
                  (it) => !newPlayerStep.map((it) => it.toRoom).includes(it)
                ),
                released:
                  state.released +
                  newPlayerStep.map((it) => it.released).reduce(sum, 0),
              })
            }
          }
        }
        for (const player of state.players) {
          for (const toRoom of state.notVisited) {
            const newPlayerStep = calcPlayerStep(toRoom, player)
            if (!newPlayerStep) continue
            newStates.push({
              players: [
                {
                  currentRoom: newPlayerStep.toRoom,
                  time: newPlayerStep.time,
                },
              ],
              notVisited: state.notVisited.filter((it) => it !== toRoom),
              released: state.released + newPlayerStep.released,
            })
          }
        }
        if (newStates.length === 0) {
          resultedStates.push(state)
        }
        return newStates
      })
      .flat()
  }

  console.log(resultedStates.length)

  return resultedStates.sort((a, b) => a.released - b.released).pop().released
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
