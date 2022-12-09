import { sum, getDemoInput, getInput, range } from '../utils'

type Coordinate = [number, number]
type Dir = 'U' | 'D' | 'L' | 'R'

const parseInput = (input: string) => {
  return input.split('\n').map((it) => {
    const [dir, count] = it.split(' ')
    return [dir as Dir, parseInt(count)] as [Dir, number]
  })
}

const coordToString = (value: Coordinate) => `${value[0]}=${value[1]}`

const moveHead = (head: Coordinate, dir: Dir): Coordinate => {
  switch (dir) {
    case 'U':
      return [head[0], head[1] + 1]
    case 'D':
      return [head[0], head[1] - 1]
    case 'L':
      return [head[0] - 1, head[1]]
    case 'R':
      return [head[0] + 1, head[1]]
  }
  throw Error('ub')
}

const moveTail = (head: Coordinate, tail: Coordinate): Coordinate => {
  const diff: Coordinate = [head[0] - tail[0], head[1] - tail[1]]
  if (Math.abs(diff[0]) < 2 && Math.abs(diff[1]) < 2) return tail
  if (Math.abs(diff[0]) >= 2 && Math.abs(diff[1]) >= 2) throw Error('ub')
  if (Math.abs(diff[0]) >= 2) {
    return [head[0] - Math.sign(diff[0]), head[1]]
  }
  if (Math.abs(diff[1]) >= 2) {
    return [head[0], head[1] - Math.sign(diff[1])]
  }
  throw Error('ub')
}

const solution = (input: string) => {
  let head: Coordinate = [0, 0]
  let tail: Coordinate = [0, 0]
  const steps = parseInput(input)
  // console.log(parseInput(input))
  const visited: Set<string> = new Set()
  steps.forEach((step) => {
    const [dir, count] = step
    range(count).map((it) => {
      // console.log(dir)
      head = moveHead(head, dir)
      tail = moveTail(head, tail)
      visited.add(coordToString(tail))
    })
  })
  return visited.size
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
