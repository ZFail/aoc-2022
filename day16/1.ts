import { getDemoInput, getInput } from '../utils'

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
      const a = rooms[i].tunnelNames.includes(rooms[j].name) ? 1 : 0
      rooms[i].tunnelsArr[j] = a
      rooms[i].distances[j] = distance(rooms[i], rooms[j])
    })
  })

  const startRoom = rooms.find((it) => it.name === 'AA')

  type State = {
    players: {
      room: Room
      time: number
    }[]
    notVisited: Room[]
    released: number
    prevState?: State
  }

  let states: State[] = [
    {
      players: [
        {
          room: startRoom,
          time: 0,
        },
        {
          room: startRoom,
          time: 0,
        },
      ],
      notVisited: rooms.filter((it) => it.rate !== 0),
      released: 0,
    },
  ]

  const endTime = 26

  const resultedStates: State[] = []

  while (states.length > 0) {
    states = states
      .map((state) => {
        const newStates: State[] = state.notVisited
          .map((toRoom0) => state.notVisited.map(toRoom1 => {
            const playerToRoom = [toRoom0, toRoom1]
            const newPlayerStates = state.players.map((player, idx) => {
              const toRoom = playerToRoom[idx]
              const time = player.time + player.room.distances[toRoom.idx] + 1
              return {
                room: toRoom,
                time,
              }
            })
            return {
              players: newPlayerStates,
              notVisited: state.notVisited.filter((it) => !newPlayerStates.map(it => it.room).includes(it)),
              released: state.released + (endTime - time) * toRoom.rate,
              prevState: state,
            } as State

          }).flat()
          .filter((it) => it.time < endTime)
        if (newStates.length === 0) {
          resultedStates.push(state)
        }
        return newStates
      })
      .flat()
  }

  // console.log(resultedStates.length)

  // rooms.forEach((_, i) => {
  //   rooms.forEach((_, j) => {
  //     const a = rooms[i].tunnelNames.includes(rooms[j].name) ? 1 : 0
  //     rooms[i].tunnelsArr[j] = a
  //     // rooms[i].distances[j] = distance(rooms[i], rooms[j])
  //   })
  // })
  // rooms.forEach((it) => {
  //   console.log(it.tunnelsArr.join(','))
  // })
  // console.log('')
  // rooms.forEach((it) => {
  //   console.log(it.distances.join(','))
  // })
  // rooms.forEach((it) => {
  //   console.log(it.name, it.rate === 0 ? '' : it.rate)
  // })
  return resultedStates.sort((a, b) => a.released - b.released).pop().released
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
