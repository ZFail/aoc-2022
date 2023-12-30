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

const digitStrings = [undefined, 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

const solution = (input: string) => {

  const firstDigitOfString = (str: string) => {
    const chars = str.split('')
    let idx = -1
    let digit = 0
    const digitIdx = chars.findIndex(it => isDigit(it))
    if (digitIdx !== -1) {
      idx = digitIdx
      digit = parseInt(chars[idx])
    }
    for (let i = 0; i < digitStrings.length; i++) {
      const strDigit = digitStrings[i]
      if (!strDigit) continue
      const newIdx = str.indexOf(strDigit)
      if (newIdx !== -1 && (newIdx < idx || idx === -1)) {
        idx = newIdx
        digit = i
      }
    }
    return digit
  }

  const lastDigitOfString = (str: string) => {
    const chars = str.split('')
    let idx = -1
    let digit = 0
    const digitIdx = chars.findLastIndex(it => isDigit(it))
    if (digitIdx !== -1) {
      idx = digitIdx
      digit = parseInt(chars[idx])
    }
    for (let i = 0; i < digitStrings.length; i++) {
      const strDigit = digitStrings[i]
      if (!strDigit) continue
      const newIdx = str.lastIndexOf(strDigit)
      if (newIdx !== -1 && (newIdx > idx || idx === -1)) {
        idx = newIdx
        digit = i
      }
    }
    return digit
  }
    
  const returnCalibrationValue = (str: string) => {
    // console.log(str, firstDigitOfString(str).toString() + lastDigitOfString(str).toString())
    return parseInt(firstDigitOfString(str).toString() + lastDigitOfString(str).toString())
  }
  // returnCalibrationValue(input.split('\n')[1])
  return input.split('\n').map(it => {
    return returnCalibrationValue(it)
  }).reduce(sum, 0)
}
console.log(solution(getDemoInput(2)))
console.log(solution(getInput()))
