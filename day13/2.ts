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
  const dividers = [[[2]], [[6]]]
  const listOfPairs = [
    ...input
      .replaceAll('\n\n', '\n')
      .split('\n')
      .map(
        (it) => it.split('\n').map((it) => JSON.parse(it) as V[]) as [V[], V[]]
      ),
    ...dividers,
  ]

  const sorted = listOfPairs.sort(compareValues)
  return (sorted.indexOf(dividers[0]) + 1) * (sorted.indexOf(dividers[1]) + 1)
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
