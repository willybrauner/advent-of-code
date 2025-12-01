/**
 * 2025 - Day 1
 * https://adventofcode.com/2025/day/1
 */
import fs from 'fs'
import path from 'path'
const { log, clear } = console
clear()

type Input = number[]
const useInput = (filename: 'input.test' | 'input'): Input =>
  fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .split('\n')
    .map((e) => {
      const v = parseInt(e.slice(1))
      const sign = e[0] === 'L' ? -1 : +1
      return sign * v
    })

const part1 = (input: Input) => {
  return input.reduce(
    (a, b) => {
      const value = (a.value + (b % 100) + 100) % 100
      return {
        count: value === 0 ? a.count + 1 : a.count,
        value,
      }
    },
    { value: 50, count: 0 },
  )
}
part1(useInput('input.test'))

const part2 = (input: Input) => {
  return input.reduce(
    (a, b) => {
      // signed remainder -99, 99
      const partial = b % 100
      // count numb of rounds
      const rounds = Math.floor(Math.abs(b / 100))
      // positive modulo
      const value = (a.value + (partial + 100)) % 100
      // determine if we cross 0 without full round
      const isCrossedPartial =
        partial !== 0 && (value - a.value) * Math.sign(partial) < 0
      // calc count
      const count = a.count + rounds + (isCrossedPartial ? 1 : 0)

      return {
        count,
        value,
      }
    },
    { value: 50, count: 0 },
  )
}

// 👀
log(part2(useInput('input')))
