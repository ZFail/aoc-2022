import { sum, getDemoInput, getInput } from '../utils'

const parseCrates = (input: string) => {
  const crateLinesStr = input.split('\n').slice(0, -1).reverse()
  let crateStacks: Array<string[]> = []
  crateLinesStr.forEach((it) => {
    for (let i = 1; i < it.length; i += 4) {
      const stackIdx = Math.floor(i / 4)
      while (crateStacks.length <= stackIdx) {
        crateStacks.push([])
      }
      const ch = it.charAt(i)
      if (ch !== ' ') {
        crateStacks[stackIdx].push(it.charAt(i))
      }
    }
  })
  return crateStacks
}

const parseSteps = (input: string) => {
  return input.split('\n').map((it) => {
    const [_0, moveCount, _2, from, _4, to] = it.split(' ')
    return {
      moveCount: parseInt(moveCount),
      from: parseInt(from),
      to: parseInt(to),
    }
  })
}

const solution = (input: string) => {
  const [cratesInput, stepsInput] = input.split('\n\n')

  const crates = parseCrates(cratesInput)
  const steps = parseSteps(stepsInput)

  return steps
    .reduce((crates, v) => {
      ;[...Array(v.moveCount)].forEach(() => {
        const popedCrate = crates[v.from - 1].pop()
        if (popedCrate === undefined) throw Error('ub')
        const pushTo = crates[v.to - 1]
        if (pushTo === undefined) throw Error('ub')
        pushTo.push(popedCrate)
      })
      return crates
    }, crates)
    .map((it) => it.pop())
    .join('')
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
