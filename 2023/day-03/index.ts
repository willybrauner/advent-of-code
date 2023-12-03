/**
 * 2023 - Day 3
 * https://adventofcode.com/2023/day/3
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console

type Numbs = Record<string, string>
type Symbols = Record<string, string>
type Input = {
  nums: Numbs
  symbols: Symbols
}

/**
 Data struct
 {
  nums: {
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
          if (num !== '') {
            coords[`${y},${startX}`] = num
            num = ''
          }
        }
      }
      // record last if curr num is not empty
      if (num !== '') coords[`${y},${startX}`] = num
      return {
        nums: { ...acc.nums, ...coords },
        symbols: { ...acc.symbols, ...symbols },
      }
    }, {} as Input)

const part1 = ({ nums, symbols }: Input) => {
  console.log({ nums, symbols })
  let count = 0
  for (let [yx, num] of Object.entries(nums)) {
    const [y, x] = yx.split(',').map((e) => parseInt(e))

    let adj = [-1, 0, 1].reduce((a, b) => {
      return [
        ...a,
        ...new Array(num.length + 2)
          .fill(null)
          .map((e, i) => `${Math.max(0, y + b)},${Math.max(0, x + i - 1)}`),
      ]
    }, [])
    adj = [...new Set(adj)]
    for (let [symbolYX, symbol] of Object.entries(symbols)) {
      if (adj.includes(symbolYX)) {
        log(`symbolYX ${symbolYX} ${symbol} match with ${num}`, adj)
        count += parseInt(num)
      }
    }
  }
  return count
}

log(part1(format('input')))

const part2 = (input: Input) => {
  return input
}
part2(format('input.test'))
