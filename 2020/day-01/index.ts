/**
 * 2020 - Day 1
 *  https://adventofcode.com/2020/day/1
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

export type Input = any

export const format = (filename: 'input.test' | 'input'): Input =>
  fs.readFileSync(path.resolve(__dirname, filename), 'utf8').trim().split('\n').map(e => parseInt(e))

export const part1 = (input: Input) => {
  for (let a of input)
    for (let b of input)
      if (a + b === 2020) return a * b
}

part1(format('input'))

export const part2 = (input: Input) => {
  for (let a of input)
    for (let b of input)
      for (let c of input)
        if (a + b+c === 2020) return a * b * c
}
part2(format('input'))
