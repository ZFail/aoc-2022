import { getDemoInput, getInput, sum } from '../utils'

const solution = (input: string) =>
  input
    .trim()
    .split('\n\n')
    .map((it) =>
      it
        .split('\n')
        .map((strVal) => parseInt(strVal))
        .reduce(sum, 0)
    )
    .sort((a, b) => (a > b ? -1 : 1))
    .splice(0, 3)
    .reduce(sum, 0)

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
