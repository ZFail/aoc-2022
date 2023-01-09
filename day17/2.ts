import { getDemoInput, getInput, range, sum } from '../utils'

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

function findRepeatedTailLength(sequence: number[]) {
  for (let tailLength = 1; tailLength < sequence.length; ++tailLength) {
    const maxRepeatsCount = Math.ceil(sequence.length / 2 / tailLength)
    let repeatIdx = 0
    for (; repeatIdx < maxRepeatsCount; ++repeatIdx) {
      let numIdx = 0
      for (; numIdx < tailLength; ++numIdx) {
        if (
          sequence[sequence.length - 1 - numIdx - tailLength * repeatIdx] !==
          sequence[sequence.length - 1 - numIdx - tailLength * (repeatIdx + 1)]
        )
          break
      }
      if (numIdx !== tailLength) break
    }
    if (repeatIdx === maxRepeatsCount) {
      return tailLength
    }
  }
  throw new Error('ub')
}

const solution = (input: string) => {
  const width = 7
  const simulatedRockCount = 200000
  const chamber = range(simulatedRockCount * 4).map((it) => {
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
  const heightDiffs: number[] = []
  for (const rockIdx of range(simulatedRockCount)) {
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
    const newTowerHeight = Math.max(
      towerHeight,
      rockPos[0] + currentRock.length - 1
    )
    heightDiffs.push(newTowerHeight - towerHeight)
    towerHeight = newTowerHeight
  }
  const repeatedSequenceLength = findRepeatedTailLength(heightDiffs)
  const rockCount = 1000000000000
  const rocksToCalc = rockCount - simulatedRockCount
  const repeatsCount = Math.floor(rocksToCalc / repeatedSequenceLength)
  const tailLength = rocksToCalc - repeatsCount * repeatedSequenceLength
  const repeatedSequence = heightDiffs.slice(-repeatedSequenceLength)
  const repeatedSequenceSum = repeatedSequence.reduce(sum, 0)
  const tailSequenceSum = repeatedSequence.slice(0, tailLength).reduce(sum, 0)
  const resultTowerHeight =
    towerHeight + repeatsCount * repeatedSequenceSum + tailSequenceSum
  console.log(
    repeatedSequenceLength,
    rocksToCalc,
    repeatsCount,
    tailLength,
    repeatedSequenceSum,
    tailSequenceSum,
    resultTowerHeight
  )

  return resultTowerHeight
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
