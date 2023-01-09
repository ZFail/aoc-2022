import { getDemoInput, getInput, min, max, range } from '../utils'

type Coord = [x: number, y: number, z: number]

const solution = (input: string) => {
  const coords = input
    .split('\n')
    .map((it) => it.split(',').map((it) => parseInt(it)) as Coord)

  const minCoord = coords.reduce(
    (a, b) => a.map((_, idx) => min(a[idx], b[idx])) as Coord,
    coords[0]
  )
  const maxCoord = coords.reduce(
    (a, b) => a.map((_, idx) => max(a[idx], b[idx])) as Coord,
    coords[0]
  )
  const field = range(maxCoord[0] + 1).map((it) =>
    range(maxCoord[1] + 1).map(
      (it) => new Array(maxCoord[2] + 1).fill(0) as number[]
    )
  )
  function haveCubeAt(pos: Coord) {
    if (!pos.every((it, idx) => it >= minCoord[idx])) return false
    if (!pos.every((it, idx) => it <= maxCoord[idx])) return false
    return field[pos[0]][pos[1]][pos[2]] === 1
  }
  function calcAreaAt(pos: Coord) {
    return haveCubeAt(pos) ? 0 : 1
  }
  function calcCubeArea(pos: Coord) {
    return (
      calcAreaAt([pos[0] + 1, pos[1], pos[2]]) +
      calcAreaAt([pos[0] - 1, pos[1], pos[2]]) +
      calcAreaAt([pos[0], pos[1] + 1, pos[2]]) +
      calcAreaAt([pos[0], pos[1] - 1, pos[2]]) +
      calcAreaAt([pos[0], pos[1], pos[2] + 1]) +
      calcAreaAt([pos[0], pos[1], pos[2] - 1])
    )
  }
  coords.forEach((it) => (field[it[0]][it[1]][it[2]] = 1))
  return coords.reduce((acc, pos) => acc + calcCubeArea(pos), 0)
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
