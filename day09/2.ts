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
  if (Math.abs(diff[0]) >= 2 && Math.abs(diff[1]) >= 2) {
    return [head[0] - Math.sign(diff[0]), head[1] - Math.sign(diff[1])]
  }
  if (Math.abs(diff[0]) >= 2) {
    return [head[0] - Math.sign(diff[0]), head[1]]
  }
  if (Math.abs(diff[1]) >= 2) {
    return [head[0], head[1] - Math.sign(diff[1])]
  }
  throw Error('ub')
}

const numTails = 9

const solution = (input: string) => {
  let head: Coordinate = [0, 0]
  let tails: Coordinate[] = Array(numTails).fill([0, 0])
  // console.log(tails)
  const steps = parseInput(input)
  // console.log(parseInput(input))
  const visited: Set<string> = new Set()
  steps.forEach((step) => {
    const [dir, count] = step
    range(count).map((it) => {
      // console.log(dir)
      head = moveHead(head, dir)
      let lastTail = head
      tails = tails.map((tail, idx) => {
        // console.log(`move tail ${idx} ${tail} ${lastTail}`)
        const movedTail = moveTail(lastTail, tail)
        // console.log(`moved from ${tail} to ${movedTail}`)
        lastTail = movedTail
        return movedTail
      })
      // console.log(head, tails)
      visited.add(coordToString(tails.at(-1) as Coordinate))
    })
  })
  return visited.size
}

console.log(solution(getDemoInput()))
console.log(solution(getDemoInput(2)))
console.log(solution(getInput()))
