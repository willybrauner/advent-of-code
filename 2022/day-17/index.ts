/**
 * 2022 - Day 17
 * https://adventofcode.com/2022/day/17
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
    [2, 0],
  ],
  [
    [2,-1], [3,-1],
    [2, 0], [3, 0],
  ],
]

const getSmallestY = (a) => a.reduce((a, b) => (b[1] < a ? b[1] : a), a[0][1])

const updateY = (rock, y = 1) => {
  return rock.reduce((a, b) => [...a, [b[0], b[1] + y]], [])
}

const updateX = (rock, pattern) => {
  const smallestX = rock.reduce((a, b) => (b[0] < a ? b[0] : a), rock[0][0])
  const biggestX = rock.reduce((a, b) => (b[0] > a ? b[0] : a), rock[0][0])
  if (
    (pattern === '>' && biggestX === 6) ||
    (pattern === '<' && smallestX === 0)
  )
    return rock
  else
    return rock.reduce(
      (a, b) => [...a, [b[0] + (pattern == '>' ? +1 : -1), b[1]]],
      []
    )
}

const intersect = (block: number[][], list: Set<number[]>): boolean => {
  for (const vec2 of block)
    for (const lVec2 of list.values())
      if (vec2[0] === lVec2[0] && vec2[1] === lVec2[1]) return true
  return false
}

/**
 * Part 1
 */
export const part1 = (patterns: TInput) => {
  // start with ground
  const played = new Set([
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
  ])

  let tower = 0
  let counter = 0

  for (let i = 0; i < 2022; i++) {
    const rock = rocks[i % rocks.length]
    let current = updateY(rock, tower - 4)

    while (true) {
      let pattern = patterns[counter % patterns.length]
      counter++

      if (!intersect(updateX(current, pattern), played)) {
        current = updateX(current, pattern)
      }
      if (!intersect(updateY(current), played)) {
        current = updateY(current, 1)
      } else {
        for (let vec2 of current) played.add(vec2)
        tower = Math.min(getSmallestY(current), tower)
        break
      }
    }
  }
  return tower
}
//log(part1(format('input')))

/**
 * part2
 */
export const part2 = (patterns: TInput) => {
  const played = new Set([
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
  ])

  let tower = 0
  let counter = 0

  let cycleFound = false
  let cycle
  let i = 0
  const steps = new Set<{pattern: string, rock:number, i: number}>()

  while (!cycleFound) {
    const rock = rocks[i % rocks.length]
    let current = updateY(rock, tower - 4)
    i++

    while (true) {
      let pattern = patterns[counter % patterns.length]
      counter++

      const s = { pattern, rock: i % rocks.length, i}
      log(s)
      steps.add(s)

      if (!intersect(updateX(current, pattern), played)) {
        current = updateX(current, pattern)
      }
      if (!intersect(updateY(current), played)) {
        current = updateY(current, 1)
      } else {
        for (let vec2 of current) played.add(vec2)
        tower = Math.min(getSmallestY(current), tower)

        // try to detect cycle
        for (const step of steps.values())
          if (step.pattern === pattern && step.rock === i % rocks.length)
          {
            log("step", step);
            cycle = step
            cycleFound = true
          }

        break
      }
    }
  }
  return tower
}
log(part2(format('input.test')))
