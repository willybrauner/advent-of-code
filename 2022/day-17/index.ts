/**
 * 2022 - Day 17
 *  https://adventofcode.com/2022/day/17
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

export type TInput = string[]

const chunksArr = (input, size) =>
  input.reduce((a, b, i) => {
    return i % size === 0
      ? [...a, [b]]
      : [...a.slice(0, -1), [...a.slice(-1)[0], b]]
  })

export const clamp = (min: number, value: number, max: number): number => {
  return Math.max(min, Math.min(value, max))
}

export const format = (filename: 'input.test' | 'input'): TInput =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter((e) => e)[0]
    .split('')

// prettier-ignore
const rocks = [
  [
    [2, 0],[3, 0],[4, 0],[5, 0]
  ],
  [
           [3, 0],
    [2, 1],[3, 1],[4, 1],
           [3, 2]
  ],
  [
                  [4, 0],
                  [4, 1],
    [2, 2],[3, 2],[4, 2]
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
  ],
  [
    [2, 0], [3, 0],
    [2, 1], [3, 1],
  ],
]


const updateY = (rock) => rock.reduce((a, b) => [...a, [b[0], b[1]+1]], [])
// prettier-ignore
const updateX = (rock, pattern) => {
  const smallestX = rock.reduce((a, b) => (b[0] < a ? b[0] : a), rock[0][0])
  const biggestX = rock.reduce((a, b) => (b[0] > a ? b[0] : a), 0)
  if (pattern === '>' && biggestX === 6) return rock
  if (pattern === '<' && smallestX === 0) return rock
  return rock.reduce((a, b, i) => [
    ...a, [ b[0] + (pattern == '>' ? +1 : -1), b[1] ]
  ], [])
}

const intersect = () => {}

/**
 * Part 1
 */
export const part1 = (patterns: TInput) => {
  const played = []

  for (let i = 0; i < 2022; i++) {
    if (i > 1) return
    const rock = rocks[i % rocks.length]
    const pattern = patterns.shift()

    let curr = rock
    let count = 0
    //
    while (count < 3) {
      curr = updateX(curr, pattern)
      curr = updateY(curr)
      console.log('curr rock', curr)
      count++
    }
  }
  return patterns
}
part1(format('input.test'))

/**
 * part2
 */
export const part2 = (input: TInput) => {
  return input
}
part2(format('input.test'))
