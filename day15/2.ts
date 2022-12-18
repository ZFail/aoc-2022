import { compareNumber, getDemoInput, getInput, notNull } from '../utils'

type Coord = [x: number, y: number]
type Segment = [start: number, end: number]

const rangeIntersects = (s: Segment, d: Segment) => {
  if (s[0] > s[1]) throw Error('ub')
  if (d[0] > d[1]) throw Error('ub')
  return (s[0] >= d[0] && s[0] <= d[1]) || (s[1] >= d[0] && s[1] <= d[1])
}

const rangeOverlapses = (r1: Segment, r2: Segment) =>
  rangeIntersects(r1, r2) || rangeIntersects(r2, r1)

const manhattanDistance = (a: Coord, b: Coord) =>
  Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])

const solution = (input: string, row: number) => {
  const sensors = input.split('\n').map((it) => {
    const parts = it.split(' ')
    const coords = [parts[2], parts[3], parts[8], parts[9]].map((it) =>
      parseInt(it.split(',').shift()!.split(':').shift()!.split('=').pop()!)
    )
    const sensorPos = coords.splice(0, 2) as Coord
    const beaconPos = coords as Coord
    return {
      pos: sensorPos,
      radius: manhattanDistance(sensorPos, beaconPos),
      beacon: beaconPos,
    }
  })
  const rowSegments = sensors
    .map((sensor) => {
      const rowDelta = Math.abs(sensor.pos[1] - row)
      if (rowDelta > sensor.radius) return
      const r = sensor.radius - rowDelta
      return [sensor.pos[0] - r, sensor.pos[0] + r] as Segment
    })
    .filter(notNull)
    .sort((a, b) => compareNumber(a[0], b[0]))

  const notIntersectedSegments = rowSegments.reduce(
    (notIntersectedSegments, segment) => {
      const lastSeg = notIntersectedSegments.at(-1)
      if (rangeOverlapses(lastSeg, segment)) {
        lastSeg[0] = Math.min(lastSeg[0], segment[0])
        lastSeg[1] = Math.max(lastSeg[1], segment[1])
      } else {
        notIntersectedSegments.push(segment)
      }
      return notIntersectedSegments
    },
    [rowSegments[0]]
  )
  // console.log(notIntersectedSegments)
  const beaconsOnRow = [
    ...new Set(
      sensors.filter((it) => it.beacon[1] === row).map((it) => it.beacon[0])
    ),
  ]
  const beaconInSegment = (beacon: number, segment: Segment) =>
    beacon >= segment[0] && beacon <= segment[1]
  const beaconsInSegment = (segment: Segment) =>
    beaconsOnRow.reduce((a, b) => a + (beaconInSegment(b, segment) ? 1 : 0), 0)
  return notIntersectedSegments
}

// const a = getInput()
// for (let i = 0; i < 4000000; ++i) {
//   if (i % 40000 === 0) console.log(i / 4000000)
//   if (solution(getInput(), i).length > 1) console.log(i)
// }
console.log(solution(getInput(), 2906101))
console.log(solution(getInput(), 2906101)[0][1] * 4000000 + 2906101)
