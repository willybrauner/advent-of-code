/**
 * 2020 - Day 7
 * https://adventofcode.com/2022/day/7
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = Record<string, Record<string, number>>

/**
 * {
 *   lightred: { brightwhite: 1, mutedyellow: 2 },
 *   ...
 * }
 */
const format = (
  filename: 'input.test' | 'input.test-2' | 'input.test-3' | 'input'
): Input =>
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
  const recursive = (key: string): 1 | 0 => {
    // here "key" object contains keySearch
    if (input[key]?.['shinygold']) return 1
    else {
      // here "key" object NOT contains keySearch
      // restart on children key recursively
      const childrenKeys = input[key] && Object.keys(input[key])
      if (childrenKeys)
        for (let k of childrenKeys) {
          const isInside = recursive(k)
          if (isInside) return 1
        }
      return 0
    }
  }
  return Object.keys(input).reduce((a, b) => a + recursive(b), 0)
}

log(part1(format('input')))

const part2 = (input: Input) => {
  const recursive = (key = 'shinygold'): number => {
    const childObj = input?.[key]
    const childrenKeys = childObj && Object.keys(childObj)
    let num = 0
    if (childrenKeys) {
      for (let i = 0; i < childrenKeys.length; i++) {
        const k = childrenKeys[i]
        const v = childObj[k]
        num += v + v * recursive(k)
      }
    }
    return num
  }
  return recursive('shinygold')
}

log(part2(format('input')))
