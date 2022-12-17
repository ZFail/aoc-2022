import { getDemoInput, getInput, range } from '../utils'

type Coord = [col: number, row: number]
type Line = [Coord, Coord]

const solution = (input: string) => {
  const lineStrips = input.split('\n').map((it) =>
    it.split('->').map(
      (it) =>
        it
          .trim()
          .split(',')
          .map((it) => parseInt(it)) as Coord
    )
  )
  function lineStripToLines(linestrip: Coord[]) {
    return linestrip
      .slice(0, -1)
      .map((start, idx) => [start, linestrip[idx + 1]] as Line)
  }
  let lines = lineStrips.map((it) => lineStripToLines(it)).flat(1)
  const points = lines.flat(1)
  let minCoord = points.reduce(
    (a, b) => a.map((_, idx) => Math.min(a[idx], b[idx])),
    [points[0][0], 0]
  )
  let maxCoord = points.reduce(
    (a, b) => a.map((_, idx) => Math.max(a[idx], b[idx])),
    points[0]
  )

  maxCoord[1] += 2
  const startPoint: Coord = [500, 0]
  const floorLine: Line = [
    [startPoint[0] - maxCoord[1] - 1, maxCoord[1]],
    [startPoint[0] + maxCoord[1] + 1, maxCoord[1]],
  ]
  lines.push(floorLine)

  minCoord[0] = Math.min(floorLine[0][0], minCoord[0])
  maxCoord[0] = Math.max(floorLine[1][0], maxCoord[0])

  const size: Coord = [
    maxCoord[0] - minCoord[0] + 1,
    maxCoord[1] - minCoord[1] + 1,
  ]
  const cave: number[] = Array(size[0] * size[1]).fill(0)
  const pointToRel = (p: Coord): Coord => [
    p[0] - minCoord[0],
    p[1] - minCoord[1],
  ]
  const lineToDots = (line: Line) => {
    if (line[0][0] === line[1][0]) {
      const from = Math.min(line[0][1], line[1][1])
      const to = Math.max(line[0][1], line[1][1]) + 1
      return range(to - from).map((idx) => [line[0][0], idx + from] as Coord)
    } else {
      const from = Math.min(line[0][0], line[1][0])
      const to = Math.max(line[0][0], line[1][0]) + 1
      return range(to - from).map((idx) => [idx + from, line[0][1]] as Coord)
    }
  }

  const coordToCaveOffeset = (p: Coord) => p[1] * size[0] + p[0]
  function getCaveValue(p: Coord) {
    if (!p.every((v, idx) => v >= 0 && v < size[idx])) return 'outOfBounds'
    return cave[coordToCaveOffeset(p)]
  }
  function setCaveValue(p: Coord, value: number) {
    if (!p.every((v, idx) => v >= 0 && v < size[idx])) throw new Error('ub')
    cave[coordToCaveOffeset(p)] = value
  }

  lines
    .map((line) => lineToDots(line))
    .flat(1)
    .map((it) => pointToRel(it))
    .forEach((dot) => {
      setCaveValue(dot, 1)
    })

  function drawCave() {
    range(size[1]).forEach((row) => {
      range(size[0]).forEach((col) => {
        process.stdout.write(getCaveValue([col, row]).toString())
      })
      process.stdout.write('\n')
    })
  }

  function tryGo(p: Coord) {
    const v = getCaveValue(p)
    if (v === 'outOfBounds') return 'outOfBounds'
    if (v !== 0) return 'busy'
    return 'ok'
  }

  function tryFallDown(p: Coord) {
    const newPositions: Coord[] = [
      [p[0], p[1] + 1],
      [p[0] - 1, p[1] + 1],
      [p[0] + 1, p[1] + 1],
    ]
    for (let newPos of newPositions) {
      const r = tryGo(newPos)
      if (r === 'outOfBounds') return 'outOfBounds'
      if (r === 'ok') return newPos
    }
    return 'busy'
  }

  const startPointRel = pointToRel(startPoint)

  const dropSand = () => {
    if (getCaveValue(startPointRel) !== 0) {
      return 'busy'
    }
    let curPoint = startPointRel
    while (true) {
      const res = tryFallDown(curPoint)
      if (res === 'busy') {
        setCaveValue(curPoint, 2)
        return 'dropped'
      }
      if (res === 'outOfBounds') {
        return 'outOfBounds'
      }
      curPoint = res
    }
  }

  let sandsDown = 0
  while (true) {
    const res = dropSand()
    if (res === 'outOfBounds') {
      throw new Error('ub')
    }
    if (res === 'busy') {
      break
    }
    sandsDown += 1
  }
  drawCave()

  return sandsDown
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
