/**
 * 2020 - Day 6
 * https://adventofcode.com/2020/day/6
 * part1: 00:13
 * part2: 00:45
 *
 * - First part need to implement uniq() function, easy with new Set().size
 * comparison
 * - Second part is the inverse, we have to implement "Common values between a
 * set of arrays"
 */

import fs from 'fs'
import path from 'path'

const { log, clear } = console
clear()

const format = (filename: 'input.test' | 'input', join: boolean) =>
  fs.readFileSync(path.resolve(__dirname, filename), 'utf8')
    .trim()
    .split('\n')
    .reduce((a, b) => {
      if (b === '') return [...a, []]
      else {
        a[a.length - 1].push(b)
        return a
      }
    }, [[]])
    .map(e => join ? e.join('') : e as any)

const part1 = (input: string[]) =>
  input.reduce((a, b) => a + new Set([...b.split('')]).size, 0)
 log(part1(format('input.test',true)))


const part2 = (input: string[][]) =>
  input.reduce((a: number, b: string[]) => {
      const group = b.map(e => e.split(''))

      // count how many times values are present in the group
      let counters = {}
      for (let i = 0; i < group.length; i++) {
        const curr = group[i]
        for (let v of curr) {
          if (counters?.[v] == null) counters[v] = 1
          else counters[v] += 1
        }
      }
      // check counters. Keep the key if his counter is equal to the
      // group's line number
      let keep = []
      for (let k in counters) {
        let v = counters[k]
        if (v === group.length) keep.push(k)
      }
      return a + keep.length
    }
    , 0)


log(part2(format('input', false)))
