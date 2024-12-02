/**
 * XXXX - Day X
 * https://adventofcode.com/XXXX/day/X
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = unknown
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs.readFileSync(path.resolve(__dirname, filename), 'utf8')

const part1 = (input: Input) => {
  return input
}
log(part1(useInput('input.test')))

const part2 = (input: Input) => {
  return input
}
part2(useInput('input.test'))
