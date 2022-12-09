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
  let prevH: { x: number; y: number }
  let H = { x: 0, y: 0 }

  for (let i = 0; i < input.length; i++) {
    const [dir, move] = input[i]
    for (let m = 0; m < move; m++) {
      prevH = H
      if (dir == 'R') H = { x: H.x + 1, y: H.y }
      if (dir == 'U') H = { x: H.x, y: H.y - 1 }
      if (dir == 'L') H = { x: H.x - 1, y: H.y }
      if (dir == 'D') H = { x: H.x, y: H.y + 1 }
      if (
        ![
          [0, 0],
          [0, -1],
          [1, -1],
          [1, 0],
          [1, 1],
          [0, 1],
          [-1, 1],
          [-1, 0],
          [-1, -1],
        ].some(
          (e) =>
            JSON.stringify({
              x: T[T.length - 1].x + e[0],
              y: T[T.length - 1].y + e[1],
            }) === JSON.stringify(H)
        )
      ) {
        T.push(prevH)
      }
    }
  }

  return T.reduce(
    (a, b) => (!a.some((e) => b.x === e.x && b.y === e.y) ? [...a, b] : a),
    []
  ).length
}
part1(format('input.test')) // 13

/**
 * part2
 */
export const part2 = (input: TInput) => {
  return input
}
part2(format('input.test'))
