import { sum, getDemoInput, getInput, range } from '../utils'

const solution = (input: string) => {
  const barriers = [20, 60, 100, 140, 180, 220]

  const lines = input.split('\n')
  let x = 1
  let currentCycle = 0
  let sum = 0
  for (const line of lines) {
    const [instruction, incXStr] = line.split(' ')
    let incX = 0
    if (instruction === 'noop') {
      currentCycle += 1
    } else {
      currentCycle += 2
      incX = parseInt(incXStr)
    }
    if (barriers.length && currentCycle >= barriers[0]) {
      sum += barriers.shift()! * x
    }
    x += incX
  }
  return sum
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
