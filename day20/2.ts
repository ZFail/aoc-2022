import { parse } from 'path'
import { getDemoInput, getInput, range, sum } from '../utils'

type Cell = {
  value: number
  next: Cell
  prev: Cell
}

const solution = (input: string) => {
  const values = input.split('\n').map(
    (it) =>
      ({
        value: parseInt(it) * 811589153,
        next: undefined,
        prev: undefined,
      } as Cell)
  )
  values.forEach((v, idx) => {
    v.next = values[(idx + 1) % values.length]
    v.prev = values[(idx + values.length - 1) % values.length]
  })

  function removeCell(cell: Cell) {
    cell.prev.next = cell.next
    cell.next.prev = cell.prev
  }
  function insertCellAfter(cell: Cell, after: Cell) {
    cell.prev = after
    cell.next = after.next
    after.next.prev = cell
    after.next = cell
  }

  range(10).forEach(() => {
    for (let curCell of values) {
      const val = Math.abs(curCell.value) % (values.length - 1)
      if (val === 0) continue
      removeCell(curCell)
      let moveTo = curCell
      range(val).forEach(() => {
        if (curCell.value > 0) moveTo = moveTo.next
        else moveTo = moveTo.prev
      })

      insertCellAfter(curCell, curCell.value > 0 ? moveTo : moveTo.prev)
    }
  })
  const zeroCell = values.find((it) => it.value === 0)
  let curCell = zeroCell
  const results: Cell[] = []
  range(1000).forEach((it, idx) => {
    curCell = curCell.next
  })
  results.push(curCell)
  range(1000).forEach((it, idx) => {
    curCell = curCell.next
  })
  results.push(curCell)

  range(1000).forEach((it, idx) => {
    curCell = curCell.next
  })
  results.push(curCell)
  return results.map((it) => it.value).reduce(sum, 0)
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
