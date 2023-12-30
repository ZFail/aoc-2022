import { getDemoInput, getInput, sum } from '../utils'

const solution = (input: string) => {
  const strings = input.split('\n')
  const isSymbol = (row: number, idx: number) => {
    if (row < 0 || row >= strings.length) return false
    if (idx < 0 || idx >= strings[row].length) return false
    const char = strings[row].charAt(idx)
    switch (char) {
      case '.':
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
        return false
    }
    return true
  }
  const isDigit = (char: string) => {
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
  let adNumbers: Number[] = []
  let row = 0

  function addCurStrToAd(curStrNum, isAd) {
    if (curStrNum.length === 0) return
    if (!isAd) return
    console.log(curStrNum)
    adNumbers.push(parseInt(curStrNum))
  }

  for (const str of strings) {
    let curStrNum = ''
    let isAd = false
    for (let i = 0; i < str.length; ++i) {
      if (isDigit(str.charAt(i))) {
        curStrNum += str.charAt(i)
        if (!isAd) {
          isAd = isSymbol(row, i-1)
        }
        if (!isAd) {
          isAd = isSymbol(row, i)
        }
        if (!isAd) {
          isAd = isSymbol(row, i+1)
        }
        if (!isAd) {
          isAd = isSymbol(row+1, i-1)
        }
        if (!isAd) {
          isAd = isSymbol(row+1, i)
        }
        if (!isAd) {
          isAd = isSymbol(row+1, i+1)
        }
        if (!isAd) {
          isAd = isSymbol(row-1, i-1)
        }
        if (!isAd) {
          isAd = isSymbol(row-1, i)
        }
        if (!isAd) {
          isAd = isSymbol(row-1, i+1)
        }
      } else {
        addCurStrToAd(curStrNum, isAd)
        curStrNum = ''
        isAd = false
      }
    }
    addCurStrToAd(curStrNum, isAd)
    curStrNum = ''
    isAd = false
    row++
  }
  console.log(input)
  return adNumbers.reduce(sum, 0)
}
console.log(solution(getDemoInput()))
console.log(solution(getInput()))
