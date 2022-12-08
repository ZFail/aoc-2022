import { max, getDemoInput, getInput } from '../utils'

const solution = (input: string) => {
  const rows = input
    .split('\n')
    .map((it) => it.split('').map((it) => parseInt(it)))

  const size = rows.length
  if (!rows.every((it) => it.length === size)) throw Error('ub')

  // console.log(rows)
  const cols = rows.map((_, row) => rows.map((_, col) => rows[col][row]))

  const treeScore = (x: number, y: number) => {
    const height = rows[x][y]
    const visibleTrees = (trees: number[]) =>
      trees.findIndex((it) => it >= height) + 1 || trees.length

    return (
      visibleTrees(rows[x].slice(0, y).reverse()) *
      visibleTrees(rows[x].slice(y + 1)) *
      visibleTrees(cols[y].slice(0, x).reverse()) *
      visibleTrees(cols[y].slice(x + 1))
    )
  }
  const scores = []
  for (let x = 0; x < size; ++x) {
    for (let y = 0; y < size; ++y) {
      scores.push(treeScore(x, y))
    }
  }
  return scores.reduce(max, 0)
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
