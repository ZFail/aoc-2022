import { sum, getDemoInput, getInput, compareNumber } from '../utils'
import { parseInput, getAllDirs, getDirSize } from './1'

const solution = (input: string) => {
  const rootDir = parseInput(input)
  const dirs = getAllDirs(rootDir)
  const totalDiskSpace = 70000000
  const needUnusedSpace = 30000000
  const usedSpace = getDirSize(rootDir)
  const unusedSpace = totalDiskSpace - usedSpace
  const needToFree = needUnusedSpace - unusedSpace
  console.log('needToFree', needToFree)
  const dirSizes = dirs.map((it) => getDirSize(it)).sort(compareNumber)
  return dirSizes.find((it) => it >= needToFree)
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
