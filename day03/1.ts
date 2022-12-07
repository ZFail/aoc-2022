import { getDemoInput, getInput, sum } from '../utils'

export const charWeight = (ch: string | undefined) => {
  if (ch === undefined) throw Error('ub')
  const code = ch.charCodeAt(0)
  if (code >= 'a'.charCodeAt(0) && code <= 'z'.charCodeAt(0)) {
    return code - 'a'.charCodeAt(0) + 1
  }
  return code - 'A'.charCodeAt(0) + 27
}

const solution = (input: string) =>
  input
    .split('\n')
    .map((it) => {
      const first = it.split('')
      const second = first.splice(0, first.length / 2)
      return charWeight(first.find((it) => second.includes(it)))
    })
    .reduce(sum, 0)

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
