/**
 * XXXX - Day X
 * https://adventofcode.com/XXXX/day/X
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = number[][]
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((e) => e.split('').map((e) => parseInt(e)))

const part1 = (input: Input) => {
  let count = 0
  for (let i = 0; i < input.length; i++) {
    const batteries = input[i]
    let largest = 0
    for (let y = 0; y < batteries.length; y++) {
      for (let n = y; n < batteries.length + 1; n++) {
        if (y === n) continue
        const curr = parseInt(`${batteries[y]}${batteries[n]}`)
        if (curr > largest) largest = curr
      }
    }
    count += largest
  }
  return count
}

part1(useInput('input'))

const part2 = (input: Input) => {
  let count = 0
  for (let i = 0; i < input.length; i++) {
    let batteries = input[i]
    let largest = 0
    let start = 0
    for (let i = 0; i <= 11; i++) {
      const needAfter = 11 - i
      const maxIndex = batteries.length - 1 - needAfter
      const max = Math.max(...[...batteries].slice(start, maxIndex + 1))
      const indexOfMax = batteries.indexOf(max, start)
      largest = parseInt(`${largest}${max}`)
      start = indexOfMax + 1
    }
    count += largest
  }
  return count
}
part2(useInput('input'))
