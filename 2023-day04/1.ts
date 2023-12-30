import { getDemoInput, getInput, sum } from '../utils'

const solution = (input: string) => {
  const cards = input.split('\n').map((it) =>
    it
      .split(': ')[1]
      .split('|')
      .map((it) =>
        it
          .split(' ')
          .filter((it) => it.length > 0)
          .map((it) => parseInt(it))
      )
  )
  return cards
    .map(([win, card]) =>
      card.reduce((sum, val) => sum + (win.includes(val) ? 1 : 0), 0)
    )
    .map((value) => (value ? Math.pow(2, value - 1) : 0))
    .reduce(sum, 0)
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
