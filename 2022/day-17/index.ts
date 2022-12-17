/**
 * 2022 - Day 17
 *  https://adventofcode.com/2022/day/17
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

export type TInput = string[]

export const format = (filename: 'input.test' | 'input'): TInput =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter((e) => e)[0]
    .split('')

// prettier-ignore
const rocks = [
  [
    [0, 0], [1, 0], [2, 0], [3, 0]
  ],
  [
    null, [1, 0], null,
    [0, 1],[1, 1],[2, 1],
    null, [1, 2], null
  ],
  [
     null, null, [2, 0],
     null, null, [2, 1],
    [0, 2],[1, 2],[2, 2]
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  [
    [0, 0], [1, 0],
    [0, 1], [1, 1],
  ],
]
const grid = []
const GRID_WIDTH = 7

const chunksArr = (input, size) =>
  input.reduce((a, b, i) => {
    return i % size === 0
      ? [...a, [b]]
      : [...a.slice(0, -1), [...a.slice(-1)[0], b]]
  })

export const clamp = (min: number, value: number, max: number): number => {
  return Math.max(min, Math.min(value, max))
}

/**
 * Part 1
 */
export const part1 = (patterns: TInput) => {
  const playRock = (pattern, rock) => {


    const updateRockPosition = () =>
    {

    }

    // const biggestX = rock.reduce((a, b) => (b?.[0] > a ? b?.[0] : a), 0)
    // const pos = { top: -3, left: 2, with: biggestX }
    //   log('before', pattern, pos)

      while (true)
      {
  //      if (pattern === '>')
        //  pos.left = clamp(0, pos.left + 1, GRID_WIDTH - 1 - biggestX)
//        if (pattern === '<')
         // pos.left = clamp(0, pos.left - 1, GRID_WIDTH - 1 - biggestX)
//        if (pos.top < 0) pos.top += 1
      }

      // log('after', pattern, pos)

   // return pos
  }

  for (let i = 0; i < 2022; i++) {
    //FIXME
    log('------------')
    if (i > 1) return
    const rock = rocks[i % rocks.length]
    playRock(patterns[i], rock)
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
