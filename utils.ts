import { readFileSync } from 'fs'
import { dirname, join } from 'path'

export const sum = (a: number, b: number) => a + b
export const max = (a: number, b: number) => Math.max(a, b)
export const compareNumber = (a: number, b: number) => a - b
export const compareNumberDescending = (a: number, b: number) =>
  a > b ? -1 : 1

const cwd = dirname(require.main?.filename || '')

const readInputFile = (name: string) =>
  readFileSync(join(cwd, name)).toString().replaceAll('\r\n', '\n').trimEnd()

export const getDemoInput = (num: number | undefined = undefined) =>
  readInputFile(`demo-input${num === undefined ? '' : num}.txt`)
export const getInput = () => readInputFile('input.txt')
