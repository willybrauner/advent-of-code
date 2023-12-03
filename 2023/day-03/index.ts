/**
 * 2023 - Day 3
 * https://adventofcode.com/2023/day/3
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console

type Coords = Record<string, string>
type Symbols = Record<string, string>
type Input = {
  coords: Coords
  symbols: Symbols
}

/**
 Data struct
 {
  coords: {
    '0,0': '467',
    '0,5': '114'
    ...
  },
  symbols: {
    '1,3': '*',
    '3,6': '#',
    ...
  }
}

 */
const format = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter(Boolean)
    .reduce((acc: Input, curr: string, y: number) => {
      const chars = curr.split('')
      let coords = {}
      let symbols = {}
      let num = ''
      let startX = -1
      for (let x = 0; x < chars.length; x++) {
        const char = chars[x]
        if (!isNaN(parseInt(char))) {
          if (num === '') startX = x
          num += char
        } else if (char === '.') {
          if (num !== '') {
            coords[`${y},${startX}`] = num
            num = ''
          }
        } else {
          symbols[`${y},${x}`] = char
        }
      }
      // record last if curr num is not empty
      if (num !== '') coords[`${y},${startX}`] = num
      return {
        coords: { ...acc.coords, ...coords },
        symbols: { ...acc.symbols, ...symbols },
      }
    }, {} as Input)

const part1 = (input: Input) => {
  clear()

  return input
}

log(part1(format('input.test')))

const part2 = (input: Input) => {
  return input
}
part2(format('input.test'))
