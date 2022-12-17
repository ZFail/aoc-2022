import { getDemoInput, getInput, sum } from '../utils'

type V = number | Array<V>

function compareValues(a: V, b: V): number {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b
  }
  a = Array.isArray(a) ? a : [a]
  b = Array.isArray(b) ? b : [b]
  for (let i = 0; i < Math.min(a.length, b.length); ++i) {
    const c = compareValues(a[i], b[i])
    if (c !== 0) return c
  }
  if (a.length === b.length) return 0
  return a.length - b.length
}

const solution = (input: string) => {
  const listOfPairs = input
    .split('\n\n')
    .map(
      (it) => it.split('\n').map((it) => JSON.parse(it) as V[]) as [V[], V[]]
    )

  return listOfPairs
    .map((pair, idx) => {
      const c = compareValues(pair[0], pair[1])
      if (c === 0) throw new Error('ub')
      return c
    })
    .map((c, idx) => (c < 0 ? idx + 1 : 0))
    .reduce(sum, 0)
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
