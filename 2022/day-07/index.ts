/**
 * 2022 - Day 07
 *  https://adventofcode.com/2022/day/7
 */

import fs from 'fs'
import path from 'path'
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

  const read = (lines = browse, tree = FINAL, path = '') => {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line[0] === '$') {
        if (line.split(' ')[1] === 'cd') {
          // "$ cd /" ROOT
          if (line.split(' ')[2] === '/') {
            Object.assign(tree, { '/': {} })
            lines.shift()
            return read(lines, tree['/'], path + '/')
          }
          // "$ cd .." is back, return parent object from path
          else if (line.split(' ')[2] === '..') {
            lines.shift()
            const parentPath = path.slice(0, path.length - 1)
            const parentPathArr = parentPath.split('')
            let parentTree = FINAL
            for (let entry of parentPathArr) parentTree = parentTree[entry]
            return read(lines, parentTree, parentPath)
          }
          // Enter in folder ex: "cd a"
          else {
            const key = line.split(' ')[2]
            lines.shift()
            return read(lines, tree[key], path + key)
          }
        }
        // Juste show
        else if (line.split(' ')[1] === 'ls') {
          lines.shift()
          return read(lines, tree, path)
        }
      }
      // read: dir (restart on this recursively)
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

  const tree = read()
  return tree
}

const flatDirectories = (input) => {
  const FINAL = []
  const parser = (entries) => {
    for (let entry of Object.keys(entries)) {
//      log('entry',entry)
      // if (typeof entry === 'object') {
      //   log('entry', entry)
      // }
    }
  }
  parser(input)
}

/**
 * Part 1
 */
export const part1 = (input: TInput = format('input.test')) => {
  log(input)
  const bla = flatDirectories(input)

  // check dans

  //  return input
}

/**
 * part2
 */
export const part2 = (input: TInput = format('input.test')) => {}
