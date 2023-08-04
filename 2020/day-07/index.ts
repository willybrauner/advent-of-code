/**
 * 2020 - Day 7
 * https://adventofcode.com/2022/day/7
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

// prettier-ignore
const toCamelCase = (s: string): string =>
  s.split(' ').reduce((a, b, i) =>
    a += (i === 0) ? b : b[0].toUpperCase() + b.slice(1)
  ,'')

type Input = Record<string, Record<string, number | boolean>>

/**
 * {
 *   lightred: { brightwhite: 1, mutedyellow: 2 },
 *   ...
 * @param filename
 */
const format = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .trim()
    .split('\n')
    .map((e) => e.split('contain'))
    .reduce((a, [parent, child], i) => {
      const fParent = parent.slice(0, -6).split(' ').join('')
      const fChild = child
        .split(', ')
        .map((e) => e.trim())
        .reduce((a, b) => {
          let num
          let child
          if (b === 'no other bags.') num = 0
          else {
            const temp = b.split(' ')
            temp.pop()
            num = temp.shift()
            child = temp.join('')
          }
          return {
            ...a,
            [child ?? 'noop']: parseInt(num),
          }
        }, {})
      return {
        ...a,
        [fParent]: fChild,
      }
    }, {})

const part1 = (input: Input) => {
  const keySearch = 'shinygold'

  const findInside = (key: string, from?): 1 | 0 => {
    // here "key" object contains keySearch
    if (input[key]?.[keySearch]) return 1
    else {
      // here "key" object NOT contains keySearch
      // restart on children key recursively
      const childrenKeys = input[key] && Object.keys(input[key])
      if (childrenKeys)
        for (let k of childrenKeys) {
          const isInside = findInside(k, key)
          if (isInside) return 1
        }
      return 0
    }
  }

  let count = 0
  // Start searching on first level
  for (let parentKey in input) {
    count += findInside(parentKey)
  }
  return count
}
log(part1(format('input')))

const part2 = (input: Input) => {
  return input
}
part2(format('input.test'))
