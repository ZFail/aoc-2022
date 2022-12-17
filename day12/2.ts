import { getDemoInput, getInput, range } from '../utils'

type Coord = [col: number, row: number]

const solution = (input: string) => {
  let start: Coord | undefined
  let end: Coord | undefined
  const heights2d = input.split('\n').map((it, row) =>
    it
      .split('')
      .map((char, col) => {
        switch (char) {
          case 'S':
            start = [row, col]
            return 0
          case 'E':
            end = [row, col]
            return 'z'.charCodeAt(0) - 'a'.charCodeAt(0)
        }
        return char.charCodeAt(0) - 'a'.charCodeAt(0)
      })
      .map((h, col) => ({
        height: h,
        dist: 0,
        coord: [row, col] as Coord,
      }))
  )
  const heights = heights2d.flat()
  if (!start) throw new Error('ub')
  if (!end) throw new Error('ub')
  const size: Coord = [heights2d.length, heights2d[0].length]
  const startCell = heights2d[end[0]][end[1]]
  let lastFilledCells = [startCell]
  const getNeighbours = (coord: Coord) => {
    return [
      [coord[0] + 1, coord[1]],
      [coord[0] - 1, coord[1]],
      [coord[0], coord[1] + 1],
      [coord[0], coord[1] - 1],
    ]
      .filter((c) => c.every((v, idx) => v >= 0 && v < size[idx]))
      .map((c) => heights2d[c[0]][c[1]])
  }
  function notNull<T>(val: T): val is NonNullable<T> {
    return val != null
  }

  let endCell: typeof startCell | undefined
  while (lastFilledCells.length > 0) {
    lastFilledCells = lastFilledCells
      .map((cell) => {
        return getNeighbours(cell.coord)
          .map((neightbour) => {
            if (cell.height - neightbour.height <= 1 && neightbour.dist === 0) {
              neightbour.dist = cell.dist + 1
              if (neightbour.height === 0 && endCell === undefined) {
                endCell = neightbour
              }
              return neightbour
            }
          })
          .filter(notNull)
      })
      .flat()
  }
  heights2d.forEach((row, rowIdx) => {
    row.forEach((cell) => {
      process.stdout.write(cell.height.toString().padStart(4, ' '))
    })
    process.stdout.write('\n')
    row.forEach((cell) => {
      process.stdout.write(cell.dist.toString().padStart(4, ' '))
    })
    process.stdout.write('\n')
    process.stdout.write('\n')
  })

  return endCell!.dist
}
console.log(solution(getDemoInput()))
console.log(solution(getInput()))
