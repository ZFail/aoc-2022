import { getDemoInput, getInput } from '../utils'

const solution = (input: string) => {
  const rooms = input.split('\n').map((it) => {
    const parts = it.split(' ')
    return {
      name: parts[1],
      rate: parseInt(parts[4].split('=').pop().split(';').shift()),
      tunnels: parts.slice(9).map((it) => it.split(',').shift()),
      tunnelsArr: [],
    }
  })
  rooms.forEach((_, i) => {
    rooms.forEach((_, j) => {
      const a = rooms[i].tunnels.includes(rooms[j].name) ? 1 : 0
      rooms[i].tunnelsArr[j] = a
    })
  })
  rooms.forEach((it) => {
    console.log(it.tunnelsArr.join(','))
  })
  rooms.forEach((it) => {
    console.log(it.name, it.rate === 0 ? '' : it.rate)
  })
  // return rooms
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
