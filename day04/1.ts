import { getDemoInput, getInput, sum } from '../utils'

const rangeIncludes = (s: number[], d: number[]) => {
  if (s[0] > s[1]) throw Error('ub')
  if (d[0] > d[1]) throw Error('ub')
  return s[0] <= d[0] && s[1] >= d[1]
}

const rangeOverlapses = (r1: number[], r2: number[]) =>
  rangeIncludes(r1, r2) || rangeIncludes(r2, r1)

const solution = (input: string) =>
  input
    .split('\n')
    .map((it) =>
      it.split(',').map((it) => it.split('-').map((it) => parseInt(it)))
    )
    .map((it) => (rangeOverlapses(it[0], it[1]) ? 1 : 0))
    .reduce(sum, 0)

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
