import { sum, getDemoInput, getInput, range } from '../utils'

const solution = (input: string) => {
  const lines = input.split('\n')

  const popInstruction = (): [cycles: number, inc: number] => {
    const line = lines.shift()
    if (!line) throw new Error('ub')
    const [instruction, incXStr] = line.split(' ')
    if (instruction === 'noop') {
      return [1, 0]
    } else {
      return [2, parseInt(incXStr)]
    }
  }

  const rowSize = 40

  let x = 1
  let currentCycle = 0
  let [cycles, incX] = popInstruction()

  while (true) {
    const pixelPos = currentCycle % rowSize
    const charToDraw = Math.abs(x - pixelPos) <= 1 ? '#' : '.'
    if (pixelPos === 0) process.stdout.write('\n')
    process.stdout.write(charToDraw)
    cycles -= 1
    if (cycles === 0) {
      x = x + incX
      if (!lines.length) break
      ;[cycles, incX] = popInstruction()
    }
    currentCycle++
  }
  process.stdout.write('\nend\n')
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
