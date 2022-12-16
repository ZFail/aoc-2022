import {
  sum,
  getDemoInput,
  getInput,
  range,
  compareNumber,
  compareNumberDescending,
  primeFactors,
} from '../utils'

const parseMonkey = (input: string) => {
  const [monkeyIdx, items, operationStr, test, ifTrue, ifFalse] =
    input.split('\n')
  const parsedOp = operationStr.split('=')[1].trim().split(' ')
  return {
    items: items
      .split(':')[1]
      .split(',')
      .map((it) => parseInt(it)),
    operation: {
      op: parsedOp[1] as '+' | '*',
      ops: [parsedOp[0], parsedOp[2]].map((it) =>
        it === 'old' ? 'old' : parseInt(it)
      ),
    },
    divisible: parseInt(test.split(' ').pop()!),
    throwTo: {
      1: parseInt(ifTrue.split(' ').pop()!),
      0: parseInt(ifFalse.split(' ').pop()!),
    } as Record<number, number>,
    inspects: 0,
  }
}

const solution = (input: string) => {
  const monkeys = input.split('\n\n').map((it) => parseMonkey(it))
  const divisibles = monkeys.map((it) => it.divisible)
  const newMonkeys = monkeys.map((it, idx) => ({
    ...it,
    items: it.items.map((item) => divisibles.map((div) => item % div)),
  }))

  range(10000).forEach(() => {
    newMonkeys.forEach((monkey, monkeyIdx) => {
      const getWorryLevel = (val: number) => {
        const ops = monkey.operation.ops.map((it) => (it === 'old' ? val : it))
        return monkey.operation.op === '*' ? ops[0] * ops[1] : ops[0] + ops[1]
      }

      monkey.items.forEach((item) => {
        const newItem = item.map(
          (mod, idx) => getWorryLevel(mod) % divisibles[idx]
        )
        const divisible = newItem[monkeyIdx] === 0 ? 1 : 0
        const throwTo = monkey.throwTo[divisible]
        newMonkeys[throwTo].items.push(newItem)
        monkey.inspects += 1
      })
      monkey.items = []
    })
  })

  return newMonkeys
    .map((it) => it.inspects)
    .sort(compareNumberDescending)
    .splice(0, 2)
    .reduce((a, b) => a * b, 1)
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
