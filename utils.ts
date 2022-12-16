import { readFileSync } from 'fs'
import { dirname, join } from 'path'

export const sum = (a: number, b: number) => a + b
export const max = (a: number, b: number) => Math.max(a, b)
export const compareNumber = (a: number, b: number) => a - b
export const compareNumberDescending = (a: number, b: number) =>
  a > b ? -1 : 1

export const range = (num: number) => [...Array(num)]

const cwd = dirname(require.main?.filename || '')

const readInputFile = (name: string) =>
  readFileSync(join(cwd, name)).toString().replaceAll('\r\n', '\n').trimEnd()

export const getDemoInput = (num: number | undefined = undefined) =>
  readInputFile(`demo-input${num === undefined ? '' : num}.txt`)
export const getInput = () => readInputFile('input.txt')

export function primeFactors(n: number) {
  const factors: number[] = []
  let divisor = 2

  while (n >= 2) {
    if (n % divisor == 0) {
      factors.push(divisor)
      n = n / divisor
    } else {
      divisor++
    }
  }
  return factors
}
