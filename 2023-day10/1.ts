import { getDemoInput, getInput } from '../utils'

const vertical = {
  S: '|┘└',
  '-': '',
  '|': 'S|┘└',
  '┌': 'S|┘└',
  '┐': 'S|┘└',
  '┘': '',
  '└': '',
  '.': '',
}
const horizontal = {
  S: '-┐┘',
  '-': 'S-┐┘',
  '|': '',
  '┌': 'S-┐┘',
  '┐': '',
  '┘': '',
  '└': 'S-┐┘',
  '.': '',
}
const solution = (input: string) => {
  const maze = input
    .replaceAll('F', '┌')
    .replaceAll('7', '┐')
    .replaceAll('L', '└')
    .replaceAll('J', '┘')
    .split('\n')
    .map((it) => it.split(''))
  const size = [maze.length, maze[0].length]
  const [sy, sx] = size
  const path = maze.map((it) => it.map(() => 0))
  let start = [0, 0] as [number, number]
  for (let x = 0; x < sx; ++x) {
    for (let y = 0; y < sy; ++y) {
      if (maze[y][x] === 'S') {
        start = [y, x]
        path[y][x] = 1
      }
    }
  }
  let front = [start]
  let frontVal = 0
  while (front.length) {
    let newFront: [number, number][] = []
    front.forEach((coord) => {
      const up = [coord[0] - 1, coord[1]] as [number, number]
      const down = [coord[0] + 1, coord[1]] as [number, number]
      const left = [coord[0], coord[1] - 1] as [number, number]
      const right = [coord[0], coord[1] + 1] as [number, number]
      const fillPath = (
        from: [number, number],
        to: [number, number],
        dir: typeof vertical | typeof horizontal,
        invert: boolean
      ) => {
        if (maze[from[0]]?.[from[1]] === undefined) return
        if (maze[to[0]]?.[to[1]] === undefined) return
        if (dir[maze[from[0]][from[1]]].includes(maze[to[0]][to[1]])) {
          if (invert) {
            ;[from, to] = [to, from]
          }
          if (path[to[0]][to[1]] !== 0) return
          frontVal = path[from[0]][from[1]] + 1
          path[to[0]][to[1]] = frontVal
          newFront.push(to)
        }
      }
      fillPath(coord, down, vertical, false)
      fillPath(coord, right, horizontal, false)
      fillPath(up, coord, vertical, true)
      fillPath(left, coord, horizontal, true)
    })
    front = newFront
  }
  return frontVal - 1
}

console.log(solution(getDemoInput()))
console.log(solution(getDemoInput(2)))
console.log(solution(getInput()))
