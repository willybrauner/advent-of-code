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

  const getParentObject = (obj, full = FINAL) =>
  {

  }

  const read = (lines = browse, tree = FINAL, parentLevel = null) => {
    for (let i = 0; i < lines.length; i++) {
      //  if (i > 1) return
      const line = lines[i]

      // prettier-ignore
      if (line[0] === '$')
      {
        if (line.split(' ')[1] === 'cd') {
            // ROOT (only one root / and called once
            if ( line.split(" ")[2] === "/") {
              Object.assign(tree,{ "/": {} })
              lines.shift()
              return read(lines, tree['/'], tree)
            }
            // cd .. is back
            else if (line.split(' ')[2] === '..') {
              lines.shift()
              log("COMMAND = '..'",parentLevel)
              // FIXME ici on devrait passer l'objet parent
                // pour se faire il faudrait parser l'objet FINAL
              // et trouver l'obj qui fait égalité avec
              // ou tout le temps garder le chemin
               return read(lines, tree)

            }
            // Enter in folder ex: "cd a"
            else {
              const key = line.split(' ')[2];
              // log('line ------------------', line)
              lines.shift()
              return read(lines, tree[key], tree)
            }
        }
        // show
        else if (line.split(' ')[1] === 'ls') {
          // TODO
          // log('COMNAND = $ ls', line)
          lines.shift()
          return read(lines, tree, parentLevel)
          // return read(lines, tree)
        }

      }
      // read: dir (restart on this recursively)
      else if (line.split(' ')[0] === 'dir') {
        const key = line.split(' ')[1];
        Object.assign(tree,{ [key]: {} })
        //log('tree-------',tree)
        lines.shift()
        return read(lines, tree, parentLevel)
      }
      // FINAL of this obj
      // read: Number (is the file size
      else if (typeof parseInt(line.split(' ')[0]) === 'number') {
        lines.shift()

        if (line.split(' ')[1])
        {
          Object.assign(tree, { [line.split(' ')[1]]: parseInt(line.split(' ')[0]) })
          return read(lines, tree, parentLevel)
        }


      }

      // if (!lines.length) return tree
    }

    return FINAL
  }

  const tree = read()
  log('tree', tree)
  log("tree['/']['a']['e']", tree['/']['a']['e'])
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
