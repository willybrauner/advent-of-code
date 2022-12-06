/**
 * 2022 - Day 06
 * https://adventofcode.com/2022/day/6
 */

import fs from 'fs'
import path from 'path'

export type TInput = string[]

export const format = (filename: 'input.test' | 'input'): TInput =>
  fs.readFileSync(path.resolve(__dirname, filename), 'utf8').split('')

/**
 * Part 1
 */
export const part1 = (input: TInput = format('input.test'), arrLength = 4) => {
  for (let i = 0; i < input.length; i++) {
    let group = new Array(arrLength).fill(null).map((e, ind) => input[i + ind])
    if (group.length === new Set(group).size) return i + group.length
  }
}

/**
 * part2
 */
export const part2 = (input: TInput = format('input')) => part1(input, 14)
