/**
 * 2025 - Day 5
 * https://adventofcode.com/2025/day/5
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
part1(useInput('input'))

const part2 = ({ ranges }: Input) => {
  ranges = ranges.sort((a, b) => a[0] - b[0])

  const recurcive = (ranges: number[][]): number[][] => {
    let keep = []
    let i = 0
    while (i < ranges.length) {
      const curr = ranges[i]
      const next = ranges?.[i + 1]
      if (next && curr[1] >= next[0]) {
        keep.push([curr[0], Math.max(curr[1], next[1])])
        i += 2
      } else {
        keep.push(curr)
        i++
      }
    }
    if (ranges.length !== keep.length) {
      return recurcive(keep)
    }
    return keep
  }

  return recurcive(ranges)
        .reduce((acc, el) => acc + (el[1] - el[0] + 1), 0)
}

log(part2(useInput('input')))
