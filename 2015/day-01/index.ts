/**
 * 2015 - Day 01
 * https://adventofcode.com/2015/day/1
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = string[]
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs.readFileSync(path.resolve(__dirname, filename), 'utf8')
  .split('')

const part1 = (input: Input) => {
  let count = 0;
  for (let i = 0; i < input.length; i++)
      count += input[i] === ")" ? -1 : 1
  return count
}
log(part1(useInput('input')))

const part2 = (input: Input) => {
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    count += input[i] === ")" ? -1 : 1
    if (count === -1) return i + 1
  }
}
log(part2(useInput('input')))
