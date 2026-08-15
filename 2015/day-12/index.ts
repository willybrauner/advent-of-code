/**
 * 2015 - Day 12
 * https://adventofcode.com/2015/day/12
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = string
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs.readFileSync(path.resolve(__dirname, filename), 'utf8')

const part1 = (input: Input) => {
  return input.match(/[+-]?\d+/g).reduce((a, b) => a + parseInt(b), 0)
}
log(part1(useInput('input')))

const part2 = (input: Input) => {
  const sum = (value) => {
    if (typeof value === 'number') return value
    if (typeof value === 'string') return 0
    if (Array.isArray(value)) {
      return value.reduce((a, b) => a + sum(b), 0)
    }
    if (value && typeof value === 'object') {
      const values = Object.values(value as Record<string, unknown>)
      if (values.includes('red')) return 0
      return values.reduce((a, b) => a + sum(b), 0)
    }
  }
  return sum(JSON.parse(input))
}
log(part2(useInput('input')))
