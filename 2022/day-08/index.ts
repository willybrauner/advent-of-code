/**
 * 2022 - Day 08
 *  https://adventofcode.com/2022/day/8
 */

import fs from 'fs'
import path from 'path'
import { getColumns } from '../../2021/day-03'
const { log } = console

export type TInput = any

/**
  Formatted input struct:
 [
   [ 3, 0, 3, 7, 3 ],
   [ 2, 5, 5, 1, 2 ],
   [ 6, 5, 3, 3, 2 ],
   [ 3, 3, 5, 4, 9 ],
   [ 3, 5, 3, 9, 0 ]
 ]
 */
export const format = (filename: 'input.test' | 'input'): TInput =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter((e) => e)
    .map((e) => e.split('').map((e) => parseInt(e)))

/**
 * Part 1
 */
// prettier-ignore
export const part1 = (input = format('input.test')): number => {
  let visible = 0
  for (let y = 0; y < input.length; y++)
    for (let x = 0; x < input[y].length; x++)
      if (
        input[y].slice(0, x).every((e) => e < input[y][x]) ||
        input[y].slice(x + 1).every((e) => e < input[y][x]) ||
        input.map((e) => e[x]).slice(0, y).every((e) => e < input[y][x]) ||
        input.map((e) => e[x]).slice(y + 1).every((e) => e < input[y][x])
      ) visible++
  return visible
}

/**
 * part2
 */
// prettier-ignore
export const part2 = (input = format('input.test')): number => {
  const scores = []

  for (let y = 0; y < input.length; y++)
    for (let x = 0; x < input[y].length; x++) {
      let counts = [0, 0, 0, 0]

      const lefts = input[y].slice(0, x).reverse()
      for (let i = 0; i < lefts.length; i++) {
        counts[0]++
        if (lefts[i] >= input[y][x]) break
      }
      const rights = input[y].slice(x + 1)
      for (let i = 0; i < rights.length; i++) {
        counts[1]++
        if (rights[i] >= input[y][x]) break
      }
      const tops = input.map((e) => e[x]).slice(0, y).reverse()
      for (let i = 0; i < tops.length; i++) {
        counts[2]++
        if (tops[i] >= input[y][x]) break
      }
      const bottoms = input.map((e) => e[x]).slice(y + 1)
      for (let i = 0; i < bottoms.length; i++) {
        counts[3]++
        if (bottoms[i] >= input[y][x]) break
      }

      scores.push(counts.reduce((a, b) => a * b))
    }

  return scores.reduce((a, b) => (b > a ? b : a))
}
