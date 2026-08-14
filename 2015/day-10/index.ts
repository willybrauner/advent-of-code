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

const part1 = (input: Input) => {
  let curr = input;
  for ( let i = 0; i< 40; i++) {
    curr = curr.match(/(.)\1*/g).map(e => {
      const first = e[0]
      return e.length + first
    }).join('')
  }
  return curr.length
}
log(part1(useInput('input')))

const part2 = (input: Input) => {
  return input
}
part2(useInput('input.test'))
