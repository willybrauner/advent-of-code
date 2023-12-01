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
    .map((line) =>
      // insert number value in the string before each numberString
      // ex: two1nine -> 2two19nine
      line
        // replace() can receive regexp instead of string as first arg
        // and a callback function as second arg
        .replace(
          /(?=(one|two|three|four|five|six|seven|eight|nine))/g,
          (match, key) =>
            '*%&zero**$ one two three four five six seven eight nine'
              .split(' ')
              .indexOf(key) as any,
        )
        // split current line
        // ex: '2two19nine' -> [ '2', 't', 'w', 'o' ...]
        .split('')
        // keep only number with regexp with \d -> (0 - 9)
        // ex: [ '2', 't', 'w', 'o' ...] -> [ '2', ...]
        .filter((e) => /\d/.test(e))
        // keep only first and last
        // We can access to the current arr with the 3td param!
        .filter((e, i, arr) => i === 0 || i === arr.length - 1),
    )
    // because arr is sometimes incomplete
    // if there is only one numb in line, the last need to be the same than the first
    // We have to return the first and the last...
    // ex: ["4"] -> need to be ["4", "4"]
    .map((e) => {
      if (e.length === 1) e[1] = e[0]
      return parseInt(e.join(''))
    })

    // finally...
    .reduce((a, b) => a + b, 0)

log(part2('input'))
