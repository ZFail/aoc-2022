import { getDemoInput, getInput, sum } from '../utils'

const solution = (input: string) => {
  const games = input.split('\n').map(it => it.split(': ')[1].split(';').map(it => it.split(',').map(it => it.trim().split(' '))))
  const maxBags = {
    'red': 12,
    'green': 13,
    'blue': 14,
  } as const
  function isPossibleGame(game: string[][][]) {
    return game.every(bag => bag.every(([countStr, color]) => maxBags[color] >= parseInt(countStr)))
  }
  // console.log(input, games[0], isPossibleGame(games[2]))
  return games.map((game, idx) => isPossibleGame(game) ? idx + 1 : 0).reduce(sum, 0)
}
console.log(solution(getDemoInput()))
console.log(solution(getInput()))
