import { getDemoInput, getInput, sum, max } from '../utils'

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
    .reduce(max, 0)

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
