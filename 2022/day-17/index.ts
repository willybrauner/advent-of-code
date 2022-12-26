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
    [2, 0],[3, 0],[4, 0],[5, 0]
  ],
  [
           [3,-2],
    [2,-1],[3,-1],[4,-1],
           [3, 0]
  ],
  [
                  [4,-2],
                  [4,-1],
    [2, 0],[3, 0],[4, 0]
  ],
  [
    [2,-3],
    [2,-2],
    [2,-1],
    [2,-0],
  ],
  [
    [2,-1], [3,-1],
    [2, 0], [3, 0],
  ],
]

const getSmallestY = (a) => a.reduce((a, b) => (b[1] < a ? b[1] : a), a[0][1])
const getBiggestY = (a) => a.reduce((a, b) => (b[1] > a ? b[1] : a), a[0][1])

const updateY = (rock, y = 1, played) => {
  return rock.reduce((a, b) => [...a, [b[0], b[1] + y]], [])
}

const updateX = (rock, pattern, played) => {
  const smallestX = rock.reduce((a, b) => (b[0] < a ? b[0] : a), rock[0][0])
  const biggestX = rock.reduce((a, b) => (b[0] > a ? b[0] : a), 0)
  if (
    (pattern === '>' && biggestX === 6) ||
    (pattern === '<' && smallestX === 0) ||
    intersect(rock, played)
  )
    return rock
  return rock.reduce(
    (a, b, i) => [...a, [b[0] + (pattern == '>' ? +1 : -1), b[1]]],
    []
  )
}

const intersect = (a: number[][], b: number[][]): boolean =>
  a.some(([x, y]) =>
    b.some(([bX, bY]) => bX === x && bY === y))

// const intersect2 = (a: number[][], b: number[][]): boolean =>
// {
//
//   for (let list1 of a)
//   {
//     for (let list2 of b)
//     {
//
//     }
//   }
// }

/**
 * Part 1
 */
export const part1 = (patterns: TInput) => {
  const played: number[][] = [
    [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0]
  ]
  let Y = 0

  for (let i = 0; i < 2022; i++) {
    //if (i > 3) return

    const rock = rocks[i % rocks.length]
    let current = rock
    current = updateY(rock, Y - 3, played)
    //log('current', current)

    //
    while (true) {
      // log('pattern',pattern)
      let pattern = patterns.shift()
      //log('after update X', current)
      current = updateX(current, pattern, played)
      //log('after update Y', current)
      current = updateY(current, 1, played)

      const canUpdateY = () => !(getSmallestY(current) === 0 || intersect(current, played))

      // si pas de played
      // si un dev vec intersect avec un des vec played
      if (!canUpdateY())
      {
        if (getSmallestY(current) !== 0) current = updateY(current, -1, played)

        // keep vec2s
        for (let vec2 of current) played.push(vec2)

        // log('played', played)
        Y = Math.min(getSmallestY(current), Y)
        log(Y)
        break
      }
    }
  }

  log('Y', Y)
  return Y
}

log(part1(format('input.test')))

/**
 * part2
 */
export const part2 = (input: TInput) => {
  return input
}
part2(format('input.test'))
