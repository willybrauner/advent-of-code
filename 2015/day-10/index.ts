/**
 * 2015 - Day 10
 * https://adventofcode.com/2015/day/10
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = string
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs.readFileSync(path.resolve(__dirname, filename), 'utf8')

const fn = (input: Input, n: number): number => {
  let curr = input
  for (let i = 0; i < n; i++) {
    curr = curr
      .match(/(.)\1*/g)
      .map((e) => {
        const first = e[0]
        return e.length + first
      })
      .join('')
  }
  return curr.length
}
const part1 = (input: Input) => fn(input, 40)
log(part1(useInput('input')))

const part2 = (input: Input) => fn(input, 50)
log(part2(useInput('input')))
