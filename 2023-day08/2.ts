import { getDemoInput, getInput } from '../utils'

function gcd(a: number, b: number): number {
  return !b ? a : gcd(b, a % b)
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b)
}

const solution = (input: string) => {
  const [template, networkStr] = input.split('\n\n')
  const nodes = Object.fromEntries(
    networkStr.split('\n').map((nodeStr) => {
      const [nodeName, pathsStr] = nodeStr.split(' = ')
      const [left, right] = pathsStr
        .replaceAll('(', '')
        .replaceAll(')', '')
        .split(', ')
      return [nodeName, { L: left, R: right }]
    })
  )

  const getZInterval = (node: string) => {
    let i = 0
    let curNode = node
    do {
      curNode = nodes[curNode][template.charAt(i % template.length)]
      i++
    } while (!curNode.endsWith('Z'))

    return i
  }

  let curNodes = Object.keys(nodes).filter((it) => it.endsWith('A'))

  return curNodes.map((it) => getZInterval(it)).reduce((acc, v) => lcm(acc, v), 1)
}
console.log(solution(getDemoInput(3)))
console.log(solution(getInput()))
