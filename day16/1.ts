import { getDemoInput, getInput } from '../utils'

type Room = {
  name: string
  rate: number
  tunnelNames: string[]
  tunnels: Room[]
  tunnelsArr: number[]
  distances: number[]
}

const solution = (input: string) => {
  const rooms = input.split('\n').map((it) => {
    const parts = it.split(' ')
    return {
      name: parts[1],
      rate: parseInt(parts[4].split('=').pop().split(';').shift()),
      tunnelNames: parts.slice(9).map((it) => it.split(',').shift()),
      tunnels: [] as Room[],
      tunnelsArr: [] as number[],
      distances: [] as number[],
    }
  })
  rooms.forEach((it) => {
    it.tunnels = it.tunnelNames.map((name) =>
      rooms.find((it) => it.name === name)
    )
  })

  const distance = (a: Room, b: Room) => {
    let front: Set<Room> = new Set([a])
    let visited: Set<Room> = new Set([a])
    let dist = 0
    while (front.size > 0 && !front.has(b)) {
      front = new Set(
        [...front]
          .map((it) => {
            return it.tunnels.filter((t) => !visited.has(t))
          })
          .flat()
      )
      visited = new Set([...visited, ...front])
      dist += 1
    }
    return dist
  }
  rooms.forEach((_, i) => {
    rooms.forEach((_, j) => {
      const a = rooms[i].tunnelNames.includes(rooms[j].name) ? 1 : 0
      rooms[i].tunnelsArr[j] = a
      rooms[i].distances[j] = distance(rooms[i], rooms[j])
    })
  })
  rooms.forEach((it) => {
    console.log(it.tunnelsArr.join(','))
  })
  console.log('')
  rooms.forEach((it) => {
    console.log(it.distances.join(','))
  })
  rooms.forEach((it) => {
    console.log(it.name, it.rate === 0 ? '' : it.rate)
  })
  // return rooms
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
