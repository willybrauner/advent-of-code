/**
 * XXXX - Day X
 *  https://adventofcode.com/2022/day/X
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

export type Input = any

export const format = (filename: 'input.test' | 'input'): Input =>
  fs.readFileSync(path.resolve(__dirname, filename), 'utf8')


const part1 = (input: Input) => {
  log(input)
  return input
}
part1(format('input.test'))

const part2 = (input: Input) => {
  return input
}
part2(format('input.test'))
