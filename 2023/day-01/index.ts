/**
 * 2023 - Day 01
 * https://adventofcode.com/2023/day/1
 */

import fs from 'fs'
import { resolve } from 'path'
const { log, clear } = console
clear()

const part1 = (filename) =>
  fs
    .readFileSync(resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((e) => e.split(''))
    .reduce((a: number, b: string[]) => {
      const numbs = b.filter(Number)
      const num = parseInt(numbs[0] + numbs[numbs.length - 1])
      return a + num
    }, 0)

// log(part1('input'))

const part2 = (filename) =>
  fs
    .readFileSync(resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter(Boolean)
    .reduce((acc, curr, i) => {
      // prettier-ignore
      const strings = [
       'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
       '1', '2', '3', '4', '5', '6', '7', '8', '9',
      ]

      const numbs = []
      const recursive = (current) => {
        for (let i = 0; i < strings.length; i++) {
          const str = strings[i]
          if (new RegExp(`^${str}`).test(current)) {
            numbs.push(str)
            const s = current.slice(str.length)
            return recursive(s)
          }
        }
        if (current.length) {
          const s = current.slice(1)
          return recursive(s)
        }
      }

      recursive(curr)

      const convertNumbs = numbs.map((e) =>
        Number.isNaN(parseInt(e)) ? `${strings.indexOf(e) + 1}` : e,
      )

      const num = parseInt(
        convertNumbs[0] + convertNumbs[convertNumbs.length - 1],
      )

      return acc + num
    }, 0)

log(part2('input'))
