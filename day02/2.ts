import { getDemoInput, getInput, sum } from '../utils'

function getScore(f: string, s: string) {
  switch (s) {
    case 'X':
      switch (f) {
        case 'A':
          return 3 + 0
        case 'B':
          return 1 + 0
        case 'C':
          return 2 + 0
      }
      break
    case 'Y':
      switch (f) {
        case 'A':
          return 1 + 3
        case 'B':
          return 2 + 3
        case 'C':
          return 3 + 3
      }
      break
    case 'Z':
      switch (f) {
        case 'A':
          return 2 + 6
        case 'B':
          return 3 + 6
        case 'C':
          return 1 + 6
      }
      break
  }
  throw Error('ub')
}

const solution = (input: string) =>
  input
    .split('\n')
    .map((it) => {
      const [f, c] = it.split(' ')
      return getScore(f, c)
    })
    .reduce((a, v) => a + v, 0)

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
