import { getDemoInput, getInput } from '../utils'

const solution = (input: string) => {
  const blueprints = input.split('\n').map((it) => {
    const parts = it.split(' ')
    return {
      ore: {
        ore: parseInt(parts[6]),
      },
      clay: {
        ore: parseInt(parts[12]),
      },
      obsidian: {
        ore: parseInt(parts[18]),
        clay: parseInt(parts[21]),
      },
      geode: {
        ore: parseInt(parts[27]),
        obsidian: parseInt(parts[30]),
      },
    }
  })
  return blueprints
}

console.log(solution(getDemoInput()))
// console.log(solution(getInput()))
