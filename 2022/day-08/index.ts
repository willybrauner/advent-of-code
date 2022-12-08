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
export const part1 = (input: TInput = format('input.test')) => {
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
export const part2 = (input: TInput = format('input.test')) => {
  let scores = []

  for (let y = 0; y < input.length; y++) {
    const row = input[y]

    for (let x = 0; x < row.length; x++) {
      let treeValue = row[x]

      const lefts = row.slice(0, x)
      const leftsAreSmaller = lefts.every((e) => e < treeValue)
      //log({ treeValue, lefts, leftsAreSmaller })

      const rights = row.slice(x + 1)
      const rightsAreSmaller = rights.every((e) => e < treeValue)
      //log({ treeValue, rights, rightsAreSmaller })

      const geColumn = (i) => input.map((e) => e[i])

      const tops = geColumn(x).slice(0, y)
      const topsAreSmaller = tops.every((e) => e < treeValue)
      // y === 1 && log({ treeValue, tops, topsAreSmaller })

      const bottoms = geColumn(x).slice(y + 1)
      const bottomsAreSmaller = bottoms.every((e) => e < treeValue)
      //log({ treeValue, bottoms, bottomsAreSmaller })

      if (
        leftsAreSmaller ||
        rightsAreSmaller ||
        topsAreSmaller ||
        bottomsAreSmaller
      ) {
      }
      // scores.p
    }
  }
}
