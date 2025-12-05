/**
 * XXXX - Day X
 * https://adventofcode.com/XXXX/day/X
 */
import { count } from 'console'
import fs, { read } from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = {
  ranges: number[][]
  freshIds: number[]
}

// prettier-ignore
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs.readFileSync(path.resolve(__dirname, filename), 'utf8')
  .split('\n')
  .reduce((acc, el) => {
    if(el.includes('-')) 
      acc.ranges.push(el.split('-').map(Number)) 
    else 
      if (el !== "") 
        acc.freshIds.push(parseInt(el))
    return acc
  },{ranges: [], freshIds: []} as Input)

const part1 = ({ ranges, freshIds }: Input) => {
  let freshCount = 0
  for (const id of freshIds) {
    let checked = false
    for (const [start, end] of ranges) {
      if (id >= start && id <= end && !checked) {
        freshCount++
        checked = true
      }
    }
  }
  return freshCount
}
log(part1(useInput('input')))

const part2 = (input: Input) => {
  return input
}
part2(useInput('input.test'))
