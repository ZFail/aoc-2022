import { getDemoInput, getInput, sum } from '../utils'

const solution = (input: string) => {
  const sequences = input
    .split('\n')
    .map((it) => it.split(' ').map((it) => parseInt(it)))
  return sequences
    .map((sequence) => {
      let decodedSeq = sequence
      const decodedSeqs = [decodedSeq]
      while (!decodedSeq.every((it) => it === 0)) {
        decodedSeq = decodedSeq
          .map((val, idx) => val - decodedSeq[idx - 1])
          .slice(1)
        decodedSeqs.push(decodedSeq)
      }
      return decodedSeqs.reverse().reduce((acc, v) => v[0] - acc, 0)
    })
    .reduce(sum, 0)
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
