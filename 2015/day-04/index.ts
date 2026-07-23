/**
 * 2015 - Day 4
 * https://adventofcode.com/2015/day/4
 */
import fs from 'fs'
import path from 'path'
import { createHash } from 'node:crypto'
const { log, clear } = console
clear()

type Input = string
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs.readFileSync(path.resolve(__dirname, filename), 'utf8').trim()

const part1 = (input: Input) => {
  let count = 1
  while (true) {
    const hash = createHash('md5').update(input + count).digest('hex')
    if (hash.startsWith('00000')) break
    count++
  }
  return count
}
log(part1(useInput('input')))

const part2 = (input: Input) => {
  let count = 1
  while (true) {
    const hash = createHash('md5').update(input + count).digest('hex')
    if (hash.startsWith('000000')) break
    count++
  }
  return count
}
log(part2(useInput('input')))
