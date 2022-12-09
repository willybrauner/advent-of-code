/**
 * XXXX - Day X
 *  https://adventofcode.com/2022/day/X
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

export type TInput = any

export const format = (filename: 'input.test' | 'input'): TInput =>
  fs.readFileSync(path.resolve(__dirname, filename), 'utf8')

/**
 * Part 1
 */
export const part1 = (input: TInput) => {
  log(input)
  return input
}
part1(format('input.test'))

/**
 * part2
 */
export const part2 = (input: TInput) => {
  return input
}
part2(format('input.test'))
