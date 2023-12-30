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
  const cardCount = new Array(cards.length).fill(1)
  console.log(cardCount)
  cards.forEach((card1, idx) => {
    const [win, card] = card1
    const cardWincount = card.reduce((sum, val) => sum + (win.includes(val) ? 1 : 0), 0)
    const cardValue = cardWincount ? Math.pow(2, cardWincount - 1) : 0
    for (let i = idx + 1; i < Math.min(idx + 1 + cardWincount, cards.length); ++i) {
      cardCount[i] += cardCount[idx]
    }
    // console.log(cardCount)
  })
  return cardCount.reduce(sum, 0)
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
