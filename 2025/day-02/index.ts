/**
 * 2025 - Day 2
 * https://adventofcode.com/2025/day/2
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = number[][]
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split(',')
    .map((e) => e.split('-').map((e) => parseFloat(e)))

function _chunkArr<T>(arr: T[], size: number): T[][] {
  let res = []
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, size + i))
  }
  return res
}

const part1 = (input: Input) => {
  let invalids = 0
  for (let i = 0; i < input.length; i++) {
    const [start, end] = input[i]
    for (let s = start; s <= end; s++) {
      const numToStrings = s.toString().split('')

      // check if even
      if (numToStrings.length % 2 !== 0) continue
      const [part1, part2] = _chunkArr(numToStrings, numToStrings.length / 2)
      const toNum = (e: string[]) => parseInt(e.join(''))

      // register invalid if 2 parts match
      if (toNum(part1) === toNum(part2)) invalids += toNum(numToStrings)
    }
  }
  return invalids
}
part1(useInput('input'))

const part2 = (input: Input) => {
  let invalids = 0
  for (let i = 0; i < input.length; i++) {
    const [start, end] = input[i]
    for (let s = start; s <= end; s++) {
      const numToStrings = s.toString().split('')
      let hasInvalid = false

      for (let l = 1; l <= numToStrings.length; l++) {
        if (hasInvalid) continue
        const parts = _chunkArr(numToStrings, l).map((e) => e.join(''))
        if (parts.length < 2) continue

        if (new Set([...parts]).size === 1) {
          invalids += parseInt(numToStrings.join(''))
          hasInvalid = true
        }
      }
    }
  }
  return invalids
}
part2(useInput('input'))
