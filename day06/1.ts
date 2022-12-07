import { sum, getDemoInput, getInput } from '../utils'

const uniqueChars = 4

const solution = (input: string) => {
  const chars = input.split('')
  for (let i = uniqueChars - 1; i < chars.length; ++i) {
    const lastUniqueSet = new Set(chars.slice(i - uniqueChars + 1, i + 1))
    if (lastUniqueSet.size === uniqueChars) {
      return i + 1
    }
  }
  throw Error('ub')
}

console.log(solution(getDemoInput()))
console.log(solution(getDemoInput(2)))
console.log(solution(getDemoInput(3)))
console.log(solution(getDemoInput(4)))
console.log(solution(getDemoInput(5)))
console.log(solution(getInput()))
