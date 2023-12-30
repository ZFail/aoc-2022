import { getDemoInput, getInput, min } from '../utils'

type Range = [start: number, count: number]
const intersectRanges = (s: Range, d: Range) => {
  
  return (s[0] >= d[0] && s[0] <= d[1]) || (s[1] >= d[0] && s[1] <= d[1])
}

const solution = (input: string) => {
  const [seedsStr, ...mapsStr] = input.split('\n\n')
  const seedRanges = seedsStr
    .split(': ')[1]
    .split(' ')
    .filter((it) => it.length)
    .map((it) => parseInt(it)).reduce(((acc,_,idx, arr) => {
      if (idx % 2 === 0) acc.push(arr.slice(idx, idx + 2) as [number, number])
      return acc
    }), [] as [start: number, count: number][])
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
// console.log(solution(getInput()))
