/**
 * 2022 - Day 4
 *  https://adventofcode.com/2022/day/4
 */

import fs from 'fs'
import path from 'path'
const { log } = console

export type TInput = string[][]

/**
 * Return this struct
 [
   [ '2-4', '6-8' ],
   [ '2-3', '4-5' ],
   [ '5-7', '7-9' ],
   ...
 ]
 */
export const format = (filename: 'input.test.txt' | 'input.txt'): TInput =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter((e) => e)
    .map((e) => e.split(','))

/**
 * Part 1
 */
export const part1 = (input: TInput = format('input.test.txt')) =>
  input.reduce((a, b) => {
    // convert: [ '2-4', '6-8' ] to: Set(3) { 2, 3, 4 } Set(3) { 6, 7, 8 }
    const [set1, set2] = b.reduce(
      (prev: Set<any>[], curr: string): Set<any>[] => {
        const nums = curr.split('-').map((e) => parseInt(e))
        const suite = new Set()
        for (let i = nums[0]; i <= nums[1]; i++) suite.add(i)
        return [...prev, suite]
      },
      []
    )
    //
    const intersectSet = new Set([...set1].filter((x) => set2.has(x)))
    const match =
      intersectSet.size === set1.size || intersectSet.size === set2.size
    return a + (match ? 1 : 0)
  }, 0)

/**
 * part2
 */
export const part2 = (input: TInput = format('input.test.txt')) =>
  input.reduce((a, b) => {
    // convert: [ '2-4', '6-8' ] to: Set(3) { 2, 3, 4 } Set(3) { 6, 7, 8 }
    const [set1, set2] = b.reduce(
      (prev: Set<any>[], curr: string): Set<any>[] => {
        const nums = curr.split('-').map((e) => parseInt(e))
        const suite = new Set()
        for (let i = nums[0]; i <= nums[1]; i++) suite.add(i)
        return [...prev, suite]
      },
      []
    )
    //
    const intersectSet = new Set([...set1].filter((x) => set2.has(x)))
    return a + (intersectSet.size ? 1 : 0)
  }, 0)
