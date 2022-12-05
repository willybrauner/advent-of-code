/**
 * 2022 - Day 05
 *  https://adventofcode.com/2022/day/5
 */

import fs from 'fs'
import path from 'path'
import { log } from 'util'

type TStacks = string[][]
type TProcess = { move: number; from: number; to: number }[]
export type TInput = { stacks: TStacks; process: TProcess }

export const format = (filename: 'input.test' | 'input'): TInput => {
  const data = fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .slice(0, -1)

  /**
   *  [
   *       [ '', '[N]', '[Z]', '1' ],
   *       [ '[D]', '[C]', '[M]', '2' ],
   *       [ '[P]', '3' ]
   *  ]
   */
  let stacks = data
    // keep array from start to empty string
    .slice(0, data.indexOf(''))
    // split each 4 characters
    .reduce((a, b) => [...a, b.match(/.{1,4}/g)], [])
    // transform columns to rows
    .reduce((a, b) => {
      for (let i = 0; i < b.length; i++) {
        if (!a[i]) a.push([])
        // remove white space
        const toPush = b[i].replace(/[\s\[\]/]/g, '')
        if (toPush.length) a[i].push(toPush)
      }
      return a
    }, [])
  // remove last item (number) from each row
  // [ '', '[N]', '[Z]', '1' ] -> [ '', '[N]', '[Z]' ]
  stacks = stacks.map((e) => e.pop() && e)

  console.log(stacks)

  /**
   *   [
   *       { move: 1, from: 2, to: 1 },
   *       { move: 3, from: 1, to: 3 },
   *       { move: 2, from: 2, to: 1 },
   *       { move: 1, from: 1, to: 2 }
   *     ]
   */
  let process = data
    .slice(data.indexOf('') + 1)
    .map((e, i) =>
      e
        .split(' ')
        .filter((e) => e != 'move' && e != 'from' && e != 'to')
        .map((e) => parseInt(e))
    )
    .map((e) => ({ move: e[0], from: e[1], to: e[2] }))

  // console.log(process)

  return { stacks, process }
}
/**
 * Part 1
 */
export const part1 = ({ stacks, process }: TInput = format('input')) => {
  for (let i = 0; i < process.length; i++) {
    const pro = process[i]
    const els = stacks[pro.from - 1].splice(0, pro.move)
    for (let x = 0; x < els.length; x++) stacks[pro.to - 1].unshift(els[x])
  }
  return stacks.map((e) => e[0]).join('')
}

/**
 * part2
 */
export const part2 = (input: TInput = format('input.test')) => {}
