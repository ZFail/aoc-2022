import { getDemoInput, getInput, mul, sum } from '../utils'

const solution = (input: string) => {
  const games = input.split('\n').map(it => it.split(': ')[1].split(';').map(it => it.split(',').map(it => it.trim().split(' '))))

  function gamePower(game: string[][][]) {
    const minBags = {
      'red': 0,
      'green': 0,
      'blue': 0,
    }
    game.forEach(bag => bag.forEach(([countStr, color]) => minBags[color] = Math.max(minBags[color], parseInt(countStr))))
    return Object.values(minBags).reduce(mul, 1)
  }
  // console.log(input, games[0], gamePower(games[0]))
  return games.map((game, idx) => gamePower(game)).reduce(sum, 0)
}
console.log(solution(getDemoInput()))
console.log(solution(getInput()))
