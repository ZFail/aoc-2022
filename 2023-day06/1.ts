import { getDemoInput, getInput, mul, range } from '../utils'

const solution = (input: string) => {
  const [times, distances] = input.split('\n').map((it) =>
    it
      .split(' ')
      .slice(1)
      .filter((it) => it.length)
      .map((it) => parseInt(it))
  )
  return times
    .map((time, idx) => {
      const distance = distances[idx]
      return range(time)
        .slice(1)
        .filter((timePressButton) => {
          const resultDistance = (time - timePressButton) * timePressButton
          return resultDistance > distance
        }).length
    })
    .reduce(mul, 1)
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
