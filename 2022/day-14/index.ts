/**
 * 2022 - Day 14
 *  https://adventofcode.com/2022/day/14
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

export type TInput = [number, number][][]

export const format = (filename: 'input.test' | 'input'): TInput =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter((e) => e)
    .map((e) =>
      e.split(' -> ').map((e) => e.split(',').map((e) => parseInt(e)))
    ) as TInput

/**
 * Part 1
 */
export const part1 = (input: TInput) => {
  log(input)

  const getRocksCoords = (input) => {
    for (let i = 0; i < input.length; i++) {
      const path = input[i]
      log('path', path)
    }
  }

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
