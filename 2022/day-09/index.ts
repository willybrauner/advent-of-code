/**
 * 2022 - Day 09
 *  https://adventofcode.com/2022/day/9
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

export type TInput = ['R' | 'U' | 'L' | 'D', number][]

export const format = (filename: 'input.test' | 'input'): TInput =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter((e) => e)
    .map((e) =>
      e.split(' ').map((e, i) => (i == 1 ? parseInt(e) : e))
    ) as TInput

/**
 * Part 1
 */
export const part1 = (input: TInput) => {
  const T = [{ x: 0, y: 0 }]
  let H = { x: 0, y: 0 }

  for (let i = 0; i < input.length; i++) {
     if (i > 3) return
    const [dir, move] = input[i]
    log('-'.repeat(20))
    log({ dir, move })
    log('-'.repeat(20))

    for (let m = 0; m < move; m++)
    {
      const isLastMove = m === move - 1
      if (dir == 'R') {
        H = { x: H.x + 1, y: H.y }
      }
      if (dir == 'U') {
        H = { x: H.x, y: H.y - 1 }
      }
      if (dir == 'L') {
        H = { x: H.x - 1, y: H.y }
      }
      if (dir == 'D') {
        H = { x: H.x, y: H.y + 1 }
      }
      if (!isLastMove) T.push(H)
    }

    log({ T, lastH: H })
  }

  log(new Set(T).size)
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
