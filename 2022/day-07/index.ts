/**
 * 2022 - Day 07
 *  https://adventofcode.com/2022/day/7
 */

import fs from 'fs'
import path from 'path'
import { type } from 'os'
const { log, clear } = console

export type TInput = any

/**
 - / (dir)
  - a (dir)
    - e (dir)
      - i (file, size=584)
    - f (file, size=29116)
    - g (file, size=2557)
    - h.lst (file, size=62596)
 - b.txt (file, size=14848514)
 - c.dat (file, size=8504156)
 - d (dir)
  - j (file, size=4060174)
  - d.log (file, size=8033020)
  - d.ext (file, size=5626152)
  - k (file, size=7214296)

 Need to get struct like:

 {
  "/": {
    "a": {
      "e": {
        "i": 584
      },
      "f": 29116,
      "g": 2557,
      "h.lst": 62596,
    },
    "b.txt": 14848514
    // ...
  }
 }
 */

export const format = (filename: 'input.test' | 'input'): TInput => {
  const browse = fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')

  const FINAL = {}

  const read = (lines = browse, tree = FINAL, path = []) => {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line[0] === '$') {
        if (line.split(' ')[1] === 'cd') {
          // "$ cd /" ROOT
          if (line.split(' ')[2] === '/') {
            Object.assign(tree, { '/': {} })
            lines.shift()
            path.push('/')
            return read(lines, tree['/'], path)
          }
          // "$ cd .." is back, return parent object from path
          else if (line.split(' ')[2] === '..') {
            lines.shift()
            path.pop()
            let parentTree = FINAL
            for (let entry of path) {
              parentTree = parentTree[entry]
            }
            return read(lines, parentTree, path)
          }
          // Enter in folder ex: "cd a"
          else {
            const key = line.split(' ')[2]
            lines.shift()
            path.push(key)
            return read(lines, tree[key], path)
          }
        }
        // Juste show
        else if (line.split(' ')[1] === 'ls') {
          lines.shift()
          return read(lines, tree, path)
        }
      }
      // read: dir
      else if (line.split(' ')[0] === 'dir') {
        const key = line.split(' ')[1]
        Object.assign(tree, { [key]: {} })
        lines.shift()
        return read(lines, tree, path)
      }
      // read: Number (is the file size
      else if (typeof parseInt(line.split(' ')[0]) === 'number') {
        lines.shift()
        const key = line.split(' ')[1]
        if (key) {
          Object.assign(tree, {
            [key]: parseInt(line.split(' ')[0]),
          })
          return read(lines, tree, path)
        }
      }
    }
    return FINAL
  }
  return read()
}

// get sums of each values in object and nested obj
const sumNumbersInObjects = (obj): number => {
  let sum = 0
  for (const key in obj) {
    if (typeof obj[key] === 'number') {
      sum += obj[key]
    } else if (typeof obj[key] === 'object') {
      sum += sumNumbersInObjects(obj[key])
    }
  }
  return sum
}

// get all sums
const getAllSums = (input) => {
  const sumsArr = []
  const calc = (input) => {
    for (let key in input) {
      if (typeof input[key] === 'object') {
        sumsArr.push(sumNumbersInObjects(input[key]))
        calc(input[key])
      }
    }
    return sumsArr
  }
  return calc(input)
}

/**
 * Part 1
 */
export const part1 = (input: TInput = format('input.test')) => {
  return getAllSums(input)
    .filter((e) => e < 100000)
    .reduce((a, b) => a + b, 0)
}

/**
 * part2
 */
export const part2 = (input: TInput = format('input.test')) => {
  const sums = getAllSums(input)
  const free = 70000000 - sums.sort((a, b) => b - a)[0]
  return sums.filter((e) => e + free >= 30000000).sort((a, b) => a - b)[0]
}
