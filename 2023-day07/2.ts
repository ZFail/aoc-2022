import { getDemoInput, getInput, sum } from '../utils'
import groupBy from 'object.groupby'

const compareArrays = (a: number[], b: number[]) => {
  for (let i = 0; i < a.length; ++i) {
    const diff = a[i] - b[i]
    if (diff !== 0) return diff
  }
  return 0
}

const solution = (input: string) => {
  // console.log(input)
  const hands = input.split('\n').map((it) => {
    const [handStr, bidStr] = it.split(' ')
    const hand = handStr.split('').map((it) => {
      switch (it) {
        case 'T':
          return 10
        case 'J':
          return 1
        case 'Q':
          return 12
        case 'K':
          return 13
        case 'A':
          return 14
        default:
          return parseInt(it)
      }
    })
    const grouped = ((Object as any).groupBy as typeof groupBy)(
      hand,
      (it) => it
    )

    const jCount = grouped['1']?.length ?? 0
    delete grouped['1']
    const lengths = Object.values(grouped)
      .map((it) => it.length)
      .sort((a, b) => b - a)
    const strength = ((lengths[0] ?? 0) + jCount) * 10 + (lengths[1] ?? 0)
    return {
      hand: hand,
      lengths,
      strength,
      bid: parseInt(bidStr),
    }
  })
  hands.sort((a, b) =>
    compareArrays([a.strength, ...a.hand], [b.strength, ...b.hand])
  )
  // console.log(hands)
  return hands.map((it, idx) => it.bid * (idx + 1)).reduce(sum, 0)
}
console.log(solution(getDemoInput()))
console.log(solution(getInput()))
