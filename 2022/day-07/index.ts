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
    // ...
  }
 }
 */

export const format = (filename: 'input.test' | 'input'): TInput => {
  const browse = fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')

  const read = (lines = browse, tree = {}) => {
    for (let i = 0; i < lines.length; i++) {
      if (i > 1) return
      const line = lines[i]

      // prettier-ignore
      if (line[0] === '$')
      {
        if (line.split(' ')[1] === 'cd') {
            // ROOT (only one root / and called once
            if ( line.split(" ")[2] === "/") {
              Object.assign(tree,{ "/": {} })
              lines.shift()
              log("COMMAND = '/'",tree)
              return read(lines, tree['/'])
            }
            // cd .. is back
            else if (line.split(' ')[2] === '..') {
            }
            // $ cd x enter in folder
            else {
              // log('icici ----', tree, line)
              // ici on veut l'objet enfant de l'objet tree qui a la clef "key"
              const key = line.split(' ')[2];
              log('line------------------', line)
              lines.shift()
              return read(lines, tree[key])

            }
        }
        // show
        else if (line.split(' ')[1] === 'ls') {
          // TODO
           log('COMNAND = $ ls', line)
          lines.shift()
          return read(lines, tree)
          // return read(lines, tree)
        }

      }
      // read: dir (restart on this recursively)
      else if (line.split(' ')[0] === 'dir') {
        const key = line.split(' ')[1];
        Object.assign(tree,{ [key]: {} })
        log('tree-------',tree)
        lines.shift()
        return read(lines, tree[key])
      }
      // FINAL of this obj
      // read: Number (is the file size
      else if (typeof parseInt(line.split(' ')[0]) === 'number') {
        lines.shift()
        Object.assign(tree, { [line.split(' ')[1]]: line.split(' ')[0] })
        return read(lines, tree)

      }

      // if (!lines.length) return tree
    }

    return tree
  }

  const tree = read()
  log('tree', tree)
}

/**
 * Part 1
 */
export const part1 = (input: TInput = format('input.test')) => {
  return input
}

/**
 * part2
 */
export const part2 = (input: TInput = format('input.test')) => {}
