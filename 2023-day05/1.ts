import { getDemoInput, getInput, min } from '../utils'

const solution = (input: string) => {
  const [seedsStr, ...mapsStr] = input.split('\n\n')
  const seeds = seedsStr
    .split(': ')[1]
    .split(' ')
    .filter((it) => it.length)
    .map((it) => parseInt(it))
  const maps = mapsStr.map((it) =>
    it
      .split('\n')
      .slice(1)
      .map((it) =>
        it
          .split(' ')
          .filter((it) => it.length)
          .map((it) => parseInt(it))
      )
  )
  return seeds
    .map((seed) => {
      return maps.reduce((value, map) => {
        const range = map.find(([dest, source, count]) => {
          return value >= source && value < source + count
        })
        if (range) {
          const [dest, source, count] = range
          return value - source + dest
        }
        return value
      }, seed)
    })
    .reduce(min, Number.MAX_SAFE_INTEGER)
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
