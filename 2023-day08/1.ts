import { getDemoInput, getInput } from '../utils'

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
  let i = 0
  let curNode = 'AAA'
  while (curNode !== 'ZZZ') {
    curNode = nodes[curNode][template.charAt(i % template.length)]
    i++
  }
  return i
}

console.log(solution(getDemoInput()))
console.log(solution(getDemoInput(2)))
console.log(solution(getInput()))
