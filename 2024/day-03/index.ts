/**
 * 2024 - Day 3
 * https://adventofcode.com/2024/day/3
 */
import fs from 'node:fs'
import path from 'node:path'

type Input = any
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs.readFileSync(path.join(__dirname, filename), 'utf-8')

const part1 = (input: Input) => {
  return input
}
console.log(part1(useInput('input.test')))

const part2 = (input: Input) => {
  return input
}
part2(useInput('input.test'))
