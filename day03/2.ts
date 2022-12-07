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
      return it.split('')
    })
    .reduce(
      (acc, v) =>
        (acc.at(-1) as string[][]).length < 3
          ? (acc.at(-1)?.push(v), acc)
          : (acc.push([v]), acc),
      [[] as string[][]]
    )
    .map((it) => {
      const [a, b, c] = it
      return charWeight(a.find((it) => b.includes(it) && c.includes(it)))
    })
    .reduce(sum, 0)

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
