/**
 * 2023 - Day 01
 * https://adventofcode.com/2023/day/1
 */

import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = string[][]
const format = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((e) => e.split(''))

const part1 = (input: Input) =>
  input.reduce((a: number, b: string[]) => {
    const numbs = b.filter(Number)
    const num = parseInt(numbs[0] + numbs[numbs.length - 1])
    return a + num
  }, 0)

log(part1(format('input')))

const part2 = (input: Input) => {
  const n = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];

  return input
}
part2(format('input.test'))
