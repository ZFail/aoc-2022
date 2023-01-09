import { readFileSync } from 'fs'
import { dirname, join } from 'path'

export const sum = (a: number, b: number) => a + b
export const min = (a: number, b: number) => Math.min(a, b)
export const max = (a: number, b: number) => Math.max(a, b)
export const compareNumber = (a: number, b: number) => a - b
export const compareNumberDescending = (a: number, b: number) =>
  a > b ? -1 : 1

export const range = (num: number) => [...Array(num).keys()]

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

export function zip<T extends unknown[][]>(
  ...args: T
): { [K in keyof T]: T[K] extends (infer V)[] ? V : never }[] {
  const minLength = Math.min(...args.map((arr) => arr.length))
  // @ts-expect-error This is too much for ts
  return range(minLength).map((i) => args.map((arr) => arr[i]))
}

export function notNull<T>(val: T): val is NonNullable<T> {
  return val != null
}
