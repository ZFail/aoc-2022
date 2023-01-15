import { getDemoInput, getInput } from '../utils'

type MonkeyValue = {
  name: string
  value: number
}
type MonkeyOp = {
  name: string
  left: string
  right: string
  op: '+' | '-' | '*' | '/'
}

type Monkey = MonkeyValue | MonkeyOp

const solution = (input: string) => {
  const monkeys: Record<string, Monkey> = Object.fromEntries(
    input
      .split('\n')
      .map((it) => {
        const [name, opStr] = it.split(':')
        const opParts = opStr.trim().split(' ')
        if (opParts.length === 1) {
          return {
            name,
            value: parseInt(opParts[0]),
          }
        } else {
          return {
            name,
            left: opParts[0],
            right: opParts[2],
            op: opParts[1] as '+' | '-' | '*' | '/',
          }
        }
      })
      .map((it) => [it.name, it])
  )
  monkeys['humn']['value'] = NaN
  console.log(
    getMonkeyOpResult(monkeys[monkeys[monkeys['root']['left']]['left']]),
    monkeys[monkeys['root']['left']]['op'],
    getMonkeyOpResult(monkeys[monkeys[monkeys['root']['left']]['right']]),

    getMonkeyOpResult(monkeys[monkeys['root']['right']])
  )
  function getMonkeyOpResult(monkey: Monkey) {
    if ('value' in monkey) return monkey.value
    const m1 = getMonkeyOpResult(monkeys[monkey.left])
    const m2 = getMonkeyOpResult(monkeys[monkey.right])
    switch (monkey.op) {
      case '+':
        return m1 + m2
      case '-':
        return m1 - m2
      case '*':
        return m1 * m2
      case '/':
        return m1 / m2
    }
  }
  function findHumnValue(monkey: Monkey) {}
  return getMonkeyOpResult(monkeys['root'])
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
