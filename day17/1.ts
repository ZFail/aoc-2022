import { after } from 'node:test'
import { getDemoInput, getInput, range } from '../utils'

type Rock = number[][]

const rocks: Rock[] = [
  [[1, 1, 1, 1]],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  [[1], [1], [1], [1]],
  [
    [1, 1],
    [1, 1],
  ],
]

type Pos = [row: number, col: number]

const solution = (input: string) => {
  const width = 7
  const rockCount = 2022
  const chamber = range(rockCount * 4).map((it) => {
    const line: number[] = Array(width + 2).fill(0)
    line[0] = 1
    line[line.length - 1] = 1
    if (it === 0) line.fill(1)
    return line
  })

  function canRockFallTo(pos: Pos, rock: Rock) {
    return rock.every((row, rowIdx) =>
      row.every((it, colIdx) => {
        if (it === 0) return true
        if (chamber[pos[0] + rowIdx][pos[1] + colIdx] === 0) return true
        return false
      })
    )
  }
  function setRockTo(pos: Pos, rock: Rock) {
    return rock.forEach((row, rowIdx) =>
      row.forEach((it, colIdx) => {
        if (it) chamber[pos[0] + rowIdx][pos[1] + colIdx] = 2
      })
    )
  }
  function isLeftMove(tick: number) {
    return input.charAt(tick % input.length) === '<'
  }

  let towerHeight = 0
  let tick = 0
  for (const rockIdx of range(2022)) {
    const currentRock: Rock = rocks[rockIdx % rocks.length]
    let rockPos: Pos = [towerHeight + 4, 3]
    while (true) {
      const afterJetRockPos: Pos = [
        rockPos[0],
        rockPos[1] + (isLeftMove(tick) ? -1 : 1),
      ]
      if (canRockFallTo(afterJetRockPos, currentRock)) {
        rockPos = afterJetRockPos
      }
      const nextRockPos: Pos = [rockPos[0] - 1, rockPos[1]]
      tick += 1
      if (!canRockFallTo(nextRockPos, currentRock)) {
        break
      }
      rockPos = nextRockPos
    }
    setRockTo(rockPos, currentRock)
    towerHeight = Math.max(towerHeight, rockPos[0] + currentRock.length - 1)
  }
  // for (const a of range(200)) {
  //   console.log(chamber[199 - a].join(''))
  // }
  return towerHeight
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
