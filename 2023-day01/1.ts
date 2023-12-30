import { getDemoInput, getInput, sum } from '../utils'

function isDigit(char: string) {
  switch (char) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      return true
  }
  return false
}

const solution = (input: string) => {
  const returnCalibrationValue = (str: string) => {
    const chars = str.split('')
    const firstDigit = chars.find(it => isDigit(it))
    const lastDigit = chars.reverse().find(it => isDigit(it))
    return parseInt(firstDigit + lastDigit)
  }
  return input.split('\n').map(it => {
    return returnCalibrationValue(it)
  }).reduce(sum, 0)
}
console.log(solution(getDemoInput()))
console.log(solution(getInput()))
