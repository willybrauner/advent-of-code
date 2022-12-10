/**
 * 2022 - Day 10
 *  https://adventofcode.com/2022/day/10
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

export type TInput = number[]

export const format = (filename: 'input.test' | 'input'): TInput =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter((e) => e)
    .map((e) => (e === 'noop' ? 0 : parseInt(e.split(' ')[1])))

/**
 * Part 1
 */
export const part1 = (input: TInput) => {
  // (input)

  let x = 1
  let cycles = 0
  let strength = 0

  const incrementCycles = () => {
    cycles++
    for (let cycle of [20, 60, 100, 140, 180, 220]) {
      if (cycles === cycle) {
        log(`is ${cycle} !, how many is X value ?`, x)
        strength += cycle * x
        log('No strength is', strength)
      }
    }
  }

  for (let i = 0; i < input.length; i++) {
    let curr = input[i]
    if (curr === 0) incrementCycles()
    else {
      for (let c = 0; c < 2; c++) {
        incrementCycles()
        if (c === 1) x += curr
      }
    }
  }

  return input
}
part1(format('input.test'))

/**
 * part2
 */
export const part2 = (input: TInput) => {
  
}
part2(format('input.test'))
