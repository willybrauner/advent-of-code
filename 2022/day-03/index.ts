/**
 * 2022 - Day 3
 *  https://adventofcode.com/2022/day/3
 */

import fs from 'fs'
import path from 'path'
const { log } = console

export type TInput = string[]
export const format = (filename: 'input.test.txt' | 'input.txt'): TInput =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter((e) => e)

// prettier-ignore
export const part1 = (input: TInput) =>
  input.reduce((a, b, i) => {
    const [part1, part2] = [
      b.slice(0, b.length / 2).split(''),
      b.slice(b.length / 2).split(''),
    ]
    const common = [...new Set(part1.filter((e) => part2.includes(e)))][0]
    const position = common.toLowerCase().charCodeAt(0) - 96
                    + (common === common.toUpperCase() ? 26 : 0)
    return (a || 0) + position
  }, 0)

export const part2 = (input: TInput) => {}
