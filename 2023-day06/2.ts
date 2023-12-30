import { getDemoInput, getInput } from '../utils'

const solution = (input: string) => {
  const [time, distance] = input
    .split('\n')
    .map((it) => parseInt(it.split(':')[1].replaceAll(' ', '')))
  const d = Math.sqrt(time * time - 4 * distance)
  const x1 = Math.ceil((d + time) / 2)
  const x2 = Math.ceil((time - d) / 2)
  return x1 - x2
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
