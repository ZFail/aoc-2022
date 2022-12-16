import {
  sum,
  getDemoInput,
  getInput,
  range,
  compareNumber,
  compareNumberDescending,
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
  range(20).forEach(() => {
    for (const monkey of monkeys) {
      monkey.items.forEach((item) => {
        const ops = monkey.operation.ops.map((it) => (it === 'old' ? item : it))
        const worryLevel =
          monkey.operation.op === '*' ? ops[0] * ops[1] : ops[0] + ops[1]
        const dividedWorryLevel = Math.floor(worryLevel / 3)
        const divisible = dividedWorryLevel % monkey.divisible === 0 ? 1 : 0
        const throwTo = monkey.throwTo[divisible]
        // console.log(dividedWorryLevel, throwTo)
        monkeys[throwTo].items.push(dividedWorryLevel)
        monkey.inspects += 1
      })
      monkey.items = []
    }
  })

  return monkeys
    .map((it) => it.inspects)
    .sort(compareNumberDescending)
    .splice(0, 2)
    .reduce((a, b) => a * b, 1)
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
