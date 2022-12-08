import { sum, getDemoInput, getInput } from '../utils'

const solution = (input: string) => {
  const rows = input
    .split('\n')
    .map((it) => it.split('').map((it) => parseInt(it)))

  const size = rows.length
  if (!rows.every((it) => it.length === size)) throw Error('ub')

  // console.log(rows)
  const cols = rows.map((_, row) => rows.map((_, col) => rows[col][row]))

  const perimiterLength = (size - 1) * 4

  const isTreeVisible = (x: number, y: number) => {
    const height = rows[x][y]
    if (rows[x].slice(0, y).every((h) => h < height)) {
      // console.log('p1', rows[x].slice(0, y))
      return true
    }

    if (rows[x].slice(y + 1).every((h) => h < height)) {
      // console.log('p2', rows[x].slice(y + 1, size - y))
      return true
    }
    if (cols[y].slice(0, x).every((h) => h < height)) {
      // console.log('p3', cols[y].slice(0, x))
      return true
    }
    if (cols[y].slice(x + 1).every((h) => h < height)) {
      // console.log('p4', cols[y].slice(x + 1, size - x))
      return true
    }
    return false
  }
  let visibleCount = perimiterLength
  for (let x = 1; x < size - 1; ++x) {
    for (let y = 1; y < size - 1; ++y) {
      // console.log(`[${x}, ${y}] ${rows[x][y]} ${isTreeVisible(x, y)}`)
      if (isTreeVisible(x, y)) {
        visibleCount++
      }
    }
  }
  return visibleCount
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
